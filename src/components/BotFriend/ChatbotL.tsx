import React, { useState } from "react";
import Groq from "groq-sdk";
import { useUser } from "@/lib/hooks/useUser";

// Initialize Groq with API Key
const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

interface Message {
    role: "user" | "bot";
    content: string;
}

const ChatBot: React.FC = () => {
    const [userMessage, setUserMessage] = useState<string>(""); // For user's input
    const [messages, setMessages] = useState<Message[]>([]); // Store chat messages
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const { data } = useUser(); // Fetch current user data

    // Function to generate a system prompt with user's goals
    const generateSystemPrompt = () => {
        if (!data?.payload?.goals && !data?.payload?.about) {
            return "You are BeeFriend act NOT as an assistant, but as pet or friend! A cute bee that helps the user's health and wellness journey. Talk in a friendly, younger, and cute manner. Keep your answers concise and not superfluous, act as if you are texting with a friend";
        } else if (!data?.payload?.goals) {
            const about = data?.payload?.about;
            return `You are BeeFriend act NOT as an assistant, but as pet or friend! A cute bee that helps the user's health and wellness journey. The user has not set any goals yet. This is a little more about them: ${about}. Talk in a friendly, younger, and cute manner. Keep your answers concise and not superfluous, act as if you are texting with a friend.`;
        } else if (!data?.payload?.about) {
            const userGoals = data.payload.goals.map(
                (goal: any) => goal.goalName
            );
            return `You are BeeFriend act NOT as an assistant, but as pet or friend! A cute bee that helps the user's health and wellness journey. The user is working on the following goals: ${userGoals.join(
                ", "
            )}. Talk in a friendly, younger, and cute manner. Keep your answers concise and not superfluous, act as if you are texting with a friend.`;
        }
        const userGoals = data.payload.goals.map((goal: any) => goal.goalName);
        const about = data.payload.about;
        return `You are BeeFriend act NOT as an assistant, but as pet or friend! A cute bee that helps the user's health and wellness journey. The user is working on the following goals: ${userGoals.join(
            ", "
        )}. This is a little more about the user: ${about}. Talk in a friendly, younger, and cute manner. Keep your answers concise and not superfluous, act as if you are texting with a friend.`;
    };

    // Function to send a message using Groq SDK
    const sendMessage = async () => {
        if (!userMessage.trim()) return; // Prevent sending empty messages

        setIsLoading(true); // Start loading
        setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage },
        ]); // Add user message

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: generateSystemPrompt(), // Start the chat with system prompt
                    },
                    {
                        role: "user",
                        content: userMessage, // Send user's message
                    },
                ],
                model: "llama3-70b-8192", // Specify the model
            });

            const botResponse =
                chatCompletion.choices[0]?.message?.content ||
                "No response from the bot.";
            setMessages((prev) => [
                ...prev,
                { role: "bot", content: botResponse },
            ]); // Add bot response
        } catch (error) {
            console.error("Error fetching data from Groq:", error);
            setMessages((prev) => [
                ...prev,
                { role: "bot", content: "Error: Could not fetch the data." },
            ]); // Error handling
        } finally {
            setUserMessage(""); // Clear input field
            setIsLoading(false); // End loading state
        }
    };

    // Function to handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isLoading) {
            sendMessage(); // Trigger message submission when Enter is pressed
        }
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.headerContainer}>
                <img
                    src={process.env.NEXT_PUBLIC_BEE} // Correct path to the image
                    alt="bee"
                    width={40}
                    height={40}
                    style={{ borderRadius: "5px" }}
                />
                <h2 style={styles.header}>BeeFriend Chat</h2>
            </div>
            <div style={styles.chatBox}>
                {/* Display all messages in chat bubbles */}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={
                            msg.role === "user"
                                ? styles.userMessage
                                : styles.botMessage
                        }
                    >
                        <span>{msg.content}</span>
                    </div>
                ))}
                {/* Loader for bot thinking */}
                {isLoading && (
                    <div style={styles.botMessage}>
                        <span>Bot is thinking...</span>
                    </div>
                )}
            </div>

            {/* Input field and send button */}
            <div style={styles.inputArea}>
                <input
                    style={styles.input}
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyPress} // Add keydown listener for "Enter" key
                    placeholder="Ask BeeFriend something..."
                />
                <button
                    style={
                        isLoading
                            ? { ...styles.button, ...styles.disabledButton }
                            : styles.button
                    }
                    onClick={sendMessage}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

// Inline styles object to resemble Apple Messenger
const styles = {
    chatContainer: {
        width: "100%",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "10px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column" as const,
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    headerContainer: {
        display: "flex", // Align header and image horizontally
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    header: {
        fontSize: "20px",
        textAlign: "center" as const,
    },
    chatBox: {
        maxHeight: "400px",
        overflowY: "auto" as const,
        padding: "10px",
        backgroundColor: "#f4f6f8",
        borderRadius: "20px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column" as const,
    },
    userMessage: {
        backgroundColor: "#007AFF", // iMessage blue bubble
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "20px",
        margin: "5px 0",
        alignSelf: "flex-end" as const,
        maxWidth: "80%",
        fontSize: "16px",
        wordBreak: "break-word" as const,
    },
    botMessage: {
        backgroundColor: "#E5E5EA", // iMessage light gray bubble
        color: "#000",
        padding: "10px 15px",
        borderRadius: "20px",
        margin: "5px 0",
        alignSelf: "flex-start" as const,
        maxWidth: "80%",
        fontSize: "16px",
        wordBreak: "break-word" as const,
    },
    inputArea: {
        display: "flex",
        alignItems: "center" as const,
        padding: "10px",
        backgroundColor: "#f4f6f8",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "20px",
        border: "1px solid #ddd",
        marginRight: "10px",
        fontSize: "16px",
        outline: "none",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007AFF",
        color: "#fff",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "16px",
        outline: "none",
    },
    disabledButton: {
        backgroundColor: "#ccc",
        cursor: "not-allowed",
    },
};

export default ChatBot;
