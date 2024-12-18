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

        stage('Run Unit Tests') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Ejecutar pruebas unitarias
                    echo "Running unit tests..."
                    powershell """
                        & ${PYTHON_PATH} -m pytest tests/unit --junitxml=reports/unit_tests.xml
                    """
                }
            }
            post {
                always {
                    junit 'reports/unit_tests.xml' // Mostrar reporte de pruebas unitarias
                }
            }
        }

        stage('Run Integration Tests') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Ejecutar pruebas de integración
                    echo "Running integration tests..."
                    powershell """
                        & ${PYTHON_PATH} -m pytest tests/integration --junitxml=reports/integration_tests.xml
                    """
                }
            }
            post {
                always {
                    junit 'reports/integration_tests.xml' // Mostrar reporte de pruebas de integración
                }
            }
        }

        stage('Run Regression Tests') {
            steps {
                dir("${DEPLOY_DIR}") {
                    // Ejecutar pruebas de regresión
                    echo "Running regression tests..."
                    powershell """
                        & ${PYTHON_PATH} -m pytest tests/regression --junitxml=reports/regression_tests.xml
                    """
                }
            }
            post {
                always {
                    junit 'reports/regression_tests.xml' // Mostrar reporte de pruebas de regresión
                }
            }
        }

        sh 'flake8 . --exit-zero --statistics'


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
                    // Iniciar la aplicación Flask con Waitress en segundo plano usando Start-Job
                    powershell """
                        Start-Job -ScriptBlock {
                            & ${PYTHON_PATH} -m waitress --host=${HOST} --port=${PORT} ${APP_MODULE}
                        }
                    """
                }
            }
        }
    }
}
