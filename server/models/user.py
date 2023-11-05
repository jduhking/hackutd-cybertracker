from beanie import Document, PydanticObjectId
from models.badsite import BadSite
from pydantic import BaseModel, Field

class User(Document):
    name : str
    badsitesvisited : list[BadSite] 
    total_sites_visited: int
    phishing_links : int

class UserProjection(BaseModel):
    name : str
    id : PydanticObjectId = Field(alias="_id")