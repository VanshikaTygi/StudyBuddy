import { CometChat } from "@cometchat/chat-sdk-javascript";
import { initCometChat, getLoggedInUser } from "./cometchatService";

/**
 * Resolves or creates a public CometChat group for a StudyBuddy topic room,
 * joins the group if the user is not yet a member, and returns the Group entity.
 * 
 * Safely handles concurrent room creations and idempotency across sessions.
 */
export async function getOrCreateAndJoinTopicRoom(topic) {
  await initCometChat();

  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    throw new Error("No active CometChat user session. Please ensure user is logged in.");
  }

  const guid = topic.guid || topic.id || topic;
  const groupName = topic.roomTitle || (topic.name ? `${topic.name} Study Room` : guid);
  const groupDescription = topic.description || "StudyBuddy peer doubt-solving room";

  let group = null;

  // Step 1: Check if the room group already exists
  try {
    group = await CometChat.getGroup(guid);
  } catch (err) {
    // Group does not exist yet; will create below
    group = null;
  }

  // Step 2: Create the room group as PUBLIC if not found
  if (!group) {
    try {
      const newGroup = new CometChat.Group(
        guid,
        groupName,
        CometChat.GROUP_TYPE.PUBLIC,
        ""
      );
      if (groupDescription) {
        newGroup.setDescription(groupDescription);
      }
      group = await CometChat.createGroup(newGroup);
    } catch (createError) {
      // Step 2b: Handle race condition / duplicate creation
      // If another user created the room right before or concurrently,
      // recover gracefully by fetching the existing group.
      try {
        group = await CometChat.getGroup(guid);
      } catch (fetchError) {
        throw new Error(
          createError?.message ||
          fetchError?.message ||
          `Failed to create or retrieve study room "${guid}".`
        );
      }
    }
  }

  // Step 3: Check membership and join if not already a member
  const isJoined = Boolean(group.getHasJoined?.() || group.hasJoined);
  if (!isJoined) {
    try {
      const joinedGroup = await CometChat.joinGroup(
        guid,
        CometChat.GROUP_TYPE.PUBLIC,
        ""
      );
      if (joinedGroup) {
        group = joinedGroup;
      }
    } catch (joinError) {
      const errMsg = (joinError?.message || "").toLowerCase();
      const errCode = (joinError?.code || "").toLowerCase();

      // Gracefully recover if user is already a member
      if (
        errCode.includes("already") ||
        errCode.includes("member") ||
        errMsg.includes("already") ||
        errMsg.includes("member")
      ) {
        group = await CometChat.getGroup(guid);
      } else {
        throw new Error(
          joinError?.message || `Failed to join study room "${guid}".`
        );
      }
    }
  }

  return group;
}

/**
 * Retrieves an existing topic room group by its GUID.
 */
export async function fetchTopicGroup(guid) {
  await initCometChat();
  return await CometChat.getGroup(guid);
}
