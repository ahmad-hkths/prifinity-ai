
# ✨ PrifinityAI – Personalized AI Taste Assistant

PrifinityAI is a smart recommendation assistant that delivers deeply personalized suggestions across movies, music, books, fashion, food, and more all through a friendly chat interface.

---

## 🚀 Live Demo

👉 [Try PrifinityAI Live](https://prifinityai.vercel.app)
👍Best viewed on desktop

---
## ⏰ Submission Info

This project was submitted on **August 1, 2025**.

- All core functionality and features were completed by the submission deadline.
- **Post-deadline updates** (committed after Aug 1) include:
   *  Added basic analytics for usage statistics only (e.g., page visits, general interaction metrics). These have **no impact on app features or functionality**.
   *  Updated tech stack section in readme for clarity 
  
## 📜 Features

* 🎬 Movie & TV show recommendations
* 🎵 Music & book suggestions
* 🍽️ Restaurant & fashion brand ideas
* 🗨️ Responsive chat interface using React 
* 🧪 Mock data fallback for failed API calls

---

## ⚙️ Tech Stack

### 🖥️ Frontend (React + TypeScript)

* Built using Vite, React, and TypeScript
* Styled with Tailwind CSS
* User input is sent to backend APIs for processing

### 🔧 Backend (API)

* Uses the Qloo Taste API to fetch cultural and taste-based recommendations
* Integrates GPT-3.5 Turbo via OpenRouter for natural language understanding

### ☁️ Deployment

* Deployed on Vercel

---

## 📦 Installation

```bash
git clone https://github.com/ahmad-hkths/prifinity-ai
cd prifinityai
npm install
```

### 🌐 Environment Variables

Create a `.env` file in the root:

```
VITE_QLOO_API_KEY=your_qloo_api_key
VITE_OPENROUTER_API_KEY=your_openrouter_key
```

---


## 💡 Inspiration

We wanted to build an AI that doesn’t just answer questions but understands your **taste and preferences**  like a friend who knows your style. Qloo offered the perfect backend, and GPT gave it a voice.

---

## 🏆 Accomplishments We're Proud Of

* Built a sleek, modern UI with real time interactions.
* Designed a fallback strategy for when API calls fail.

---

## 📚 What We Learned

* How to structure a React-based chatbot that routes and merges external data sources seamlessly without disrupting flow.
* Handling edge cases like empty results or ambiguous categories.
* Implemented environmental security best practices , and learned how to debug opaque API responses with minimal documentation.

---

## 🔮 What’s Next for PrifinityAI

* 🧑‍💼 Add authentication and user profile saving
* 🔁 Improve context memory during chat
* 📊 Visualize recommendations with charts or sliders
* 🧬 Use vector search to further personalize recommendations

---

## 🤝 Acknowledgements

* [Qloo](https://docs.qloo.com) – Cultural AI recommendations
* [OpenRouter](https://openrouter.ai) – GPT-based LLM access
* [Vercel](https://vercel.com) – Free, fast hosting

---

## 📄 License

MIT License © 2025 Ahmad-hkths

---


