from typing import Optional
from beanie import Document, Indexed, PydanticObjectId
from datetime import datetime

from pydantic import Field, BaseModel

class BadSiteInput(BaseModel):
    user: Optional[Indexed(PydanticObjectId)]
    link : str
    risk: int
    
class BadSite(Document, BadSiteInput):
    date_time : Indexed(datetime) = Field(default_factory=datetime.utcnow)