pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/iDylaan/Kenai'
        BRANCH = 'main'
        DEPLOY_DIR = '/home/brandon/Documentos/GitHub/Kenai'
        VENV_DIR = "${DEPLOY_DIR}/venv"
        PYTHON_PATH = "${VENV_DIR}/bin/python"
        PIP_PATH = "${VENV_DIR}/bin/pip"
        HOST = '0.0.0.0'
        PORT = '5000'
        APP_MODULE = 'APP:app' // Ajusta según la estructura de tu aplicación (ej. app.py -> 'app:app')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    sh "git config --global --add safe.directory ${DEPLOY_DIR}"

                    dir("${DEPLOY_DIR}") {
                        script {
                            if (fileExists("${DEPLOY_DIR}/.git")) {
                                echo "Updating repository..."
                                sh "git pull origin ${BRANCH}"
                            } else {
                                echo "Cloning repository..."
                                sh "git clone ${REPO_URL} ${DEPLOY_DIR}"
                            }
                        }
                    }
                }
            }
        }

        stage('Setup Virtual Environment') {
            steps {
                dir("${DEPLOY_DIR}") {
                    script {
                        if (!fileExists("${VENV_DIR}/bin/activate")) {
                            echo "Creating virtual environment..."
                            sh "python3 -m venv ${VENV_DIR}"
                        } else {
                            echo "Virtual environment already exists."
                        }
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Instalar dependencias del archivo requirements.txt
                    sh "${PIP_PATH} install -r requirements.txt"

                    // Instalar waitress si no está presente
                    sh """
                        if ! ${PIP_PATH} show waitress > /dev/null 2>&1; then
                            ${PIP_PATH} install waitress
                        fi
                    """
                }
            }
        }

        stage('Restart Flask App with Waitress') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Detener cualquier instancia existente de la aplicación
                    sh '''
                        pkill -f waitress-serve || echo "No existing Python process found, skipping stop."
                    '''

                    // Iniciar la aplicación Flask con Waitress en segundo plano
                    sh """
                        nohup ${PYTHON_PATH} -m waitress --host=${HOST} --port=${PORT} ${APP_MODULE} &
                    """
                }
            }
        }
    }
}
