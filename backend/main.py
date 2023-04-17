#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import openai
from dotenv import load_dotenv
from time import ctime
import json

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
prompt = "Generate advanced BPMN 2.0 XML for business process that describes online payments. Make it in format that may be used in js-bmpn library and without <bpmn2:extensionElements>."
temperature = 0.9
top_p = 1
frequency_penalty = 0
presence_penalty = 0

response = openai.Completion.create(
  model="text-davinci-003",
  prompt=prompt,
  temperature=temperature,
  max_tokens=4000,
  top_p=top_p,
  frequency_penalty=frequency_penalty,
  presence_penalty=presence_penalty,
)


text = response['choices'][0]['text']

print("Response: ", response)
print("Type: ", type(response))

with open("gpt_responses_all.txt", 'a') as file:
    file.write(text)
    file.write(f"Prompt: {prompt}\nTemperature: {temperature} \ntop_p: {top_p}\n Tokens_resp: {response['usage']['completion_tokens']}")
    file.write("\n\n")
    file.write("-" * 100)
    file.write("\n\n")

with open("gpt_response5.txt", 'a') as file2:
    file2.write(text)

