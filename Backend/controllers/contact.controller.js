import axios from "axios";
import { DISCORD_WEBHOOK_URL } from "../config/index.js";

export async function handleContactSubmit(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill out all fields: name, email, and message." });
  }

  const webhookUrl = DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[Contact Form] No DISCORD_WEBHOOK_URL set in environment variables!");
    return res.json({
      success: true,
      message: "Message received locally! Configure DISCORD_WEBHOOK_URL in your backend .env file to send it to Discord."
    });
  }

  try {
    const discordPayload = {
      embeds: [
        {
          title: "📩 New Portfolio Contact Message",
          color: 5213439,
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Message", value: message },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Portfolio Contact Form Integration" },
        },
      ],
    };

    await axios.post(webhookUrl, discordPayload);
    console.log(`[Contact Form] Message from ${name} (${email}) sent to Discord Webhook.`);
    return res.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("[Contact Form] Error sending message to Discord webhook:", error.message);
    return res.status(500).json({ error: "Failed to forward message to Discord." });
  }
}
