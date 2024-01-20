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
    prompt = f"A {data.age} years old person {data.gender} person with {data.hairColor} hair, {data.hairType} hair type, \
              {data.eyeColor} eyes, {data.skinColor} skin, {data.bodyType} body type, \
              {data.ethnicity} ethnicity. Face only - beautiful features. Ultrarealistic"

    # response = client.images.generate(
    #     model="dall-e-3",
    #     prompt=prompt,
    #     size="1024x1024",
    #     quality="standard",
    #     n=1,
    # )
    # image_url = response.data[0].url
    image_url = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Q6tXelh9xR8sTrUZQ3cWF1c8/user-kFDQy0aIrkJp1d1FoXtSudK6/img-zH5ND66NFX8gFR0f6dkWdQ5p.png?st=2024-01-20T19%3A32%3A19Z&se=2024-01-20T21%3A32%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-20T19%3A35%3A13Z&ske=2024-01-21T19%3A35%3A13Z&sks=b&skv=2021-08-06&sig=Xm1K4cgId8%2BvTis9ml0hy5PQOQ4sQEFk64E3RsqWdME%3D"
    print(response)
    return {"message": "Image generated successfully", "data": image_url}
