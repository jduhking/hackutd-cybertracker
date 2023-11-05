
import random
from fastapi import APIRouter, Response
from models.email import Email as EmailObject
from models.phishingemail import PhishingEmail, PhishingEmailInput, SendPhishInput
from email_api.email_api import Email_api
import resend

from models.user import User
from beanie.operators import Eq
from router.user import savePhishingAttempt
from beanie import PydanticObjectId
from algorithms.calcValue import calcValue
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

        return await user.save()
        
        
    except Exception as e:
        return Response(content="Email could not be sent", status_code=403)
    
@router.post("/send_phishing_email")
async def sendPhish(email : SendPhishInput):
    api = Email_api()
    random_number = random.randint(0, 5)

    subject = api.get_subject(random_number)
    message = api.get_message(random_number)
    email_input = EmailObject(recepient=email.recepient, sender=email.source, subject=subject, body=message)
    res = await send_email(email=email_input)
    phishemailinput = PhishingEmailInput(email=email_input.recepient, user=email.user)
    await savePhishingAttempt(email=phishemailinput)
    return res


@router.get("/calculateval")
async def calculate(id : PydanticObjectId):
    return calcValue([id])
    