import os
from dotenv import dotenv_values

class Config:
    def __init__(self) -> None:
        values = dotenv_values(".env")
        if values == {}:
            values["USERNAME"] = os.getenv("USERNAME")
            values["PASSWORD"] = os.getenv("PASSWORD")
            values["RESENDAPI"] = os.getenv("RESENDAPI")
            
        self.db_username = values["USERNAME"]
        self.db_password = values["PASSWORD"]
        self.resend_api_key = values["RESENDAPI"]
        pass

    def mongoConnectionURI(self)->str:
        return f"mongodb+srv://{self.db_username}:{self.db_password}@cluster0.wxlym6w.mongodb.net/?retryWrites=true&w=majority"