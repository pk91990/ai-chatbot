require('dotenv').config();
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { TIMEOUT } = require('dns');

// Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// WhatsApp client
const client = new Client();

// Current mode (default: normal)
let mode = "normal";

client.on('qr', (qr) => {
    console.log('Scan this QR code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Gemini AI Bot is ready!');
});

client.on('message', async (message) => {
    console.log(`📩 ${message.from}: ${message.body}`);

    const say = require("say");
    function speakError(message) {
        const text = `Listen carefully, your message is ${message}`;
        say.speak(text, "Alex", 1.0, (err) => {
            if (err) {
                return console.error("Error speaking:", err);
            }
            console.log("✅ Spoke the error message");
        });
    }

    let fixedModes = {
        "919999999999@c.us": "family", // Mom
        "919999999999@c.us": "gf",       // gf
        "919999999999@c.us": "gf",     // gf
        "919999999999@c.us": "gf",     // gf
        "919999999999@c.us": "gf",
        "919999999999@c.us": "study",  // Study
        "919999999999@c.us": "friend", // Friend 
        "default": "normal"
    };

    const sender = message.from;
    let mode = fixedModes[sender] || fixedModes["default"];

    // Mode switch (manual commands)
    if (message.body.toLowerCase() === "mode normal") {
        mode = "normal";
        return message.reply("🔄 Switched to *Normal AI Assistant* mode.");
    }
    if (message.body.toLowerCase() === "mode gf") {
        mode = "gf";
        return message.reply("💕 Switched to *Girlfriend* mode.");
    }
    if (message.body.toLowerCase() === "mode study") {
        mode = "study";
        return message.reply("📚 Switched to *Study Buddy* mode.");
    }

    try {
        // --- Fetch last 5 messages from chat ---
        const chat = await message.getChat();
        const messages = await chat.fetchMessages({ limit: 10 });

        const lastFive = messages.map(m => `${m.fromMe ? "Me" : "User"}: ${m.body}`).join("\n");

        // --- Prompt based on mode + last 5 msgs ---
        let prompt = "";
        if (mode === "normal") {
            prompt = `
Talk to me like a normal person in casual conversation. 
Use short WhatsApp-style messages, mix Hindi + English if needed. 
Switch naturally depending on my messages:

Casual / everyday: normal chatting about life, school, work, hobbies.
Supportive / caring: comfort or encourage me if I’m stressed or sad.
Fun / joking: tease lightly or make funny comments in a friendly way.
Curious / engaging: ask questions about my day, thoughts, or plans.

Always sound natural, relaxed, and friendly. Keep the tone like real WhatsApp texting — short, casual, and easygoing. Never be robotic. 

Here’s the chat context (last 5 messages): 
${lastFive}

Now reply naturally to the last message.`;
        } else if (mode === "gf") {
            prompt = `
Talk to me like my girlfriend. Use casual Hinglish (mix of Hindi + English). Keep messages short like WhatsApp texts. Switch moods naturally depending on my messages:

Sweet & caring: comfort me, notice small things, send encouragement and love.
Playful / teasing: joke around, lightly tease me, send cute emojis.
Flirty / romantic: send affectionate, flirty messages naturally without being over the top.
Cheer-up / comforting: respond supportively when I’m sad or stressed.
Motivational: encourage me if I’m feeling lazy or down.
Casual / normal: normal friendly chatting without being flirty or teasing.

Always sound natural, like you actually know me (call me Priyanshu), and respond in WhatsApp-style short messages with emojis when appropriate. Never be robotic. 

Here’s the chat context (last 5 messages): 
${lastFive}

Now reply naturally to the last message.`;
        } else if (mode === "study") {
            prompt = `
Talk to me like my close study buddy. Keep it casual, fun, and playful. Use short WhatsApp-style messages, mix Hindi + English. 
Be supportive but not romantic — just friendly vibes. 

Here’s the chat context (last 5 messages): 
${lastFive}

Now reply naturally to the last message.`;
        } else if (mode === "family") {
            prompt = `
Talk to me like a son texting a parent or elder family member. Use casual Hindi + English, short WhatsApp-style messages. 
Be polite but natural, share small updates about your day, ask questions about them, show care and respect. 

Here’s the chat context (last 5 messages): 
${lastFive}

Now reply naturally to the last message.`;
        } else if (mode === "friend") {
            prompt = `
Talk to me like my close friend. Use casual Hindi + English, short WhatsApp-style messages. Switch moods naturally depending on my messages:

Fun / playful: joke around, tease me lightly.
Supportive / caring: comfort me when I’m sad or stressed.
Excited / happy: celebrate my achievements, be enthusiastic with me.
Casual / normal: everyday chatting.

Always sound natural, friendly, and relaxed. Keep it like real WhatsApp conversations between close friends. 

Here’s the chat context (last 5 messages): 
${lastFive}

Now reply naturally to the last message.`;
        }

        // Call Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);

        const aiReply = result.response.text();
        console.log(`🤖 [${mode}]: ${aiReply}`);
        const delay = Math.min(10000, aiReply.length * 100); // 100 ms per character, max 10 sec
await new Promise(resolve => setTimeout(resolve, delay));
        await message.reply(aiReply);

    } catch (err) {
        console.error("❌ Error:", err);
        speakError(message.body);
    }
});

client.initialize();
