import Shop from "../data";
import "./App.css";
import react, { useState } from "react";
import cursor from "../cursor";

const App = () => {
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    exec(`python chatbot.py "${userMessage}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        setBotResponse("Đã có lỗi xảy ra.");
      } else if (stderr) {
        console.error(`stderr: ${stderr}`);
        setBotResponse("Đã có lỗi xảy ra.");
      } else {
        setBotResponse(stdout.trim());
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <div id="container"></div>
      <div>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Hỏi tôi điều gì đó"
          style={{ cursor: cursor.pointer }} // Áp dụng kiểu con trỏ từ cursor
        />
        <button
          onClick={handleSubmit}
          style={{ cursor: cursor.pointer }} // Cũng áp dụng cho nút
        >
          Gửi
        </button>
      </div>
      {loading ? <p>Đang tải...</p> : botResponse && <p>Bot: {botResponse}</p>}

      <div>
        <Shop />
      </div>
    </div>
  );
};
