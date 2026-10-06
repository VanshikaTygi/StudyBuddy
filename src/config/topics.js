export const STUDY_TOPICS = [
  {
    id: "dsa",
    guid: "study-dsa",
    name: "DSA",
    roomTitle: "DSA Study Room",
    description: "Algorithms, data structures, and coding patterns.",
    accent: "teal",
    rooms: 8,
  },
  {
    id: "dbms",
    guid: "study-dbms",
    name: "DBMS",
    roomTitle: "DBMS Study Room",
    description: "Queries, normalization, transactions, and indexing.",
    accent: "blue",
    rooms: 5,
  },
  {
    id: "os",
    guid: "study-os",
    name: "Operating Systems",
    roomTitle: "Operating Systems Study Room",
    description: "Processes, memory, scheduling, and concurrency.",
    accent: "amber",
    rooms: 6,
  },
  {
    id: "cn",
    guid: "study-cn",
    name: "Computer Networks",
    roomTitle: "Computer Networks Study Room",
    description: "Protocols, routing, layers, and network security.",
    accent: "rose",
    rooms: 4,
  },
  {
    id: "aiml",
    guid: "study-aiml",
    name: "AI/ML",
    roomTitle: "AI/ML Study Room",
    description: "Models, training, evaluation, and practical ML doubts.",
    accent: "violet",
    rooms: 7,
  },
  {
    id: "webdev",
    guid: "study-webdev",
    name: "Web Development",
    roomTitle: "Web Development Study Room",
    description: "Frontend, backend basics, APIs, and deployment.",
    accent: "green",
    rooms: 9,
  },
  {
    id: "math",
    guid: "study-math",
    name: "Mathematics",
    roomTitle: "Mathematics Study Room",
    description: "Discrete math, probability, calculus, and linear algebra.",
    accent: "orange",
    rooms: 5,
  },
];

export function getTopicByGuid(guid) {
  return STUDY_TOPICS.find((topic) => topic.guid === guid) || null;
}
