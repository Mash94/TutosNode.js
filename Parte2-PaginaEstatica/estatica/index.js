var ModoDebug = 2;  //PREPROCESADOR, marcar 1 para ejecutar el primer código, marcar 2 para el segundo o 3 para el tercero

if(ModoDebug == 1){

var http = require('http');
var url = require('url');   //incluimos un nuevo módulo llamado url
//evento que se disparará cada vez que llegue una nueva petición al navegador, recuperamos el path donde está accediendo el usuario
http.createServer(function(peticion, respuesta){       
   var path_nombre = url.parse(peticion.url).pathname; // path_nombre tendrá lo que se ingrese luego de localhost:3000, si no se ingresa nada tendrá '/'
   respuesta.writeHead(200);
   respuesta.end('El path es: ' + path_nombre);
}).listen(3000, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:3000/');


}else if (ModoDebug == 2){//Para ejecutar esta sección debe cambiar ModoDebug = 2
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

var http = require('http');
var url = require('url');
var fs = require('fs');   // nos permitirá trabajar con archivos.
http.createServer(function(peticion, respuesta){
   var path_nombre = (url.parse(peticion.url).pathname == '/') ? '/index.html' : url.parse(peticion.url).pathname; //es un regular de JS (if else)
   /*Esta variable preguntará si el pathname es ‘/’ lo que significa que el visitante está en la página principal, 
   en este caso forzaremos a que path_nombre sea ‘/index.html’, que es el archivo principal. De lo contrario 
   guardará el pathname así como lo encuentra. */
   var ruta_a_archivo = 'contenido/' + path_nombre;
   /*Luego guardamos una variable con la ruta al archivo que tendremos que leer.
   Recordar que en la carpeta contenido se encuentran los archivos .html. */
   fs.exists(ruta_a_archivo, function(existe){
      /*El evento .exists() nos permitirá buscar un archivo, recibirá dos parámetros, la ubicación física del mismo 
      y una función que recibirá un parámetro que será true si encontró el archivo y false, si  no fue así. 
      En este último caso devolveremos al cliente un error 404, que significa que la página no existe 
      Si en cambio el archivo sí existe, entonces intentará leer el mismo mediante el evento .readFile(). 
      Éste recibirá dos parámetros, el archivo y una función que a su vez recibirá dos parámetro, 
      el primero será si se ha producido un error al leer el archivo y el segundo es el contenido del archivo.
      Si surgió algún error al intentar leer el archivo le devolverá al cliente un error 500, que es un error interno del servidor:*/
      if(existe){
         fs.readFile(ruta_a_archivo, function(error, contenido_archivo){
            if(error){
               respuesta.writeHead(500, 'text/plain');
               respuesta.end('Error interno.');
            }else{
               respuesta.writeHead(200, {'Content-Type': 'text/html'});
               respuesta.end(contenido_archivo);
            }
         });
      }else{
         respuesta.writeHead(404, 'text/plain');
         respuesta.end('Error 404. El enlace no existe o ha dejado de existir.');
      }
   });
}).listen(3000, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:3000/');

}else{//Para ejecutar esta sección debe cambiar ModoDebug = 3
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
/*Hasta acá todo muy lindo, pero tenemos un problema, y es que nuestra aplicación sólo es capaz de devolver al cliente archivos .html,
 y nosotros necesitamos devolverle al navegador otro tipo de archivos; js, css e imágenes. Así que una vez más vamos a editar nuestro 
 archivo principal index.js con el siguiente código: */

var http = require('http');
var url = require('url');
var fs = require('fs');
//creamos un json con la lista de mimetype que será capaz de devolver nuestro servidor
var mime_types = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};
http.createServer(function(peticion, respuesta){
   var path_nombre = (url.parse(peticion.url).pathname == '/') ? '/index.html' : url.parse(peticion.url).pathname;
   var ruta_a_archivo = 'contenido/' + path_nombre;
   fs.exists(ruta_a_archivo, function(existe){
      if(existe){
         fs.readFile(ruta_a_archivo, function(error, contenido_archivo){
            if(error){
               respuesta.writeHead(500, 'text/plain');
               respuesta.end('Error interno.');
            }else{
               var extension = ruta_a_archivo.split('.').pop();
               //Antes de devolver una respuesta buscamos el tipo de archivo mediante su extensión (.html, .css. js, etc)
               var mime_type = mime_types[extension];
               //Luego buscamos el mimetype que le corresponde a la extensión
               respuesta.writeHead(200, {'Content-Type': mime_type});
               respuesta.end(contenido_archivo);
            }
         });
      }else{
         respuesta.writeHead(404, 'text/plain');
         respuesta.end('Error 404. El enlace no existe o ha dejado de existir.');
      }
   });
}).listen(3000, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:3000/');


}

