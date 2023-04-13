<!-- Cabecera principal -->
<div align="center">
  <a href="https://github.com/moises35/ShareFy">
    <img src="./readme/sharefy_logo.png" alt="Logo ShareFy" width="80" height="80">
  </a>

  <h3 align="center">ShareFy - Documentación</h3>
</div>



-----------------------------------------------------------------------  
<!-- Cabecera del indice -->
<div id="top"></div>  

## Indice 📋
<ul>
    <li><a href="#instalación-">Instalación</a></li>
    <li><a href="#tecnologias-utilizadas-">Tecnologias Utilizadas</a></li>
    <li><a href="#contribuidores-">Contribuidores</a></li>
    <li><a href="#contactos">Contactos</a></li>
</ul>


-----------------------------------------------------------------------
<!-- Instalación -->
## Instalación 💻 

1. Clonar el repositorio
   ```sh
   git clone https://github.com/moises35/ShareFy.git
   ```
2. Instalar las dependencias de la carpeta **/server/**
   ```sh
   cd server
   npm install
   ```
3. Instalar las dependencias de la carpeta **/client/**
   ```sh
   cd client
   npm install
   ```
4. Crear un archivo `.env` en la carpeta **/client/** para definir las configuraciones de las variables de entorno
   ```config
    # URL de nuestro backend 
    REACT_APP_API_BASE_URL=http://localhost:8000
   ```
5. Crear un archivo `.env` en la carpeta **/server/** para definir las configuraciones de las variables de entorno
   ```config
    # Clave del JWT 
    SECRET_KEY = "secretito"

    # Origen permitido para las peticiones
    CORS_ORIGIN="http://localhost:3000, http://localhost:3100"      # Separar por comas

    # Entorno de trabajo (dev, production)
    NODE_ENV=dev

    # Las siguientes configuraciones para la BD se usan en entorno de desarrollo (dev)
    DB_HOST=0.0.0.0
    DB_USER=
    DB_PASSWORD=
    DB_NAME=sharefy
    DB_PORT=27017

    # El DB_URL se usa en entorno de produccion (production)
    DB_URL="mongodb+srv://<>:<>@..."
   ```
6. Ejecutamos el servidor
    ```sh
    cd server
    npm start
    ```
7. Ejecutamos el cliente
    ```sh
    cd client
    npm start
    ```
6. ¡Listo!🚀


<p align="right">(<a href="#top">Volver al indice</a>)</p> 

-----------------------------------------------------------------------
<!-- Tecnologias utilizadas -->
## Tecnologias utilizadas 🛠


- ![MongoDB]
- ![Express]   
- ![React]
- ![Node]  
- ![HTML]   
- ![CSS]   
- ![JavaScript]   
- ![ReactRouter]
- ![NPM]
- ![Netlify]
- ![Git]


<p align="right">(<a href="#top">Volver al indice</a>)</p> 

-----------------------------------------------------------------------
## Contribuidores ✨


<table>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/85299373?v=3?s=100" width="100px;" alt="Moisés Alvarenga" style="border-radius: 50%;"/><br />
         <a href="https://github.com/moises35">
               <b>Moisés Alvarenga:octocat:</b>
         </a></br>
         <sub>
            <a href="https://moises35.github.io/My_Portfolio/" target="_blank">Portfolio💼</a>
         </sub>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/110752756?v=3?s=100" width="100px;" alt="Hector Gimenez" style="border-radius: 50%;"/><br />
         <a href="https://github.com/HectorJGE">
               <b>Hector Gimenez:octocat:</b>
         </a></br>
<!--          <sub>
            <a href="https://github.com/HectorJGE" target="_blank">Portfolio💼</a>
         </sub> -->
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/110790506?v=3?s=100" width="100px;" alt="Fabiola Ortiz" style="border-radius: 50%;"/><br />
         <a href="https://github.com/FabiolaOrtizSC">
               <b>Fabiola Ortiz:octocat:</b>
         </a></br>
<!--          <sub>
            <a href="https://github.com/FabiolaOrtizSC" target="_blank">Portfolio💼</a>
         </sub> -->
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/110683109?v=3?s=100" width="100px;" alt="Francisco Cabañas" style="border-radius: 50%;"/><br />
         <a href="https://github.com/FranciscoCaba">
               <b>Francisco Cabañas:octocat:</b>
         </a></br>
<!--          <sub>
            <a href="https://github.com/FranciscoCaba" target="_blank">Portfolio💼</a>
         </sub> -->
      </td>
   </tbody>
</table>


<!-- Links a las imagenes de los lenguajes -->
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Node]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[HTML]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[CSS]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[Javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[Netlify]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[Git]: https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white
[NPM]: https://img.shields.io/badge/NPM-2D3136.svg?style=for-the-badge&logo=npm&logoColor=white
