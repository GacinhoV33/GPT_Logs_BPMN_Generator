#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from main import make_openai_request, save_response, validate_response, clear_response


class OpenAI(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_text', required=True)
        parser.add_argument('items_number', required=True)
        parser.add_argument('temperature', required=True)
        parser.add_argument('frequency_penalty', required=True)

        args = parser.parse_args()
        user_text, items_number, temperature, frequency_penalty = args['user_text'], int(args['items_number']), float(args['temperature']), float(args['frequency_penalty'])
        print("user_text: ", user_text)
        print("items_number", items_number)
        print("temperature: ", temperature)
        print("frequency_penalty", frequency_penalty)
        resp = make_openai_request(user_text, items_number, temperature, frequency_penalty)
        text = resp['choices'][0]['text']
        cleared_text = clear_response(text)
        # validate_reponse(text)
        save_response(cleared_text, resp)
        print("Success, the data: ", cleared_text)
        return {'xmlString': cleared_text}, 200


def server():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    api.add_resource(OpenAI, '/openai')
    # api.add_resource(PositionEvaluation, '/pos_eval')
    app.run()


if __name__ == '__main__':
    server()