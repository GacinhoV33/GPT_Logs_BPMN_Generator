#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import openai
from dotenv import load_dotenv
from datetime import datetime
from lxml import etree

load_dotenv()
""" RESPONSE SETTINGS"""
openai.api_key = os.getenv("OPENAI_API_KEY")
TEMPERATURE = 0.7
TOP_P = 1
FREQUENCE_PENALTY = 0
PRESENCE_PENALTY = 0
NUMBER_OF_ITEMS = 10
MODEL_DESCRIBTION = "An online shop," \
                    "also known as an e-commerce website, is a platform that allows businesses to sell products or services" \
                    " to customers over the internet. Here are the basic steps of how an online shop typically works: Website creation: First, the " \
                    "business creates a website where customers can browse products, view prices, and make purchases. " \
                    "The website is designed to be user-friendly and secure, with features like shopping carts, payment gateways, and order tracking. " \
                    "Product listing: The business adds product information, photos, and pricing to their website. This includes creating product descriptions," \
                    " categorizing products, and setting prices. Order placement: Customers browse the online shop, select the products they want to buy, and" \
                    " add them to their shopping cart. Once they are ready to checkout, they provide their billing and shipping information." \
                    " Payment processing: The online shop uses a payment gateway to securely process the customer's payment information. " \
                    "This may include credit card information, PayPal, or other payment methods. Order fulfillment: Once the payment is processed, " \
                    "the business receives the order and prepares the product for shipping. They may use a third-party logistics provider to handle " \
                    "shipping and delivery. Customer service: The online shop provides customer service to handle any issues that arise with orders," \
                    " such as returns, refunds, or exchanges. Overall, an online shop is a convenient way for businesses to sell products to customers" \
                    " without the need for a physical storefront. By using the internet to reach a wider audience, businesses can increase their sales " \
                    "and expand their customer base."
PROMPT = "Generate advanced BPMN 2.0 XML for business proccess that has around " + str(NUMBER_OF_ITEMS) + " tasks. Make it in format that fit to js-bmpn library and without <bpmn2:extensionElements>.\n Business process describtion:" + MODEL_DESCRIBTION
PROMPT_BEGIN = "Generate advanced BPMN 2.0 XML for business proccess that has around"
PROMPT_MIDDLE = " tasks. Make it in format that fit to js-bmpn library and without <bpmn2:extensionElements>.\n Business process describtion:"
MAX_TOKENS = 4000 - int(len(PROMPT)/4)
print(MAX_TOKENS)


def save_response(text, response):
    with open("files/gpt_responses_all.txt", 'a') as file:
        file.write(text)
        file.write(
            f"Prompt: {PROMPT}\nTemperature: {TEMPERATURE} \ntop_p: {TOP_P}\n Tokens_resp: {response['usage']['completion_tokens']}")
        file.write("\n\n")
        file.write("-" * 100)
        file.write("\n\n")

    now = datetime.now()
    dt_string = now.strftime("%d-%m-%Y-%H-%M-%S")
    file_name = "files/gpt_response_"+ dt_string + ".txt"
    with open(file_name, 'w') as file2:
        file2.write(text)


def count_max_tokens(prompt: str):
    return 4096 - int(len(prompt)/4)


def make_prompt(user_text: str, number_of_items: int):
    return PROMPT_BEGIN + str(number_of_items) + PROMPT_MIDDLE + user_text


def validate_response(text: str):
    xmlschema_doc = etree.parse(text)
    xmlschema = etree.XMLSchema(xmlschema_doc)

    xml_doc = etree.parse(text)
    result = xmlschema.validate(xml_doc)
    return result


def make_openai_request(user_text, items_number=NUMBER_OF_ITEMS, temperature=TEMPERATURE, frequency_penalty=FREQUENCE_PENALTY):
    #TODO - change rest of params
    prompt = make_prompt(user_text, items_number)
    max_tokens = count_max_tokens(prompt)
    # delete print after testing 
    print(len(prompt))
    print(prompt)
    print("Max Tokens: ", max_tokens)
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=temperature,
        max_tokens=max_tokens,
        top_p=TOP_P,
        frequency_penalty=frequency_penalty,
        presence_penalty=PRESENCE_PENALTY,
    )
    return response


def clear_response(text_resp: str):
    #TODO think about regex
    if "\n" in text_resp[:8]:
        text2 = text_resp.replace("\n", "", 2)
        if "." in text_resp[:4]:
            return text2.replace(".", "", 1)
        else:
            return text2
    else:
        return text_resp


def get_test_XML(path: str = 'files/test_XML.bpmn'):
    text_XML: str
    with open(path, 'r') as file:
        text_XML = file.read()
    # return text_XML
    return "blablasl"

def increment_requests_number():
    print("req")


def increment_failure_requests_number():
    print("failure")


def add_error(error_info: str):
    print(error_info)


if __name__ == "__main__":
    response = make_openai_request(MODEL_DESCRIBTION)
    text = response['choices'][0]['text']
    # text_cleared = clear_response(text)
    # validate_response(text_cleared)
    save_response(text, response)