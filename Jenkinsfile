pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/iDylaan/Kenai'
        BRANCH = 'main'
        DEPLOY_DIR = 'C:/Users/danie/OneDrive/Documentos/GitHub/Kenai'
        VENV_DIR = "${DEPLOY_DIR}/venv" // Directorio de tu entorno virtual
        FLASK_RUN_COMMAND = 'flask run'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Clona el repositorio o actualiza si ya existe
                script {
                    if (fileExists("${DEPLOY_DIR}")) {
                        dir("${DEPLOY_DIR}") {
                            bat 'git pull origin ${BRANCH}'
                        }
                    } else {
                        bat "git clone -b ${BRANCH} ${REPO_URL} ${DEPLOY_DIR}"
                    }
                }
            }
        }

        stage('Setup Virtual Environment') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Verificar si el entorno virtual existe, y crearlo si no
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
                    // Activar el entorno virtual y luego instalar dependencias
                    powershell """
                        ${VENV_DIR}/Scripts/activate
                        pip install -r requirements.txt
                    """
                }
            }
        }
        
        stage('Restart Flask App') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Detener el servidor existente (si es necesario)
                    powershell  'Get-Process -Name "python" | Stop-Process -Force || exit 0'
                    // Levantar la aplicación de Flask
                    powershell """
                        ${VENV_DIR}/Scripts/activate
                        ${FLASK_RUN_COMMAND}
                    """
                }
            }
        }
    }
}