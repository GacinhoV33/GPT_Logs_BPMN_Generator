#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request
from main import make_openai_request, save_response
app = Flask(__name__)

# GET method route
@app.route('/', methods=['GET'])
def getOpenAiResponse():
    user_text, items_number, temperature, frequency_penalty = request.args.get('user_text'), int(request.args.get('items_number')), float(request.args.get('temperature')), float(request.args.get('frequency_penalty'))
    print("user_text: ", user_text)
    print("items_number", items_number)
    print("temperature: ", temperature)
    print("frequency_penalty", frequency_penalty)
    resp = make_openai_request(user_text, items_number, temperature, frequency_penalty)
    text = resp['choices'][0]['text']
    save_response(text, resp)
    return {"text" : text}, 200


if __name__ == '__main__':
    app.run(debug=True)