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


@app.post("/submit-form")
async def submit_form(data: FormData):
    prompt = f"A {data.age} woman with {data.hairColor} hair, {data.hairType} hair type, \
              {data.eyeColor} eyes, {data.skinColor} skin, {data.bodyType} body type, \
              {data.ethnicity} ethnicity, and {data.gender} gender. Face only"

    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    logger.info(response)
    return {"message": "Image generated successfully", "data": response}
