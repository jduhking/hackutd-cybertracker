from typing import Union
from contextlib import asynccontextmanager
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from utils.config import Config
from beanie import init_beanie

from models.user import User
from models.badsite import BadSite

@asynccontextmanager
async def lifespan(app : FastAPI):
    # before server starts
    print("Hello")
    await init(app)
    yield

    # before server ends
    print("World")
    pass



async def init(app):
    config = Config()
    # connect to mongo
    client = AsyncIOMotorClient(config.mongoConnectionURI())
    await init_beanie(database=client.db_name, document_models=[User, BadSite])
    try:
        info = client.server_info()
        print(f"success, connected to {info}")
    except Exception as e:
        print(f"Failed with exception {e}")
    pass

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def read_root(): 
    site = BadSite(link="https://www.google.com", risk=7)
    user = User(name="Michael", badsitesvisited=[site], total_sites_visited=0, phishing_links=0)
    await user.save()
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
