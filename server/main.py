from typing import Union
from contextlib import asynccontextmanager
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from models.phishingemail import PhishingEmail
from utils.config import Config
from beanie import init_beanie
from fastapi.middleware.cors import CORSMiddleware
import resend
from fastapi.middleware.cors import CORSMiddleware


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
    await init_beanie(database=client.db_name, document_models=[User, BadSite, PhishingEmail])
    try:
        info = client.server_info()
        print(f"success, connected to {info}")
    except Exception as e:
        print(f"Failed with exception {e}")
    pass

app = FastAPI(lifespan=lifespan)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserRouter)
app.include_router(DevRouter)

@app.get("/")
async def read_root(): 
    
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
