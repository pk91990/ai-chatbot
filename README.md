# 🤖 WhatsApp Gemini AI Bot

A WhatsApp bot powered by **whatsapp-web.js** and **Google Gemini AI**.  
This bot can chat in different modes like **Normal, Girlfriend, Study Buddy, Family, and Friend**.  
It automatically adapts to the sender and recent chat context, making conversations feel natural.

---

## ⚙️ Installation

**Clone the repository**
```bash
git clone https://github.com/pk91990/ai-chatbot.git
cd ai-chatbot
```

**Install dependencies**
```bash
npm install
```

**Create .env file**  
Add your Gemini API Key inside `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Run the bot**
```bash
node index.js
```

**Scan QR Code**
- Open WhatsApp → Linked Devices → Scan QR from your phone.  
- After successful scan, the bot will be ready ✅

---

## 🔄 Modes

You can switch modes manually by sending commands:

- `mode normal` → Normal AI Assistant 🗨️  
- `mode gf` → Girlfriend Mode 💕  
- `mode study` → Study Buddy 📚  
- `mode family` → Family Style 👪  
- `mode friend` → Close Friend 🎉  

---

## 📝 Example Usage

## 📱 Auto Mode by Number

The bot automatically switches mode depending on the sender’s number:

- **919999099999@c.us** → Family Mode 👪  example 91<enter a number>@c.us
- **919999099999@c.us** → Girlfriend Mode 💕 example 91<enter a number>@c.us
- **919999099999@c.us** → Study Buddy Mode 📚 example 91<enter a number>@c.us
- **919999099999@c.us** → Friend Mode 🎉 example 91<enter a number>@c.us
- **Default** → Normal Mode 🗨️  

Example:
```
Mom: Beta khaana kha liya?
Bot (Family Mode): Haan Maa, abhi khaya 😇
```

```
GF: Missed you!
Bot (GF Mode): Aww, I missed you too 😘
```


## ⚠️ Notes

- First run me QR scan karna hoga.  
- `say` package Mac/Linux me easily chalega. Windows me voices install honi chahiye.  
- This bot is for **personal/educational use** only.  
