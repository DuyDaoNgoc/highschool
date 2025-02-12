from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer


chatbot = ChatBot('MyBot')

trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train("chatterbot.corpus.english")

def get_response(user_input):
    response = chatbot.get_response(user_input)
    return str(response)

if __name__ == "__main__":
    while True:
        user_input = input("You: ")  
        if user_input.lower() == 'exit':  # Dừng nếu người dùng gõ "exit"
            break
        print("Bot:", get_response(user_input))  # In ra phản hồi từ chatbot
