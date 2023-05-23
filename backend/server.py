#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import os

from BPMN import clean_xml
from main import make_openai_request, save_response, get_test_XML, \
    increment_requests_number, add_error, increment_failure_requests_number, get_example_XML, \
    make_list_of_activities_regenerate_request, make_diagram_based_on_activities, check_first_line


class OpenAI(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_text', required=True)
        parser.add_argument('items_number', required=True)
        parser.add_argument('temperature', required=True)
        parser.add_argument('frequency_penalty', required=True)
        parser.add_argument('regenerate_answer', required=True)
        args = parser.parse_args()
        user_text, items_number, temperature, frequency_penalty, regenerate_answer = args['user_text'], int(
            args['items_number']), float(args['temperature']), float(args['frequency_penalty']), bool(args['regenerate_answer'])

        try:
            resp = make_openai_request(
                user_text, items_number, temperature, frequency_penalty)
            text = resp['choices'][0]['text']
            text = check_first_line(text)
            cleared_text = clean_xml(text)
            save_response(cleared_text, resp, user_text)
        except Exception as e:
            if "Please reduce your prompt; or completion length." or "is less than the minimum" in str(e):
                return {'xmlString': "Length error:" + str(e)}, 411
            else:
                return {'xmlString': str(e), 'status': 500}, 500
        return {'xmlString': cleared_text, 'status': 200}, 200


class OpenAIRegenerate(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_text', required=True)
        parser.add_argument('items_number', required=True)
        parser.add_argument('temperature', required=True)
        parser.add_argument('frequency_penalty', required=True)
        parser.add_argument('regenerate_answer', required=True)
        args = parser.parse_args()
        user_text, items_number, temperature, frequency_penalty, regenerate_answer = args['user_text'], int(
            args['items_number']), float(args['temperature']), float(args['frequency_penalty']), bool(args['regenerate_answer'])

        try:
            activities = make_list_of_activities_regenerate_request(
                user_text, items_number, temperature, frequency_penalty)
            activities_text = activities['choices'][0]['text']
            print(activities_text)

            diagram = make_diagram_based_on_activities(
                activities_text, items_number, temperature, frequency_penalty)
            diagram_text = diagram['choices'][0]['text']
            print(diagram_text)
            diagram_text = check_first_line(diagram_text)

            cleared_text = clean_xml(diagram_text)
            save_response(cleared_text, diagram, user_text)

        except Exception as e:
            return {'xmlString': str(e), 'status': 500}, 500
        return {'xmlString': cleared_text, 'status': 200}, 200


class TestRequest(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_text', required=True)
        parser.add_argument('items_number', required=True)
        parser.add_argument('temperature', required=True)
        parser.add_argument('frequency_penalty', required=True)
        parser.add_argument('regenerate_answer', required=False)

        args = parser.parse_args()
        user_text, items_number, temperature, frequency_penalty = args['user_text'], int(args['items_number']), float(
            args['temperature']), float(args['frequency_penalty'])
        test_XML = get_example_XML("examples/BookLendingExample.bpmn")
        test_XML = check_first_line(test_XML)
        print(test_XML)
        return {'xmlString': test_XML, 'status': 200}, 200


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


class ExampleFile(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('exampleNumber', required=True)
        args = parser.parse_args()
        example_number = int(args['exampleNumber'])
        xml_file: str
        if example_number == 0:
            xml_file = get_example_XML("examples/BookLendingExample.bpmn")
        elif example_number == 1:
            xml_file = get_example_XML("examples/BookingExample.bpmn")
        elif example_number == 2:
            xml_file = get_example_XML("examples/CashMaschineExample.bpmn")
        elif example_number == 3:
            xml_file = get_example_XML("examples/OnlineShopExample.bpmn")
        elif example_number == 4:
            xml_file = get_example_XML("examples/PizzaOrderingExample.bpmn")
        elif example_number == 5:
            xml_file = get_example_XML("examples/app_explained.bpmn")
        else:
            return {'xmlString': 'ERROR XML RECEIVED', 'status': 404}, 404
        return {'xmlString': xml_file, 'status': 200}, 200


class ExampleFileGPT(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('exampleNumber', required=True)
        args = parser.parse_args()
        example_number = int(args['exampleNumber'])
        xml_file: str
        if example_number == 0:
            xml_file = get_example_XML("examplesGPT/Library-LONG.bpmn")
        elif example_number == 1:
            xml_file = get_example_XML("examplesGPT/Booking-LONG.bpmn")
        elif example_number == 2:
            xml_file = get_example_XML("examplesGPT/ATM-SHORT.bpmn")
        elif example_number == 3:
            xml_file = get_example_XML("examplesGPT/onlineshop-SHORT.bpmn")
        elif example_number == 4:
            xml_file = get_example_XML("examplesGPT/pizz-LONG.bpmn")
        elif example_number == 5:
            xml_file = get_example_XML("examplesGPT/app_explained.bpmn")
        else:
            return {'xmlString': 'ERROR XML RECEIVED', 'status': 404}, 404
        return {'xmlString': xml_file, 'status': 200}, 200


def server():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    api.add_resource(OpenAI, '/openai')
    api.add_resource(OpenAIRegenerate, '/openairegenerate')
    api.add_resource(TestRequest, '/testRequest')
    api.add_resource(ExampleFile, '/examples')
    api.add_resource(ExampleFileGPT, '/examplesGPT')
    api.add_resource(RequestInfo, '/reqInfo')
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)


if __name__ == '__main__':
    server()
