var ModoDebug = True;   //PREPROCESADOR, marcar True para ejecutar el primer código y marcar False para el segundo
if(ModoDebug){
//Incluye la libreria (llamada MODULO en node.js) http el cual nos permitirá procesar y responder mensajes de un servidor web
var http = require('http'); 

/*
    A su vez esa variable http es un objeto que tiene un método, o mejor dicho un evento .createServer() 
    que recibirá como parámetro una función callback, osea una función que se disparará cada vez que 
    haya una petición nueva en nuestro sitio. De esta manera nosotros vamos entendiendo de a poco a 
    qué se refiere con programación orientada a eventos, a http le asignamos un evento que escucha, 
    que vigila cada petición que entra y ejecuta una función anónima
*/

/*
    Esta función a su vez recibirá dos parámetros, uno será el request o petición, un objeto que 
    contendrá información como por ejemplo la url que está visitando el cliente, y un segundo parámetro 
    que también es un objeto que nos permitirá responder al navegador.
*/
http.createServer(function(peticion, respuesta){
   respuesta.writeHead(200, 'text/plain'); //Con el método writeHead() definiremos la salida 200 con un texto plano, osea sin html, ni nada, sólo texto.
   respuesta.end('Hola mundo.'); //Nos servirá para finalizar la respuesta con el texto que finalmente leerá el navegador.
}).listen(3000, '127.0.0.1'); //Además debemos indicarle mediante al método listen() el puerto y la url en dónde escuchará la petición nuestra aplicación.
console.log('El servidor esta funcionando correctamente en https://localhost:3000/');

}else{ //Para ejecutar esta sección debe cambiar ModoDebug = False
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
//Si se quisiera remplazar el texto plano por HTML:

var http = require('http');
http.createServer(function(peticion, respuesta){
   var codigo_html = '<html> <head> <title> Ejemplo de hola mundo </title> </head> <body> Hola mundo </body> </html>'; //Codigo HTML en formato string
   respuesta.writeHead(200, 'text/html'); 
   respuesta.end(codigo_html);
}).listen(3000, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:3000/');


}