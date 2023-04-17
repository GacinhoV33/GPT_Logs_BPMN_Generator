#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import openai
from dotenv import load_dotenv
from datetime import datetime

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

MAX_TOKENS = 4096 - int(len(PROMPT)/4)
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


def make_openai_request():
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=PROMPT,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        top_p=TOP_P,
        frequency_penalty=FREQUENCE_PENALTY,
        presence_penalty=PRESENCE_PENALTY,
    )

    return response


if __name__ == "__main__":
    response = make_openai_request()
    text = response['choices'][0]['text']
    save_response(text, response)