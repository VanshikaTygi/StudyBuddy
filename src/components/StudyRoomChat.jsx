import {
  CometChatProvider,
  CometChatErrorBoundary,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-react";

/**
 * StudyRoomChat renders the CometChat React v7 UI Kit group chat surface
 * for an active StudyBuddy study room.
 *
 * Sized according to CometChat reflow-free layout standards with bounded height
 * and internal scrolling.
 */
export default function StudyRoomChat({ group, onBack }) {
  if (!group) return null;

  return (
    <div className="study-room-chat-wrapper">
      <CometChatErrorBoundary>
        <CometChatProvider>
          <div className="study-room-chat-surface">
            <CometChatMessageHeader
              group={group}
              onBack={onBack}
              hideVoiceCallButton={true}
              hideVideoCallButton={true}
            />

            <div className="study-room-chat-messages">
              <CometChatMessageList group={group} />
            </div>

            <div className="study-room-chat-composer">
              <CometChatMessageComposer
                group={group}
                placeholder="Ask a doubt or share a solution with your peers..."
                hideAIButton={true}
              />
            </div>
          </div>
        </CometChatProvider>
      </CometChatErrorBoundary>
    </div>
  );
}
