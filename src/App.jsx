import { useState } from "react";
import { STUDY_TOPICS } from "./config/topics";
import { useCometChatSession, getOrCreateAndJoinTopicRoom } from "./cometchat";
import StudyRoomChat from "./components/StudyRoomChat";

export default function App() {
  const { currentUser, isInitializing, isLoggedIn } = useCometChatSession();
  const [activeRoom, setActiveRoom] = useState(null);
  const [joiningTopicGuid, setJoiningTopicGuid] = useState(null);
  const [joinError, setJoinError] = useState(null);

  const handleJoinRoom = async (topic) => {
    try {
      setJoiningTopicGuid(topic.guid);
      setJoinError(null);
      const group = await getOrCreateAndJoinTopicRoom(topic);
      setActiveRoom({ topic, group });
    } catch (err) {
      console.error("Failed to join room:", err);
      setJoinError({
        guid: topic.guid,
        message: err?.message || "Failed to join room. Please try again.",
      });
    } finally {
      setJoiningTopicGuid(null);
    }
  };

  const handleBackToTopics = () => {
    setActiveRoom(null);
    setJoinError(null);
  };

  // If a study room is active, render the Step 3 active-room shell
  if (activeRoom) {
    const { topic, group } = activeRoom;
    const groupGuid = group?.getGuid?.() || group?.guid || topic.guid;
    const groupName = group?.getName?.() || group?.name || topic.roomTitle;
    const membersCount = group?.getMembersCount?.() || group?.membersCount || 1;
    const studentName =
      currentUser?.getName?.() ||
      currentUser?.name ||
      currentUser?.getUid?.() ||
      "Student";

    return (
      <main className="app-shell">
        <div className="active-room-container">
          <header className="room-topbar">
            <button
              type="button"
              className="back-button"
              onClick={handleBackToTopics}
            >
              ← Back to Topics
            </button>
            <div className="room-identity">
              <span className={`room-accent-pill ${topic.accent}`}>
                {topic.name}
              </span>
              <div className="hero-actions">
                <span className="user-status-pill">
                  <span className="user-status-dot" />
                  {studentName}
                </span>
              </div>
            </div>
          </header>

          <article className="room-card-wrapper">
            <div className="room-header-area">
              <div>
                <p className="eyebrow">{topic.name} Doubt Room</p>
                <h1>{groupName}</h1>
                <p>{topic.description}</p>
              </div>
              <span className="room-status-badge">
                <span className="status-dot" />
                Joined Study Room
              </span>
            </div>

            <div className="room-details-grid">
              <div className="room-detail-item">
                <div className="room-detail-label">Room GUID</div>
                <div className="room-detail-value">{groupGuid}</div>
              </div>
              <div className="room-detail-item">
                <div className="room-detail-label">Room Type</div>
                <div className="room-detail-value">Public Study Group</div>
              </div>
              <div className="room-detail-item">
                <div className="room-detail-label">Members</div>
                <div className="room-detail-value">{membersCount} peers</div>
              </div>
              <div className="room-detail-item">
                <div className="room-detail-label">Status</div>
                <div className="room-detail-value">Connected</div>
              </div>
            </div>

            <StudyRoomChat group={group} onBack={handleBackToTopics} />
          </article>
        </div>
      </main>
    );
  }

  // Otherwise, render the preserved topic selection landing page
  const studentName =
    currentUser?.getName?.() ||
    currentUser?.name ||
    (isLoggedIn ? "Connected" : isInitializing ? "Connecting..." : "Guest");

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Study rooms for focused doubt solving</p>
          <h1 id="page-title">StudyBuddy</h1>
          <p className="tagline">
            Join real-time study doubt rooms by topic, meet classmates working
            through the same concepts, and get unstuck faster.
          </p>
          <div className="hero-actions" aria-label="Study room summary">
            <span>7 topics</span>
            <span>44 active rooms</span>
            <span className="user-status-pill">
              <span className="user-status-dot" />
              {studentName}
            </span>
          </div>
        </div>

        <div className="room-preview" aria-label="Study room preview">
          <div className="preview-header">
            <span className="status-dot" />
            <span>Live study room</span>
          </div>
          <div className="preview-board">
            <div className="question-card wide" />
            <div className="question-card" />
            <div className="question-card muted" />
          </div>
          <div className="preview-footer">
            <span>Peers online</span>
            <div className="avatar-stack" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="topics-section" aria-labelledby="topics-title">
        <div className="section-heading">
          <p className="eyebrow">Choose a room</p>
          <h2 id="topics-title">Pick your study topic</h2>
        </div>

        <div className="topic-grid">
          {STUDY_TOPICS.map((topic) => {
            const isJoining = joiningTopicGuid === topic.guid;
            const hasError = joinError?.guid === topic.guid;

            return (
              <article className={`topic-card ${topic.accent}`} key={topic.name}>
                <div className="topic-topline">
                  <span className="room-icon" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                  <span>{topic.rooms} rooms</span>
                </div>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <button
                  type="button"
                  disabled={isJoining || isInitializing}
                  onClick={() => handleJoinRoom(topic)}
                >
                  {isJoining ? "Joining Room..." : "Join Room"}
                </button>
                {hasError && (
                  <div className="topic-card-error" role="alert">
                    {joinError.message}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
