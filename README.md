# StudyBuddy — Real-Time Peer Learning Platform

StudyBuddy is a peer-learning platform designed to help students connect through topic-specific study rooms. Instead of discussing every subject in one place, students can join a room related to what they are learning and exchange questions, doubts, and explanations through real-time group chat.

This project is being developed as part of the **Zero to Chat: CometChat Hackathon**.

## What StudyBuddy Offers

- **Topic-specific study rooms:** Dedicated rooms for DSA, DBMS, Operating Systems, Computer Networks, AI/ML, Web Development, and Mathematics.
- **Real-time group messaging:** Students can participate in discussions using CometChat.
- **Persistent conversations:** Messages are handled by the CometChat backend, allowing conversations to remain available across sessions.
- **Focused peer learning:** A subject-based interface helps students find the relevant room for their discussion.

## Tech Stack

- **Frontend:** React, JavaScript, Vite
- **Real-time communication:** CometChat
- **Chat interface:** CometChat React UI Kit
- **AI coding-agent workflow:** CometChat Skills pack and agent instructions
- **Documentation integration:** CometChat documentation MCP server configuration

## How It Works

1. Open StudyBuddy in your browser.
2. Choose a study topic.
3. Join the corresponding study room.
4. Send messages and discuss questions with other participants in the room.

The current version focuses on topic selection and real-time peer-to-peer learning through group messaging. Additional capabilities can be introduced as the project evolves.

## Getting Started

### Prerequisites

- Node.js and npm
- A CometChat application configured for the project
- The required CometChat configuration values

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/VanshikaTygi/StudyBuddy.git
   ```

2. Open the project directory:

   ```bash
   cd StudyBuddy
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the required CometChat values in your local `.env` file, using the variable names expected by the application.

   **Important:** Keep credentials and private keys out of the repository. Never commit your `.env` file.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal.

### Production Build

To check the production build, run:

```bash
npm run build
```

## CometChat Skills and Agent Workflow

The repository includes CometChat-specific agent instructions in `AGENTS.md` and the CometChat Skills pack under `.cometchat/skills/`.

The `.codex/` directory contains configuration for the CometChat documentation MCP server in the AI coding-agent environment.

These resources support the development workflow and provide project-specific guidance for working with CometChat.

## Project Structure

```text
StudyBuddy/
├── .codex/
├── .cometchat/
│   └── skills/
├── src/
├── AGENTS.md
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Current Status

StudyBuddy is an MVP focused on topic-based study rooms and real-time group messaging. The project will continue to evolve as usability, reliability, and additional peer-learning features are developed.

## Repository

**GitHub:** https://github.com/VanshikaTygi/StudyBuddy

Built with React and CometChat to make collaborative learning more focused and accessible.