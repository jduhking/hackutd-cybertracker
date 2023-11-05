from datetime import datetime, timedelta
from fastapi import APIRouter

from models.user import User, UserProjection as projection
from models.badsite import BadSite, BadSiteInput

from beanie import PydanticObjectId
from beanie.operators import And, GTE, LTE, Eq

from models.badsite import BadSite

from models.phishingemail import PhishingEmail, PhishingEmailInput
router = APIRouter(prefix="/user")

@router.get("/")
async def get_users():
    users = await User.all().project(projection_model=projection).to_list()
    return users

@router.post("/")
async def create_user(user : User):
    return await user.save()

@router.get("/user_by_email/{email}")
async def get_user_by_email(email):
    user = await User.find_one(Eq(User.email, email))
    return user

@router.get("/extension_page/{email}")
async def user_extension(email):
    user = await User.find_one(Eq(User.email, email))
    return {
        "phishing_links": user.phishing_links
    }

@router.get("/badmonthlyvisits")
async def get_bad_visits_last_month(id : PydanticObjectId):
    now = datetime.utcnow()
    last_month = now - timedelta(days=30)
    
    child = And(GTE(BadSite.date_time, last_month), LTE(BadSite.date_time, now))
    query = And(child , Eq (BadSite.user, id) )
    res = await BadSite.find_many(query).to_list()
    return res

@router.post("/save_url")
async def save_url(input:BadSiteInput):
    site = BadSite(link=input.link, user=input.user, risk=input.risk)
    userid = site.user
        
    res = await User.get(userid)
    res.total_sites_visited+=1

    # Process URL
    if site.risk > 5:
        res = await site.save()
        return res

    
    return await res.save()
    # return "success"

@router.get("/badvisits")
async def badVisitsAlltime(userid : PydanticObjectId):
    res = await BadSite.find_many(BadSite.user == userid).to_list()
    return res

@router.get("/phishing")
async def getPhishingEmails(userid : PydanticObjectId):
    res = await PhishingEmail.find_many(PhishingEmail.user == userid).to_list()
    return res

@router.put("/save_phish")
async def savePhishingAttempt(email : PhishingEmailInput):
    user = await User.get(email.user)

    user.phishing_links +=1
    email = PhishingEmail(email=email.email, user=email.user)
    await user.save()
    return await email.save()



@router.get("/{id}")
async def get_user(id: PydanticObjectId):
    user = await User.get(id)
    return user

