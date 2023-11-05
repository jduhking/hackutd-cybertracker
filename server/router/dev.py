
from fastapi import APIRouter, Response
from models.email import Email as EmailObject
import resend

from models.user import User
from beanie.operators import Eq

router = APIRouter(prefix="/dev")

@router.post("/email")
async def send_email(email : EmailObject):

    data = {"from" : email.sender, "to" : email.recepient, "subject" : email.subject,
                "html" : email.body}
    try:
        
        user = await User.find_one(Eq(User.email, email.recepient))
        
        if user == None:
            raise Exception(f"User with email {email.recepient} doesn't exist")
        
        resend.Emails.send(data)

        user.phishing_links +=1

        return await user.save()
        
        
    except Exception as e:
        return Response(content="Email could not be sent", status_code=403)
    
