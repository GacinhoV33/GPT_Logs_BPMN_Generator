#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import os

from BPMN import clean_xml
from main import make_openai_request, save_response, get_test_XML, \
    increment_requests_number, add_error, increment_failure_requests_number


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
        # print("items_number", items_number)
        # print("temperature: ", temperature)
        # print("frequency_penalty", frequency_penalty)
        resp = make_openai_request(user_text, items_number, temperature, frequency_penalty)
        text = resp['choices'][0]['text']
        print(text)
        cleared_text = clean_xml(text)
        # cleared_text = clear_response(text)
        save_response(cleared_text, resp)
        # print("Success, the data: ", cleared_text)
        return {'xmlString': cleared_text}, 200


class TestRequest(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_text', required=True)
        parser.add_argument('items_number', required=True)
        parser.add_argument('temperature', required=True)
        parser.add_argument('frequency_penalty', required=True)
        args = parser.parse_args()
        user_text, items_number, temperature, frequency_penalty = args['user_text'], int(args['items_number']), float(
            args['temperature']), float(args['frequency_penalty'])
        test_XML = get_test_XML()
        return {'xmlString': test_XML}, 200


class RequestInfo(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('success', required=True)
        parser.add_argument('error_info', required=False)
        args = parser.parse_args()
        success, error_info = args['success'], args['error_info']
        if success == 'success':
            increment_requests_number()
        else:
            increment_failure_requests_number()
            add_error(error_info)
        return {'status': 200}, 200


def server():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    api.add_resource(OpenAI, '/openai')
    api.add_resource(TestRequest, '/testRequest')
    api.add_resource(RequestInfo, '/reqInfo')
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)


if __name__ == '__main__':
    server()