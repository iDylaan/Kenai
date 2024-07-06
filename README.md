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
Es necesario instalar la versión de Python 3.12, para ejecutamos el siguiente comando
```sh
sudo dnf install python3.12
```
Para comprobar que es correcta la instalación ejecutamos el siguiente comando
```sh
python3.12 --version
```
![Alt text](./readme-images/image-6.png)
Para comprobar la versión de pip es necesario ejecutar el siguiente comando
```sh
python3.12 -m pip --version
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
4. Instalamos las dependencias con
```sh
pip install -r requirements.txt
```

## Flask SEGUNDO PLANO
Para poder mantener nuestra aplicación ejecutandose en segundo plano y mantener una sesión donde podamos ver los logs, y el monitoreo continuo de nuestro servidor, así como darlo de baja manualmente cuando requiramos instalar una nueva versión se siguen los siguientes pasos.
1. Instalar screen
```sh
sudo dnf install screen
```
2. Crear un screen para la sesión de flask
```sh
screen -S flask_session
```
3. Iniciar el servidor con wgsi en APP.py
```sh
python APP.py
```
4. Para salir de la sesión del screen presionamos la siguiente combinación de comandos `Ctrl+A` seguido de `D`
5. Para recuperar la sesión del screen lo realizamos con el siguiente comando
```sh
screen -r flask_session
```
6. Para detener el servicio de WGSI utilizamos el comando de `Ctrl+C`

## Apache
Primero necesitamos instanciar todo el entorno con Apache para eso necesitamos realizar las siguientes configuraciones
1. Instalar Epel
```sh
sudo dnf install epel-release
sudo dnf -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
```
2. Instalar apache y mod_ssl
```sh
sudo dnf -y install httpd mod_ssl
sudo dnf install mod_proxy mod_proxy_http -y
```
3. Habilitar e Iniciar Apache
```sh
sudo systemctl enable httpd
sudo systemctl start httpd
```
4. Proxy
```sh
sudo sed -i '/LoadModule proxy_module/s/^#//g' /etc/httpd/conf.modules.d/00-proxy.conf
sudo sed -i '/LoadModule proxy_http_module/s/^#//g' /etc/httpd/conf.modules.d/00-proxy.conf
```
5. Herramientas de SELinux
```sh
sudo dnf install policycoreutils-python-utils -y
```

### Certbot
1. Instalar las siguientes dependencias
```sh
sudo dnf -y install certbot python3-certbot-apache
```
2. Instalar OpenSSL
```sh
sudo dnf -y install openssl
```
3. Ejecutar el Certbot
```sh
sudo certbot --apache -d ikenai.site -d www.ikenai.site
```

### Configuración
Para empezar a realizar la configuración necesitams crear un archivo `.conf` para el proyecto llamado `kenai.conf`
1. Creamos el archivo de configuracion `.conf`
```sh
sudo vi /etc/httpd/conf.d/kenai.conf
```
1. Agregamos la siguiente configuracion
```sh
<VirtualHost *:80>
    ServerName ikenai.site
    ServerAlias www.ikenai.site
    ServerAdmin webmaster@localhost

    # Proxy settings
    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/

    ErrorLog /var/log/httpd/error.log
    CustomLog /var/log/httpd/access.log combined

    # Redirect HTTP to HTTPS
    RewriteEngine on
    RewriteCond %{HTTPS} !=on
    RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R=301,L]
</VirtualHost>
```
2. Configuración SSL
```sh
sudo vi /etc/httpd/conf.d/kenai-le-ssl.conf
```
3. Agregar la siguiente configuración
```sh
<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName ikenai.site
    ServerAlias www.ikenai.site
    ServerAdmin webmaster@localhost

    # Proxy settings
    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/

    ErrorLog /var/log/httpd/error.log
    CustomLog /var/log/httpd/access.log combined

    SSLCertificateFile /etc/letsencrypt/live/ikenai.site/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/ikenai.site/privkey.pem
    Include /etc/letsencrypt/options-ssl-apache.conf

    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{HTTPS} off
        RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    </IfModule>
</VirtualHost>
</IfModule>
```
4. Comprobar la configuracion colocada
```sh
sudo apachectl configtest
```
5. Crear regla de firewall interno
```sh
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --permanent --add-port=5000/tcp
sudo firewall-cmd --reload
```
6. Permitir conexiones proxy con SELinux
```sh
sudo setsebool -P httpd_can_network_connect on
```
7. Reiniciar el servicio
```sh
sudo systemctl restart httpd
```

## Servicio de ollama
1. Ejecutar el reload del daemon
sudo systemctl daemon-reload
2. Habilitar el servicio de ollama
sudo systemctl enable ollama
3. Iniciar el servicio
sudo systemctl start ollama

## PostgreSQL
Para la inicialización y configuración de postgresql en su versión 12 realizaremos los siguientes pasos
1. Instalar PostgreSQL desde el repositorio RPM
```sh
sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
```
2. Deshabilitar el built-in en el modulo de postgres
```sh
sudo dnf -qy module disable postgresql
```
3. Instalar PostgreSQL Server
```sh
sudo dnf install -y postgresql12-server
```
4. Inicializar los servicios de postgres para un inicio automático
```sh
sudo /usr/pgsql-12/bin/postgresql-12-setup initdb
sudo systemctl enable postgresql-12
sudo systemctl start postgresql-12
```
5. Acceder a postgres
```sh
sudo -u postgres psql
```
6. Crear la base de datos y los usuarios
```sh
CREATE DATABASE kenai;
CREATE USER kenai WITH PASSWORD 'Password';
GRANT ALL PRIVILEGES ON DATABASE kenai TO kenai;
\q
```
8. Actualizar el inicio dentro de la configuración de postgresql
```sh
sudo vi /var/lib/pgsql/12/data/pg_hba.conf
```
9. Dentro modificar este segmento de METHOD para que quede igual a lo siguiente
```sh
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# ! Agregar esta linea debajo
# Allow local connections for postgres user with peer authentication
local   all             postgres                                peer

```
9. Reiniciar PostgreSQL
```
sudo systemctl restart postgresql-12
```
10. Ingresar al usuario kenai en la base de datos kenai
```sh
psql -U kenai -d kenai -W
```
11. Escribir la contraseña correspondiente
12. Crear las tablas necesarias dentro de su base de datos y salir del usuario kenai con \q
13. Colocar las credenciales en un .env ubicado en la carpeta raiz del proyecto de Kenai
