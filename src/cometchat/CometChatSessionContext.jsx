import { createContext, useContext, useEffect, useState } from "react";
import {
  initCometChat,
  ensureDevUser,
  getLoggedInUser,
  logoutUser,
  DEMO_USERS,
  DEFAULT_DEMO_UID,
} from "./cometchatService";

const CometChatSessionContext = createContext({
  currentUser: null,
  isInitializing: true,
  isLoggedIn: false,
  error: null,
  switchUser: async () => {},
  logout: async () => {},
  demoUsers: DEMO_USERS,
});

export function CometChatSessionProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getLoggedInUser());
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function setupSession() {
      try {
        setIsInitializing(true);
        setError(null);
        await initCometChat();
        const user = await ensureDevUser(DEFAULT_DEMO_UID, "Student 1 (Alex)");
        if (isMounted) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        if (isMounted) {
          console.error("CometChat initialization failed:", err);
          setError(err?.message || "Failed to initialize CometChat session");
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    }

    setupSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const switchUser = async (uid, name) => {
    try {
      setIsInitializing(true);
      setError(null);
      const user = await ensureDevUser(uid, name);
      setCurrentUser(user);
      setIsLoggedIn(true);
      return user;
    } catch (err) {
      console.error("Failed to switch CometChat user:", err);
      setError(err?.message || "Failed to switch user");
      throw err;
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <CometChatSessionContext.Provider
      value={{
        currentUser,
        isInitializing,
        isLoggedIn,
        error,
        switchUser,
        logout: handleLogout,
        demoUsers: DEMO_USERS,
      }}
    >
      {children}
    </CometChatSessionContext.Provider>
  );
}

export function useCometChatSession() {
  return useContext(CometChatSessionContext);
}
