from beanie import Document
from models.badsite import BadSite

class User(Document):
    name : str
    badsitesvisited : list[BadSite] 
    total_sites_visited: int
    phishing_links : int


