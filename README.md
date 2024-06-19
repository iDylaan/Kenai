# KENAI Documentación

## Requisitos
1. [Node v20.x](https://nodejs.org/en/download)
2. [NPM v10.x](https://nodejs.org/en/download)
3. [PNPM v8.x](https://pnpm.io/installation)
4. [Nest CLI v10.x](https://docs.nestjs.com/cli/overview)

## Frontend
Seguir los pasos del [Frontend README](./frontend/README.md) 
## Backend
Seguir los pasos del [Backend README](./backend/README.md) 

# Instancia en OCI
1. Crear un VM con Oracle Linux 8 y las siguientes capacidades de Hardware `6 nucleos` y `24GB` con el procesador `Ampere`
2. Una vez creada la VM generar una ssh key, y agregarla a la lista de ssh keys de la VM.
3. Conectarse con las credenciales de ssh
4. Ejecutar el comando `sudo dnf update`

## Requisitos dentro del VM
Es necesario tener instalados los siguientes softwares
### Github CLI 
Se instala con los siguientes comandos
```sh
sudo curl -fsSL https://cli.github.com/packages/rpm/gh-cli.repo | sudo tee /etc/yum.repos.d/github-cli.repo
```
```sh
sudo dnf -y install gh
```
------------------------
Se autenticica generando un token de github generado en settings -> developer settings -> personal access tokens -> Fine-grained tokens y crear un nuevo token
![Alt text](./readme-images/image.png)
![Alt text](./readme-images/image-1.png)
Atentificar con los siguientes comandos
```sh
gh auth login
```
1. Seleccionar GitHub.com
2. Seleccionar HTTPS
3. Dar que si a la autentificación con credenciales
4. Y seleccionar Paste an authentification token
5. Pegar el token generado previamente en GitHub
![Alt text](./readme-images/image-3.png)
Para comprobar que la autentificación es correcta ejecutamos el siguiente comando
```sh
gh auth status
```
![Alt text](./readme-images/image-4.png)

### Git
Corroborar que ya se encuntra instalado git con el comando
```sh
git --version
```
Si no está instalado ejecutar el siguiente comando
```sh
sudo dnf install git
```

## Clonar proyecto del repositorio
Para clonar le repositorio hay que ejecutar el siguiente comando
```sh
git clone https://github.com/iDylaan/Kenai.git
```
![Alt text](./readme-images/image-5.png)

## Python
Es necesario instalar la versión de Python 3.8, para ejecutamos el siguiente comando
```sh
sudo dnf install python3.8
```
Para comprobar que es correcta la instalación ejecutamos el siguiente comando
```sh
python3.8 --version
```
![Alt text](./readme-images/image-6.png)
Para comprobar la versión de pip es necesario ejecutar el siguiente comando
```sh
python3.8 -m pip --version
```
![Alt text](./readme-images/image-7.png)

## Entorno virtual
1. Para generar el entorno virtual para el proyecto es necesario primero instalar virtualenv, para ello ejecutamos el siguiente comando
```sh
python3.8 -m pip install --user virtualenv
```
2. Acceder al repositorio de Kenai con `cd Kenai/` y generar un entorno virtual con el siguiente comando
```sh
python3.8 -m virtualenv venv
```
3. Accedemos al entorno virtual con:
```sh
source venv/bin/activate
```
4. Accedemos el backend con `cd backend/` e instalamos las dependencias con
```sh
pip install -r requirements.txt
```

## GUNICORN
1. Instalar GUNICORN
```sh
pip install gunicorn
```
2. Crear el archivo `gunicorn_config.py` y dentro colocar la siguiente configuración
```sh
wsgi_app = "APP:app"
bind = "0.0.0.0:5000"
backlog = 2048
workers = 1
worker_class = 'sync'
worker_connections = 1000
keep_alive = 2
timeout = 30
daemon = True

accesslog = '/home/opc/Kenai/backend/gunilogs/gunicorn-access.log'
errorlog = '/home/opc/Kenai/backend/gunilogs/gunicorn-error.log'
pidfile = '/home/opc/Kenai/backend/gunilogs/gunicorn.pid'
reload = False
```
3. Crear el directorio `/gunilogs`
4. Para inciar el servidor con GUNICORN ejecutar el siguiente comando
```sh
gunicorn -c gunicorn_config.py APP:app
```
5. Para terminar el servidor con GUNICORN hay que acceder al archivo `/gunilogs/gunicorn.pid` para copia el id que se encuentra dentro
6. Una vez copiado el id ejecutamos el siguiente comando donde #### es el id que copiamos
```sh
kill #### 
```

## NGINX
1. Instalar Nginx
```sh
sudo dnf install nginx -y
```
2. Instanciar Nginx
```sh
sudo systemctl start nginx
sudo systemctl enable nginx
```
3. En la ruta `/etc/nginx/conf.d/` crear un archivo `.conf` con el nombre del proyecto en este caso queda como `/etc/nginx/conf.d/kenai.conf`
4. Dentro del archivo `kenai.conf` agregar la siguiente configuracion con el comando 
```sh
sudo vi /etc/nginx/conf.d/kenai.conf
```
Y agregamos el siguiente codigo, para insertar hay que presionar 'i', una vez diga insert, pegamos el codigo y para guardar presionamos Esc, y escribimos :wq! para guardar y damos Enter.
```sh
server {
    listen 80;
    server_name 140.84.168.186;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
5. Cada vez que se realicen cambios dentro de este archivo de configuracion hay que aplicar los cambios con el siguiente comando
```sh
sudo nginx -t
```
6. Configurar Nginx para que se ejecute automaticamente
```sh
sudo systemctl daemon-reload
```
7. Reiniciar Nginx
```sh
sudo systemctl restart nginx
```

## Configuracion de SELinux
1. Desactivar temporalmente SELinux
```sh
sudo setenforce 0
```
2. Reiniciar NGinx
```sh
sudo systemctl restart nginx
```
3. Configurar SELinux para permitir Nginx conexiones de red
```sh
sudo setsebool -P httpd_can_network_connect 1
```

## Firewall
1. Verificar reglas de firewall
```sh
sudo firewall-cmd --list-all
```
2. Crear regla de firewall interno
```sh
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --reload
```
3. Permitir conexiones al puerto 5000
```sh
sudo firewall-cmd --permanent --add-port=5000/tcp
sudo firewall-cmd --reload
```

## Reinicio de Servicios
Para reiniciar todos los servicios se pueden ejecutar los siguientes comandos para realizar lo siguiente
1. Asegurarse que la configuracion de nginx es valida y luego reiniciar
```sh
sudo nginx -t
sudo systemctl restart nginx
```
2. Recargar el daemon de systemd
```sh
sudo systemctl daemon-reload
```
3. Verificar los status de los servicios
```sh
sudo systemctl status nginx
```






