
from fastapi import APIRouter, FastAPI

from models.user import User, UserProjection as projection
from beanie import PydanticObjectId

router = APIRouter(prefix="/user")

@router.get("/")
async def get_users():
    users = await User.all().project(projection_model=projection).to_list()
    return users

@router.get("/{id}")
async def get_user(id: PydanticObjectId):
    user = await User.get(id)
    return user