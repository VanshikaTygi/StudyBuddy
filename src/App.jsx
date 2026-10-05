const topics = [
  {
    name: "DSA",
    description: "Algorithms, data structures, and coding patterns.",
    accent: "teal",
    rooms: 8,
  },
  {
    name: "DBMS",
    description: "Queries, normalization, transactions, and indexing.",
    accent: "blue",
    rooms: 5,
  },
  {
    name: "Operating Systems",
    description: "Processes, memory, scheduling, and concurrency.",
    accent: "amber",
    rooms: 6,
  },
  {
    name: "Computer Networks",
    description: "Protocols, routing, layers, and network security.",
    accent: "rose",
    rooms: 4,
  },
  {
    name: "AI/ML",
    description: "Models, training, evaluation, and practical ML doubts.",
    accent: "violet",
    rooms: 7,
  },
  {
    name: "Web Development",
    description: "Frontend, backend basics, APIs, and deployment.",
    accent: "green",
    rooms: 9,
  },
  {
    name: "Mathematics",
    description: "Discrete math, probability, calculus, and linear algebra.",
    accent: "orange",
    rooms: 5,
  },
];

export default function App() {
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
            <span>Ready for chat</span>
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
          {topics.map((topic) => (
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
              <button type="button">Join Room</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
