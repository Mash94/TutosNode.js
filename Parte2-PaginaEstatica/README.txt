El servidor  ante creado aun no es capaz de detectar la petición según la url 
por la que ha accedido el visitante. Con esto quiero decir que si ingresamos a:

https://localhost:3000/  o   https://localhost:3000/info.html

El servidor siempre nos devolverá la misma respuesta.

Para ello nosotros debemos detectar el path o url a la que se está accediendo e indicarle a nuestro servidor la respuesta a devolver.

Debemos crear una carpeta que se llame "estatica", dentro de ella incluiremos index.js y otra carpeta llamada "contenido". 
Dentro de "contenido" incluiremos dos archivos llamados index.html e info.html, por ultimo crearemos una carpeta dentro de 
"contenido" llamada "css" y dentro le incluiremos un archivo llamado "style.css".

