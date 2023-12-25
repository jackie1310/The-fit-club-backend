from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv('OPEN_AI_KEY')
print(openai_api_key)
client = OpenAI(api_key= openai_api_key)
app = Flask(__name__)
CORS(app)

@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.json
    height = data['height']
    weight = data['weight']
    waist = data['waist']
    Hip = data['hip']
    Age = data['age']
    prompt = f"Depending on these statistics: Height({height}), Weight({weight}), Waist({waist}), Hip({Hip}), Age({Age}), write a brief report calculating BMI and hip-to-waist ratio in one paragraph no more than 120 words reporting the condition of the body. Make sure your spelling is correct."
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    response = completion.choices[0].message.content
    return make_response(jsonify(response))

def create_app() :
    app.debug = True
    app.run()
    app.run(debug = True)