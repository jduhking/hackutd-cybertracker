from pydantic import BaseModel
class Email(BaseModel):
    recepient : str
    sender: str
    subject : str
    body : str

