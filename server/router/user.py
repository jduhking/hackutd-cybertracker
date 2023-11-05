
from fastapi import APIRouter, FastAPI

from models.user import User, UserProjection as projection


router = APIRouter(prefix="/user")

@router.get("/")
async def get_users():
    users = await User.all().project(projection_model=projection).to_list()
    return users