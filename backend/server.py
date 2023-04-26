#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request, Response
from main import make_openai_request, save_response, validate_response, clear_response
app = Flask(__name__)

# GET method route
@app.route('/', methods=['GET'])
def getOpenAiResponse():
    user_text, items_number, temperature, frequency_penalty = request.args.get('user_text'), int(request.args.get('items_number')), float(request.args.get('temperature')), float(request.args.get('frequency_penalty'))
    print("user_text: ", user_text)
    print("items_number", items_number)
    print("temperature: ", temperature)
    print("frequency_penalty", frequency_penalty)
    # resp = make_openai_request(user_text, items_number, temperature, frequency_penalty)
    # text = resp['choices'][0]['text']
    # cleared_text = clear_response(text)
    # validate_reponse(text)
    # save_response(cleared_text, resp)
    # print("Success, the data: ", cleared_text)

    resp = Response("Foo bar baz")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers["Access-Control-Allow-Credentials"] = True
    resp.headers["Content-Type"] = "application/json"
    return resp


if __name__ == '__main__':
    app.run(debug=True)