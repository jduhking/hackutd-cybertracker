from typing import Union
from contextlib import asynccontextmanager
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from utils.config import Config
from beanie import init_beanie
import resend

from models.user import User, UserProjection as projection
from models.badsite import BadSite

from router.user import router as UserRouter
from router.dev import router as DevRouter
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
    
    resend.api_key = config.resend_api_key
    await init_beanie(database=client.db_name, document_models=[User, BadSite])
    try:
        info = client.server_info()
        print(f"success, connected to {info}")
    except Exception as e:
        print(f"Failed with exception {e}")
    pass

app = FastAPI(lifespan=lifespan)

app.include_router(UserRouter)
app.include_router(DevRouter)

@app.get("/")
async def read_root(): 
    
    user = User(name="Michael", total_sites_visited=0, phishing_links=0)
    await user.save()

    site = BadSite(link="https://www.google.com", risk=7, user=user.id)
    await site.save()
    
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
