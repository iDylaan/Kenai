pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/iDylaan/Kenai'
        BRANCH = 'main'
        DEPLOY_DIR = 'C:/Users/danie/OneDrive/Documentos/GitHub/Kenai'
        VENV_DIR = "${DEPLOY_DIR}/venv" // Directorio de tu entorno virtual
        FLASK_RUN_COMMAND = 'flask run --host=0.0.0.0 --port=5000' // Configuración para escuchar en todas las interfaces
        PYTHON_PATH = "${VENV_DIR}/Scripts/python.exe" // Ruta al Python del entorno virtual
        PIP_PATH = "${VENV_DIR}/Scripts/pip.exe" // Ruta al pip del entorno virtual
        FLASK_LOG = "${DEPLOY_DIR}/flask.log" // Archivo de log para la salida de Flask
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Agregar el directorio como seguro para Git
                    bat "git config --global --add safe.directory ${DEPLOY_DIR.replace('\\', '/')}"
                    
                    dir("${DEPLOY_DIR}") {
                        // Si el directorio existe, hacer pull; de lo contrario, clonar el repositorio
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
                    // Usar el pip del entorno virtual para instalar dependencias
                    powershell """
                        ${PIP_PATH} install -r requirements.txt
                    """
                }
            }
        }
        
        stage('Restart Flask App') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Detener el servidor existente (si es necesario)
                    powershell '''
                        try {
                            $process = Get-Process -Name "python" -ErrorAction Stop
                            Stop-Process -InputObject $process -Force
                        } catch {
                            Write-Host "No Python process found, skipping stop."
                        }
                    '''
                    // Levantar la aplicación de Flask y redirigir la salida a un archivo de log
                    powershell """
                        Start-Process -NoNewWindow -FilePath ${PYTHON_PATH} -ArgumentList '-m flask run --host=0.0.0.0 --port=5000' -RedirectStandardOutput ${FLASK_LOG} -RedirectStandardError ${FLASK_LOG}
                    """
                }
            }
        }
    }
    
    post {
        always {
            // Verificar si el archivo de log existe antes de intentar leerlo
            script {
                if (fileExists("${FLASK_LOG}")) {
                    echo "Flask log output:"
                    powershell """
                        Get-Content ${FLASK_LOG} -Tail 10
                    """
                } else {
                    echo "No log file found at ${FLASK_LOG}."
                }
            }
        }
    }
}
