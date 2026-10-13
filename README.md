# 🧠 Second Brain — AI-Powered Knowledge Management

Second Brain is a web application designed to help users save, organize, and rediscover useful information from across the internet. It aims to turn scattered digital content into a searchable personal knowledge base using AI-powered summaries, tags, and semantic similarity.

🔗 **Live Demo:** [Open Second Brain](https://my-project-livid-mu-98.vercel.app/)

📂 **GitHub Repository:** [My-Project](https://github.com/jainakshat9578-glitch/My-Project)

## ✨ Features

- **Content Management:** Save and retrieve useful content in one place.
- **AI-Powered Summaries:** Generate concise summaries of saved content.
- **Automatic Tagging:** Organize content with automatically generated tags.
- **Semantic Search:** Find relevant information based on meaning, rather than relying only on exact keywords.
- **Related Content:** Discover content with similar semantic representations.
- **Content Resurfacing:** Bring previously saved information back to the user's attention.
- **Persistent Storage:** Store content and associated metadata in a database.
- **Authentication:** Provide login and signup functionality.

## 🛠️ Tech Stack

The project uses a modern web development stack, including:

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **AI Integration:** AI-powered text summarization, tagging, and embeddings
- **Deployment:** Vercel (frontend) and Render (backend)

## 🏗️ Architecture

The application follows a client-server architecture.

1. The frontend provides the interface for users to interact with their saved knowledge.
2. The backend exposes API endpoints for content management, search, related content, and resurfacing.
3. MongoDB stores content and associated metadata.
4. AI services generate summaries, tags, and embeddings to support intelligent content discovery.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MongoDB or a MongoDB Atlas database
- Required API credentials for the AI services used by the project

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/jainakshat9578-glitch/My-Project.git
cd My-Project
```

**2. Navigate to the application folder**

Inspect the repository and enter the folder containing the relevant `package.json` file.

```bash
cd App
```

If your frontend and backend are maintained in separate directories or repositories, install and configure each application separately.

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the appropriate application directory and add the variables required by the project, such as:

```env
MONGODB_URI=your_mongodb_connection_string
AI_API_KEY=your_ai_provider_api_key
```

Use the exact variable names expected by your existing code. The names above are illustrative; do not replace working configuration with these placeholders unless your application uses them.

**5. Start the application**

Check the `scripts` section in your `package.json` and run the appropriate development command, for example:

```bash
npm run dev
```

Follow the setup requirements of the frontend and backend if they run independently.

## 🔐 Environment & Security

- Keep API keys, database credentials, and other secrets in environment variables.
- Do not commit `.env` files or production credentials to GitHub.
- Configure production environment variables separately in Vercel and Render.

## 🎯 Project Objective

The goal of Second Brain is to reduce the effort required to manage and revisit useful digital information. By combining content storage with AI-generated metadata and semantic discovery, the application aims to make personal knowledge easier to organize, search, and reuse.

## 🔮 Future Scope

- Browser extension for saving content directly from websites.
- Improved extraction of meaningful text from URLs.
- Collections and more advanced organization tools.
- Enhanced multilingual search and personalized content recommendations.

## 👨‍💻 Author

**Akshat Jain**

GitHub: [@jainakshat9578-glitch](https://github.com/jainakshat9578-glitch)

---

*Second Brain — Save knowledge. Discover connections. Think smarter.*
