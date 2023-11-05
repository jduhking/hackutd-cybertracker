from beanie import Document, PydanticObjectId, Indexed
from models.badsite import BadSite
from pydantic import BaseModel, Field
from typing import List, Optional
class User(Document):
    email : Indexed(str)
    name : str 
    total_sites_visited: int
    phishing_links : int

class UserProjection(BaseModel):
    name : str
    id : PydanticObjectId = Field(alias="_id")
    
class UserOut(User, BaseModel):
    badvisits  : List[BadSite]
    score : float
    bonus : float
    
