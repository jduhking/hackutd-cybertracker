from beanie import Document, PydanticObjectId, Indexed
from models.badsite import BadSite
from pydantic import BaseModel, Field
from typing import List
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
    def fromUser(user:User , ls : list[BadSite]):
        return( UserOut(email=user.email, name=user.name, total_sites_visited= user.total_sites_visited, phishing_links=user.phishing_links, badvisits=ls))