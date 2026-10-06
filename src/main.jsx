import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@cometchat/chat-uikit-react/styles";
import App from "./App.jsx";
import "./index.css";
import { CometChatSessionProvider } from "./cometchat";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CometChatSessionProvider>
      <App />
    </CometChatSessionProvider>
  </StrictMode>,
);
