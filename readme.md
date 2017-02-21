# NoSQL Injection

## Introducción

Las bases de datos NoSQL es una tecnología que ha venido para quedarse, en una era donde la cantidad de datos no hace más que crecer nos vemos obligados a prescindir de ACID y usar bases de datos más ligeras.

Un buen ejemplo de esto es MongoDB, una base de datos documental que es ampliamente utilizada en la actualidad por multitud de aplicaciones. Si bien es cierto que estas bases de datos no usan SQL, los ataques de inyección siguen siendo posibles, surgiendo así los ataques de inyección NoSQL.

## Diferencias entre NoSQL inyection y SQL inyection

En primer lugar, la facilidad de realización es similar, sin embargo una vulnerabilidad de inyección NoSQL puede ser menos grave por los siguientes motivos:

* Si la BD está correctamente fragmentada, en una inyección NoSQL es complicado cambiar la colección sobre la que se realizan las queries, esto se debe a que habría que cambiar la dirección de la conexión del conector que muchas veces está harcodeada. Una vez que el se establece la conexión con una colección, las operaciones realizadas por el conector solo se pueden realizar en el contexto de la conexión. No podemos cambiar de tabla o de base de datos como en SQL.
* Normalmente no podemos cambiar el tipo de operación que se realiza, esto es, si la operación es un find entonces no la podremos cambiar a delete de manera sencilla.

## Definiendo el reto

Con el objetivo de aprender sobre un caso práctico pondremos a disposición un docker con una máquina vulnerable. El objetivo será conseguir las 3 banderas que se encuentran en su interior.

El docker se encuentra [aquí](https://github.com/snooze6/dusty-node)

## Poner la máquina a funcionar

```shell
  git clone https://github.com/snooze6/dusty-node
  cd dusty-environment
  # Con esto creamos la imágen
  make docker-build
  # Con esto iniciamos el contenedor
  make docker-run
```

Y la aplicación debería estar disponible en [http://localhost:1337](http://localhost:1337)

## NOSQL inyection hello-world



## Links de interés

1. [Hacking NodeJS and MongoDB](http://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html)
2. [NoSQL injection wordlist](https://github.com/cr0hn/nosqlinjection_wordlists/blob/master/mongodb_nosqli.txt)
