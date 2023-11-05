
from fastapi import APIRouter, Response
from models.email import Email as EmailObject
import resend

from utils.config import Config

router = APIRouter(prefix="/dev")

@router.post("/email")
async def send_email(email : EmailObject):
    data = {"from" : email.sender, "to" : email.recepient, "subject" : email.subject,
                "html" : email.body}
    try:
        return resend.Emails.send(data)
    except Exception as e:
        return Response(content="Email could not be sent", status_code=403)
    
    

