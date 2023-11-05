from datetime import datetime
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field 

class PhishingEmailInput(BaseModel):
    email : str
    user : PydanticObjectId

class PhishingEmail(Document, PhishingEmailInput):
    date :datetime =  Field(default_factory=datetime.utcnow)
    pass

