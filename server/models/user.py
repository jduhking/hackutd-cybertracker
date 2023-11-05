from beanie import Document, PydanticObjectId, Indexed
from models.badsite import BadSite
from pydantic import BaseModel, Field

class User(Document):
    email : Indexed(str)
    name : str 
    total_sites_visited: int
    phishing_links : int

class UserProjection(BaseModel):
    name : str
    id : PydanticObjectId = Field(alias="_id")
    
class UserOut( User, BaseModel):
    bad_websites : list[BadSite]

    def fromUser(user : User):
        return UserOut(name=user.name, email=user.email, total_sites_visited = user.total_sites_visited, phishing_links=user.phishing_links)