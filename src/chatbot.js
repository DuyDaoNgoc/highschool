import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleSubmit = async () => {
    if (!userMessage) return; // Nếu người dùng không nhập gì thì không gửi yêu cầu

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: userMessage,
      });
      setBotResponse(response.data.response);
    } catch (error) {
      console.error("Error fetching response from chatbot:", error);
      setBotResponse("Sorry, there was an error connecting to the chatbot.");
    }
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask me something"
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
      <div>
        {botResponse && (
          <p>Bot: {botResponse}</p> // Hiển thị phản hồi từ chatbot
        )}
      </div>
    </div>
  );
};

export default Chatbot;
