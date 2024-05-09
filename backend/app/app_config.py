import os
from dotenv import load_dotenv

class Config:
    ENVIROMENT = os.getenv("ENVIROMENT")