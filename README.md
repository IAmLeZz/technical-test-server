# Prueba técnica de Equipzilla

</br>

**Requisitos: [Node.js, NPM](https://nodejs.org/es) y un servidor con base de datos [MySQL](https://www.apachefriends.org/es/index.html)**

## Iniciar Next.js (frontend)

* Vamos a instalar las dependencias del frontend ```technical-test``` con el siguiente comando en la terminal

```bash
npm i 
```

* Una vez que se hayan instalado las dependencias

```bash
npm run dev
```

Hay algunos componentes que requieren de Node.js para funcionar, así que ahora tenemos que movernos al backend

## Iniciar Node.js (backend)

Vamos a abrir otra terminal en la carpeta del proyecto del backend ```technical-test-server``` pero dejaremos el servidor frontend activo.

* Instalar las dependencias en ```technical-test-server```

```bash
npm i
```

Asumiendo que ya tenemos un gestor de bases de datos MySQL en nuestro sistema con un servidor activo, ahora tenemos que buscar los datos del servidor de base de datos para completar las variables de entorno.</br>

** Ejemplo de un servidor tipo MariaDB

``` .env
Database server
Server: 127.0.0.1 via TCP/IP
Server type: MariaDB
Server connection: SSL is not being used Documentation
Server version: 10.4.24-MariaDB - mariadb.org binary distribution
Protocol version: 10
User: root@localhost
Server charset: UTF-8 Unicode (utf8mb4)
```

Tenemos que abrir el archivo ```.env```, donde veremos lo siguientes campos a rellenar con los datos de nuestro servidor de base de datos.

``` .env
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

FRONTEND_URL=
```

* Ejemplo de ```.env``` funcional

``` .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mydatabase
DB_USERNAME=root
DB_PASSWORD=12345

FRONTEND_URL=http://localhost:3000
```

## Tener en cuenta que

* ```DB_PASSWORD``` **puede** ser opcional y estar completamente vacío </br>
* ```DB_DATABASE``` **debe** ser rellenado con *"spacex_api_data"* ya que es el nombre de la base de datos que vamos a crear a continuación
* ```FRONTEND_URL``` dependerá de la URL de nuestro frontend, pero lo más probable es que sea <http://localhost:3000>

## Migraciones

* Crear la base de datos con el siguiente comando

```bash
npx sequelize-cli db:create    
```

* Iremos a nuestro gestor de bases de datos para verificar que la base de datos fue creada con éxito
* Si la DB *"spacex_api_data"* existe, entonces vamos a ejecutar las migraciones para crear las tablas necesarias

```bash
npx sequelize-cli db:migrate    
```

## Pasos finales

* Ya teniendo las migraciones realizadas, iniciar el servidor

```bash
npm start
```

* Ingresar a las siguientes direcciones para guardar la información de la API de SpaceX. **El puerto puede ser diferente a 4000**

``` url
http://localhost:4000/api/store-landpad-type-data
```

``` url
http://localhost:4000/api/store-launch-data
```

``` url
http://localhost:4000/api/store-payload-data
```

Cada dirección debería movernos al front-end y una notificación que dice "Data stored successfully / Datos almacenados correctamente" debería aparecer.

</br>

Si ese es el caso, entonces ya tenemos configurado y funcionando nuestro backend y por lo tanto, el frontend está completamente funcional.

## Direcciones

Frontend URL por defecto [http://localhost:3000](http://localhost:3000)</br>
Backend URL por defecto [http://localhost:4000](http://localhost:4000)
