import { WebSocketServer } from "ws";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const wss = new WebSocketServer({ port: 4000 });
const clients = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  let userId;

  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data);
      if (message.type === "register") {
        userId = message.user_id;
        clients[userId] = ws;
        console.log(`User registered: ${message.userId}`);
        return;
      }
      const generateId = () => {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      };

      const newMessage = {
        id: generateId(),
        text: message.text,
        image: message.image,
        file: message.file,
        audio: message.audio,
        link: message.link,
        file_name: message.file_name,
        file_size: message.file_size,
        reply_data: message.reply_data,
        sender_id: message.sender_id,
        recipient_id: message.recipient_id,
        created_at: new Date().toISOString(),
        type: message.type,
        status: "delivered",
        reply_type: message.reply_type,
        reply_data: message.reply_data,
        reply_file_name: message.reply_file_name,
        reply_message_id: message.reply_message_id,
        caption: message?.caption,
        chat_type: message?.chat_type,
      };

      if (message.type === "isTyping") {
        const { sender_id, recipient_id, isTyping } = message;

        if (clients[recipient_id]) {
          const typingStatus = {
            type: "isTyping",
            sender_id,
            is_typing,
          };
          console.log(typingStatus);
          clients[recipient_id].send(typingStatus);
        } else {
          console.log(
            `Recipient ${recipient_id} is not connected for typing status.`,
          );
        }
        return;
      }
      if (clients[message.recipient_id]) {
        if (message.sender_id !== message.recipient_id) {
          clients[message.sender_id].send(newMessage);
        }
      } else {
        console.error(`Recipient ${message.recipient_id} is not connected.`);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    for (const id in clients) {
      if (clients[id] === ws) {
        delete clients[id];
        console.log(`User disconnected: ${id}`);
        break;
      }
    }
  });
});

console.log("WebSocket Server is running on ws://localhost:4000");
