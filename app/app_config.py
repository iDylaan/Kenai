import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv('.env')


class Config:
    ### POSTGRESQL ###
    PGL_HOST = os.getenv("PGL_HOST")
    PGL_USER = os.getenv("PGL_USER")
    PGL_PASS = os.getenv("PGL_PASS")
    PGL_PORT = os.getenv("PGL_PORT")
    PGL_DB = os.getenv("PGL_DB")

    ### BASKET ###
    ROOT_PATH = os.getenv('ROOT_PATH')
    BASKET_DIR = os.getenv('BASKET_DIR')
    
    ### LOGS DIR ###
    APP_LOG_DIR = os.getenv('APP_LOG_DIR')

    ### JWT ###
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')