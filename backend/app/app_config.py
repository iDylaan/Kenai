import os
from dotenv import load_dotenv


class Config:
    ENVIROMENT = os.getenv("ENVIROMENT")

    ### POSTGRESQL ###
    PGL_HOST = os.getenv("PGL_HOST")
    PGL_USER = os.getenv("PGL_USER")
    PGL_PASS = os.getenv("PGL_PASS")
    PGL_PORT = os.getenv("PGL_PORT")
    PGL_DB = os.getenv("PGL_DB")
