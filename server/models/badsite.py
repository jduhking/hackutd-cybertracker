from beanie import Document

class BadSite(Document):
    link : str
    risk: int