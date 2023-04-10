1. Configurar el .env del servidor
```  
# Clave del JWT
SECRET_KEY = ""

# Origen permitido para las peticiones
CORS_ORIGIN=""

# Las siguientes configuraciones para la DB se usan en entorno de desarrollo
DB_HOST=0.0.0.0
DB_USER=
DB_PASSWORD=
DB_NAME=sharefy
DB_PORT=27017

# El DB_URL se usa en entorno de produccion
DB_URL=""

# Se establece el entorno de desarrollo
NODE_ENV=dev
```