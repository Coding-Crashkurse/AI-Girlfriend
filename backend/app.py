from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import logging

logger = logging.getLogger(__name__)

from openai import OpenAI

load_dotenv(find_dotenv())

app = FastAPI()
client = OpenAI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FormData(BaseModel):
    name: str
    age: str
    hairColor: str
    bodyType: str
    eyeColor: str
    hairType: str
    skinColor: str
    ethnicity: str
    gender: str


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


@app.post("/submit-form")
async def submit_form(data: FormData):
    prompt = f"A {data.age} years old person {data.gender} person with {data.hairColor} hair, {data.hairType} hair type, \
              {data.eyeColor} eyes, {data.skinColor} skin, {data.bodyType} body type, \
              {data.ethnicity} ethnicity. Face only - beautiful features. Ultrarealistic"

    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    return {"message": "Image generated successfully", "data": image_url}


@app.post("/chat")
async def chat(request: ChatRequest):
    print("REQUEST: ", request)
    client = OpenAI()

    messages_dicts = [message.model_dump() for message in request.messages]

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo", messages=messages_dicts
    )
    response_message = completion.choices[0].message
    return {"response": response_message}
