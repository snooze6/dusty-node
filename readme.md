# NoSQL Injection

## Introducción

Las bases de datos NoSQL es una tecnología que ha venido para quedarse, en una era donde la cantidad de datos no hace más que crecer nos vemos obligados a prescindir de ACID y usar bases de datos más ligeras.

Un buen ejemplo de esto es MongoDB, una base de datos documental que es ampliamente utilizada en la actualidad por multitud de aplicaciones. Si bien es cierto que estas bases de datos no usan SQL, los ataques de inyección siguen siendo posibles, surgiendo así los ataques de inyección NoSQL.

## Diferencias entre NoSQL inyection y SQL inyection

En primer lugar, la facilidad de realización es similar, sin embargo una vulnerabilidad de inyección NoSQL puede ser menos grave por los siguientes motivos:

* Si la BD está correctamente fragmentada, en una inyección NoSQL es complicado cambiar la colección sobre la que se realizan las queries, esto se debe a que habría que cambiar la dirección de la conexión del conector que muchas veces está harcodeada. Una vez que el se establece la conexión con una colección, las operaciones realizadas por el conector solo se pueden realizar en el contecto de la conexión. No podemos cambiar de tabla o de base de datos como en SQL.
* Normalmente no podemos cambiar el tipo de operación que se realiza, esto es, no podremos hacer un delete fácilmente.

## Definiendo el reto

Con el objetivo de aprender sobre un caso práctico pondremos a disposición un docker con una máquina vulnerable. El objetivo será conseguir las 3 banderas que se encuentran en su interios.

### 1. NoSQL injection Hello World - Usuario flag

La petición para login es la siguiente:

```
POST /users/login HTTP/1.1
Host: localhost:1337
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:51.0) Gecko/20100101 Firefox/51.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://localhost:1337/users/login
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 21

user=admin&pass=admin
```

En el resultado vemos que nos redirige a '/' si el login es correcto y nos muestra error en caso contrario. Nuestro primer objetivo será sacar los nombres de usuarios de la base de datos

### 2. Fichero del SO
### 3. Deface?

# Cosas de Armando

[NoSQL injection wordlist](https://github.com/cr0hn/nosqlinjection_wordlists/blob/master/mongodb_nosqli.txt)
