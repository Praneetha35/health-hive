import React, { useState } from "react";

// Define your API key here
const API_KEY = process.env.GROQ; // Replace with your actual API key

const ChatBot: React.FC = () => {
    const [userMessage, setUserMessage] = useState<string>(""); // For user's input
    const [response, setResponse] = useState<string>(""); // To store the bot response
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

    // Function to send a POST request to the API
    const sendMessage = async () => {
        if (!userMessage.trim()) return; // Prevent sending empty messages

        setIsLoading(true); // Start loading
        setResponse(""); // Clear previous response

        const requestBody = {
            contents: [{ parts: [{ text: userMessage }] }],
        };

        try {
            // Send the POST request
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            const data = await res.json();

            // Assuming the API returns the generated text in `data.generatedContent`
            if (data?.contents?.[0]?.parts?.[0]?.text) {
                setResponse(data.contents[0].parts[0].text); // Set the API response in state
            } else {
                setResponse("No response from the API.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setResponse("Error: Could not fetch the data.");
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div style={styles.chatContainer}>
            <h2 style={styles.header}>BotFriend Chat</h2>

            {/* Display the bot's response */}
            <p style={styles.botMessage}>
                <strong>Bot:</strong>{" "}
                {isLoading ? "Bot is thinking..." : response}
            </p>

            {/* Input field for user to type a message */}
            <div style={styles.inputArea}>
                <input
                    style={styles.input}
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask the bot something..."
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

// Inline styles object
const styles = {
    chatContainer: {
        width: "50%",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        textAlign: "center" as const, // Fix TypeScript warning
    },
    header: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    botMessage: {
        fontSize: "16px",
        marginBottom: "20px",
        textAlign: "left" as const, // Fix TypeScript warning
    },
    inputArea: {
        display: "flex",
        justifyContent: "center" as const,
        alignItems: "center" as const,
        gap: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "70%",
        fontSize: "16px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    disabledButton: {
        backgroundColor: "#ccc",
        cursor: "not-allowed",
    },
};

export default ChatBot;
