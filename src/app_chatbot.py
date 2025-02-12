from flask import Flask, request, jsonify
import chatbot  # Đây là tệp chatbot.py mà bạn đã viết

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get('message')
    bot_response = chatbot.get_response(user_message)  # Hàm xử lý phản hồi chatbot
    return jsonify({"response": str(bot_response)})

if __name__ == "__main__":
    app.run(debug=True)
