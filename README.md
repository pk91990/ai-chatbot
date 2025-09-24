# 🤖 WhatsApp Gemini AI Bot

A WhatsApp bot powered by **[whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)** and **Google Gemini AI**.  
This bot can chat in different modes like **Normal, Girlfriend, Study Buddy, Family, and Friend**.  
It automatically adapts to the sender and recent chat context, making conversations feel natural.

---

## ✨ Features
- 📝 Context-aware replies (uses last 5–10 messages).
- 🔄 Multiple modes:
  - **Normal** → Casual friendly chat
  - **GF** → Girlfriend-like mode 💕
  - **Study** → Study buddy 📚
  - **Family** → Polite family-style messages 👪
  - **Friend** → Close friend-style chatting 🎉
- 🗣️ Text-to-Speech for errors (via `say` package).
- 🔑 Secure API key handling via `.env`.
- ⚡ Powered by **Google Gemini AI**.

---

## 📦 Dependencies
This project requires:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [fs](https://nodejs.org/api/fs.html) (built-in Node.js module)
- [say](https://www.npmjs.com/package/say)
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)

Install all dependencies with:
```bash
npm install whatsapp-web.js qrcode-terminal dotenv say @google/generative-ai
