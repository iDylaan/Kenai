pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/iDylaan/Kenai'
        BRANCH = 'main'
        DEPLOY_DIR = 'C:/Users/danie/OneDrive/Documentos/GitHub/Kenai'
        VENV_DIR = "${DEPLOY_DIR}/venv"
        PYTHON_PATH = "${VENV_DIR}/Scripts/python.exe"
        PIP_PATH = "${VENV_DIR}/Scripts/pip.exe"
        HOST = '0.0.0.0'
        PORT = '5000'
        APP_MODULE = 'APP:app' // Ajusta según la estructura de tu aplicación (ej. app.py -> 'app:app')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    bat "git config --global --add safe.directory ${DEPLOY_DIR.replace('\\', '/')}"

                    dir("${DEPLOY_DIR}") {
                        script {
                            if (fileExists("${DEPLOY_DIR}/.git")) {
                                echo "Updating repository..."
                                bat "git pull origin ${BRANCH}"
                            } else {
                                echo "Cloning repository..."
                                bat "git clone ${REPO_URL} ${DEPLOY_DIR}"
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
                        if (!fileExists("${VENV_DIR}/Scripts/activate")) {
                            echo "Creating virtual environment..."
                            powershell """
                                virtualenv ${VENV_DIR}
                            """
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
                    powershell """
                        & ${PIP_PATH} install -r requirements.txt
                    """
                    // Instalar waitress si no está presente
                    powershell """
                        if (-not (& ${PIP_PATH} show waitress)) {
                            & ${PIP_PATH} install waitress
                        }
                    """
                }
            }
        }
        
        stage('Restart Flask App with Waitress') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Detener cualquier instancia existente de la aplicación
                    powershell '''
                        try {
                            $process = Get-Process -Name "python" -ErrorAction Stop
                            Stop-Process -InputObject $process -Force
                        } catch {
                            Write-Host "No Python process found, skipping stop."
                        }
                    '''
                    // Iniciar la aplicación Flask con Waitress en segundo plano
                    powershell """
                        Start-Process -NoNewWindow -FilePath ${PYTHON_PATH} -ArgumentList '-m waitress --host=${HOST} --port=${PORT} ${APP_MODULE}' -RedirectStandardOutput '${DEPLOY_DIR}/waitress.log' -RedirectStandardError '${DEPLOY_DIR}/waitress_error.log'
                    """
                }
            }
        }
    }
}
