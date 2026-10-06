import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

export const DEMO_USERS = [
  { uid: "cometchat-uid-1", name: "Student 1 (Alex)" },
  { uid: "cometchat-uid-2", name: "Student 2 (Sam)" },
  { uid: "cometchat-uid-3", name: "Student 3 (Jordan)" },
];

export const DEFAULT_DEMO_UID = "cometchat-uid-1";

// Cache module-level init promise to avoid React 18+ StrictMode duplicate calls
let initPromise = null;

// Cache in-flight login promise to prevent concurrent login collision errors
let loginInFlight = null;

/**
 * Initializes CometChat using React UI Kit v7 initFromSettings.
 * Guaranteed to run exactly once across concurrent/duplicate calls.
 */
export function initCometChat() {
  if (!initPromise) {
    const appId = import.meta.env.VITE_COMETCHAT_APP_ID;
    const region = import.meta.env.VITE_COMETCHAT_REGION;
    const authKey = import.meta.env.VITE_COMETCHAT_AUTH_KEY;

    if (!appId || !region || !authKey) {
      return Promise.reject(
        new Error(
          "CometChat credentials missing. Ensure VITE_COMETCHAT_APP_ID, VITE_COMETCHAT_REGION, and VITE_COMETCHAT_AUTH_KEY are defined in .env"
        )
      );
    }

    initPromise = CometChatUIKit.initFromSettings({
      appId,
      region,
      credentials: { authKey },
      chatSDK: { presenceSubscription: { type: "ALL_USERS" } },
    });
  }

  return initPromise;
}

/**
 * Ensures a user session is active sequentially and guards against concurrent login calls.
 */
export async function ensureLoggedIn(uid, authToken) {
  await initCometChat();

  const existing = CometChatUIKit.getLoggedInUser();
  if (existing && existing.getUid?.() === uid) {
    return existing;
  }

  if (existing) {
    await CometChatUIKit.logout();
  }

  if (loginInFlight) {
    return await loginInFlight;
  }

  loginInFlight = authToken
    ? CometChatUIKit.loginWithAuthToken(authToken)
    : CometChatUIKit.login(uid);

  try {
    const user = await loginInFlight;
    return user;
  } finally {
    loginInFlight = null;
  }
}

/**
 * Deterministic dev/demo user strategy: create-if-missing then log in.
 * Supported by CometChat React v7 docs for hackathon/dev workflows.
 */
export async function ensureDevUser(uid = DEFAULT_DEMO_UID, name = "Demo Student") {
  await initCometChat();

  try {
    const newUser = new CometChat.User(uid);
    newUser.setName(name);
    await CometChatUIKit.createUser(newUser);
  } catch {
    // User already exists in CometChat app; proceed to login
  }

  return await ensureLoggedIn(uid);
}

/**
 * Returns the currently authenticated CometChat user synchronously.
 */
export function getLoggedInUser() {
  return CometChatUIKit.getLoggedInUser();
}

/**
 * Logs out the active user session.
 */
export async function logoutUser() {
  return await CometChatUIKit.logout();
}
