const button = document.getElementById('generate-button');
const input = document.getElementById('md-input');
const output = document.getElementById('md-output');
const hashtagFilter = [];
const contentFilter = [];

input.value = `# Curso de Fundamentos de Bases de Datos
## Indice
* [Introduccion](#introduccion)
* [Historia de las bases de datos relacionales](#historia-de-las-bases-de-datos-relacionales)
* [Qué son entidades y atributos](#qué-son-entidades-y-atributos)
* [Entidades de Platzi Blog](#entidades-de-platzi-blog)
* [Relaciones](#relaciones)
  * [Cardinalidad](#cardinalidad)
* [Diagrama ER](#diagrama-er)
* [Diagrama físico: tipos de datos y constaints](#diagrama-físico-tipos-de-datos-y-constaints)
  * [Tipos de datos](#tipos-de-datos)
    * [Texto](#texto)
    * [Número](#número)
    * [Fecha / Hora](#fecha--hora)
    * [Lógico](#lógico)
  * [Constraints](#constraints)
  * [Normalización](#normalización)
  * [Normalización por ChatGPT](#normalización-por-chatgpt)
    * [Forma normal (1NF): Es la forma más básica de normalización y se basa en tres reglas:](#forma-normal-1nf-es-la-forma-más-básica-de-normalización-y-se-basa-en-tres-reglas)
    * [Forma normal de segundo grado (2NF): Además de cumplir con todas las reglas de la 1NF, para estar en 2NF debe cumplirse lo siguiente:](#forma-normal-de-segundo-grado-2nf-además-de-cumplir-con-todas-las-reglas-de-la-1nf-para-estar-en-2nf-debe-cumplirse-lo-siguiente)
    * [Forma normal de tercer grado (3NF): Además de cumplir con todas las reglas de la 2NF, para estar en 3NF debe cumplirse lo siguiente:](#forma-normal-de-tercer-grado-3nf-además-de-cumplir-con-todas-las-reglas-de-la-2nf-para-estar-en-3nf-debe-cumplirse-lo-siguiente)
    * [Forma normal de Boyce-Codd (BCNF): Además de cumplir con todas las reglas de la 3NF, para estar en BCNF debe cumplirse lo siguiente:](#forma-normal-de-boyce-codd-bcnf-además-de-cumplir-con-todas-las-reglas-de-la-3nf-para-estar-en-bcnf-debe-cumplirse-lo-siguiente)
  * [Normalizando PlatziBlog](#normalizando-platziblog)
  * [Diagrama físico](#diagrama-físico)
* [Instalación local de un RDBMS](#instalación-local-de-un-rdbms)
* [¿Qué es un RDBMS?](#qué-es-un-rdbms)
* [Clientes gráficos](#clientes-gráficos)
* [Servicios administrados](#servicios-administrados)
* [Historia de SQL](#historia-de-sql)
* [Structured Query Language: Subgrupos de comandos](#structured-query-language-subgrupos-de-comandos)
* [DDL](#ddl)
  * [CREATE](#create)
  * [ALTER](#alter)
  * [DROP](#drop)
* [DML](#dml)
  * [INSERT](#insert)
  * [UPGRADE](#upgrade)
  * [DELETE](#delete)
  * [SELECT](#select)
* [Creando PlatziBlog](#creando-platziblog)
  * [Creacion de tablas independientes](#creacion-de-tablas-independientes)
  * [Creacion de tablas dependientes](#creacion-de-tablas-dependientes)
  * [Creacion de tablas transitivas](#creacion-de-tablas-transitivas)
* [Consultas en SQL](#consultas-en-sql)
  * [Estructura básica de un Query](#estructura-básica-de-un-query)
* [Mi proyecto: Registro policial](#mi-proyecto-registro-policial)
  * [Entidades](#entidades)
  * [Relaciones](#relaciones-1)
  * [Diagrama Físico](#diagrama-físico-1)
  * [Normalización](#normalización-1)
  * [Creando la base de datos](#creando-la-base-de-datos)
## Introduccion
Históricamente la información se pasaba de boca en boca, lo que provocaba que se distorsione muy rápidamente el mensaje. Por esto es que se empezaron a dar cuenta de que tenían que buscar un método con el que la información persistiera y no cambiara, es así como llegaron a los sistemas de escritura primitivos; en ese momento tallándolo en piedras o arcilla. Esto no era tan práctico ya que las piedras no eran muy transportables y la arcilla se rompía fácilmente, es por esto que a la larga se empezaron a usar el pairo y el pergamino lo que solucionaba el problema de transporte pero generaba otro que era la descomposición muy rápida de estos al estar hechos de materia animal o vegetal. Luego de esto los Chinos lograron una gran revolución que fue el papel, este tenía todas las ventajas de la portabilidad sin la contraparte de la descomposición. El siguiente salto en métodos de guardado de la información fue el microfilm, este fue muy importante, ya que puede guardar datos muchísimo más tiempo que cualquier otro métodos con la contraparte de que si queremos leer, escribir o modificar información debemos tener máquinas especializadas. Otra grandísima revolución fueron los medios digitales, en los que están incluidos: los HDD, SSD, CDs, etc. en los que se guardaba la información en bits. Luego de muchísimo tiempo se crea otro método haciendo uso del anterior, este es la nube y ya la conocemos por lo que sabemos que tiene la gran ventaja de que podemos acceder a ella desde cualquier lugar. Dentro de toda esta historia, las bases de datos aparecen cuando se pasa a los medios digitales y siguen presentes ahora con la nube. Estas se empezaron a usar para complementar la arquitectura de John von Neumann (CPU, Memoria y Dispositivos de entrada/salida).
Las bases de datos se dividen en dos grandes grupos:
* Relacionales, entre estas están SQL Server, ORACLE, PosgreSQL, MySQL y MariaDB
* No Relacionales, entre estas están Cassandra, Dynamodb, elasticsearch, BigQuery, MongoDB, entre otras.

Hay una gran división en los sistemas de bases de datos, estos son:
* Autoadministrados: es la base de datos que instalas en tu computadora o servidor donde debes encargarte de las actualizaciones, mantenimiento, consistencia de datos, etc.
* Administrados: son servicios que ofrecen las nubes modernas (AWS, Azure, etc.) en las que podés usar la base de datos sin tener que encargarte de nada
## Historia de las bases de datos relacionales
Las bases de datos surgen de la necesidad de conservar la información más allá de la memoria RAM, ya que al principio no existía el concepto de guardar los datos en la computadora, ya que solo se contaba con la CPU, la RAM y los periféricos. Cuando surgió la necesidad de guardar la información de una forma que haga fácil el guardado y posterior extracción se encontraron distintas formas, la primera de estas son las _Bases de datos basadas en archivos_ que eran básicamente guardar datos en texto plano dividiéndolos con comas lo que era muy fácil de guardar, pero super complejo de extraer si se hacían consultas complejas, es por esto que se busca algo un poco más estructurado surgiendo así las _Base de datos relacionales_. El inventor de estas es Edgard Codd que dejo un mandamiento que se llama [Las 12 reglas de Codd](https://www.w3resource.com/sql/sql-basic/codd-12-rule-relation.php) con lo que se aseguró de que la filosofía de su invención no se pierda con el boca a boca. Para lograr este sistema creo algo que se llama el Álgebra relacional que está relacionada en como los datos que tenemos se pueden mezclar y unir a través de diferentes propiedades y características.
## Qué son entidades y atributos
Los principales objetos que se manejan al momento de hacer bases de datos son:
* Entidad, estas son como si fuese un objeto que representa algo en el mundo real (ejs. auto, usuario, mensaje, etc.)
* Atributos, son las cosas que hacen o componen a una entidad (ejs. volante, asientos, etc.)
![Ejemplo de Atributos y Entidades](./assets/entidades_y_atributos_ejemplo.jpg)

> Todas estas formas están bien explicadas [aquí](https://de.wikipedia.org/wiki/Chen-Notation) aunque las fundamentales están en la imagen

Por convención el nombre de las _entidades_ se pone en plural (ej. laptops), ya que se dice que esta representa un grupo de estos, los _atributos_ como vimos se pueden representar de distinta forma según como son sus características. Para ilustrar bien todo vamos a hacer un ejemplo más complejo que el anterior en el que se explica un nuevo tipo de atributo:
![Dato llave explicacion](./assets/key_atribute.jpg)

La justificacion de este los datos llave es para cuando pasa por ejemplo el sigiente caso:
|  color  |   año   |pantalla|
| :-----: | :-----: | :----: |
| negro   | 2022    | AX562i |
| rojo    | 2019    | AX521i |
| negro   | 2022    | AX562i |
| blanco  | 2017    | AX419i |

> En este caso que aquí vemos podemos observar que hay dos modelos (el primero y el tercero de arriba a abajo) que son exactamente iguales y es ahí donde es importante tener un "dato llave" que lo que hace es asignarle a cada uno de las entidades de la base de datos un dato único para con este identificarlo

Bien hecho quedaria asi:
|  nro. de serie  |  color  |   año   |pantalla|
|    :-------:    | :-----: | :-----: | :----: |
|    AS87D87DF    | negro   | 2022    | AX562i |
|    AFD89ASDF    | rojo    | 2019    | AX521i |
|    HG9UGDAF8    | negro   | 2022    | AX562i |
|    IKHVB1234    | blanco  | 2017    | AX419i |

Los atributos llave se dividen en dos tipos, los que son naturales es decir que están físicamente en el objeto o entidad y son inherentes a este y, además existen los que se llaman artificiales que son asignados al objeto de manera arbitraria. Por otro lado existen dos tipos de entidades: las entidades fuertes que son aquellas que no necesitan de otra para existir pero, también existen las entidades débiles que si dependen de otra entidad fuerte para existir.
![Tipos de entidad](./assets/tipos_de_entidades.jpg)
![Motivos de entidades debiles](./assets/motivos_de_entid_debiles.jpg)
## Entidades de Platzi Blog
En este curso se va a realizar un proyecto para implementar todo lo aprendido comenzando con la idea/diagramado y finalizando con una base de datos completamente funcional. Además en este se busca que cada uno busque su proyecto y que con este practique de la forma que más le guste. El proyecto del curso es _un manejador de blogposts_, ya que la gran mayoría estamos familiarizados con el sistema de blogs y porque además tiene unos retos interesantes que vamos a ir resolviendo.
Como _primer paso_ en este proyecto tenemos la identificación de identidades, de este ejercicio derivamos en lo siguiente:
* publicaciones
* usuarios
* comentarios
* categorías

Una vez que tenemos las entidades corresponde el _segundo paso_ que sería el de identificar los atributos de todas estas entidades, el resultado de este ejercicio es el siguiente:
* publicaciones
  * id (key)
  * título
  * contenido
  * timestamp/fecha_publicacion
  * estatus
  * etiquetas (multivaluado)
* usuarios
  * id (key)
  * nombre_usuario
  * contraseña
  * apodo
  * email
* comentarios
  * id (key)
  * user_id (key del usuario que publicó el comentario)
  * contenido
  * timestamp/fecha_publicacion
* categorías
  * id (key)
  * nombre
  * descripción
> Estas últimas dos entidades tienen atributos únicamente inventados por nosotros, ya que es parte del curso que así sea. ¡Quizás más adelante sea corregido!
## Relaciones
Otro concepto muy importante al igual que las entidades son las relaciones, estas son _la manera en que empezamos a ligar las entidades u objetos_ y son representadas con un rombo que debe tener un nombre que sea un verbo. Un ejemplo de esto seria que entre un auto y su dueño hay una relación de tenencia llamada "tiene", quedando el gráfico así:
![Ejemplo de auto y dueño](./assets/ejemplo_relacion_1.jpg)

Otro ejemplo también sería el de un jugador en relación con un equipo, a diferencia de que en este ejemplo el equipo tiene _muchos_ jugadores y por eso se presenta la entidad multivaluada.
![Ejemplo de jugador y equipo](./assets/ejemplo_relacion_2.jpg)

Como estamos viendo aparece la relación de "tiene" la cual es muy usada para relacionar dos cosas que ya vimos, estas son las entidades y lo que antes llamamos atributos multivaluados; cuando tenemos estos atributos usualmente los convertimos en entidades separadas, ya que tienen una vida por sí misma y porque puede relacionarse de distintas maneras con la entidad principal. _Más adelante se explicará como se hace bien este proceso y cuáles son los pasos correspondientes a éste_.

### Cardinalidad
Hay un concepto en las relaciones que es llamado la **cardinalidad**, esta tiene que ver con los números y las cantidades que hay en las relaciones tanto de ida como de vuelta, es decir que:

![Ejemplo de cardinalidad 1 a 1](./assets/ejemplo_cardinalidad_1.jpg)

En este caso tendríamos una cardinalidad de 1 a 1 según lo que se explica en la imagen

Hay otras formas de expresar este tipo de relación, estas son:

![Ejemplo de formas de expresar 1 a 1](./assets/ejemplo_cardinalidad_2.jpg)

Otra cardinalidad es la de 0 a 1 o también llamada 1 a 1 opcional, esta es así:

![Ejemplo de formas de expresar 1 a 1 opcional](./assets/ejemplo_cardinalidad_3.jpg)

Otro tipo de cardinalidad es la de 1 a N también llamada 1 a muchos, esta puede ser graficada así:

![Ejemplo de formas de expresar 1 a n](./assets/ejemplo_cardinalidad_4.jpg)

También existe la cardinalidad 0 a N, esta se vería algo así (no sé si esta del todo bien el ejemplo, no me cierra):

![Ejemplo de formas de expresar 1 a n](./assets/ejemplo_cardinalidad_5.jpg)

Lo que se ve en esta clase es un tipo de cardinalidad más interesante, ya que es muy especial y tiene muchos retos que vamos a ir haciendo a lo largo del curso. Esta es la de N a N o muchos a muchos. Un ejemplo seria:

![Cardinalidad N a N](./assets/ejemplo_cardinalidad_6.jpg)
## Diagrama ER
Todo lo que estuvimos viendo hasta ahora nos sirve para armar un Diagrama entidad-relación o ER que nos va a ayudar a hacer un mapa antes de construir la base de datos, este contendía en él: que entidades vamos a trabajar, que relaciones van a existir y que papel van a cumplir entre ellas en las aplicaciones o sistemas que desarrollaremos. Como primer ejemplo podríamos hacer el diagrama del proyecto que estamos llevando a cabo, el PlatiBlog; teniendo en cuenta todas las cosas que antes trabajamos de este podríamos decir que el diagrama seria así:
![Diagrama ER - Platzi Blog](./assets/diagrama-er_platzi-blog.jpg)
> etiquetas pasa de ser un _atributo multivaluado_ a ser una entidad independiente, ya que estas estan en más de un solo blogpost y no depende de ninguno

> Exiten varios estandares para hacer estos diagramas que son distintas entre si, podemos leer más sobre esto [aqui](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Cardinalities)

## Diagrama físico: tipos de datos y constaints
El diagrama de entidad-relación que armamos al principio nos ayuda para conceptualizar las entidades o partes que van a interactuar y de que manera, pero antes de llevarlo a la práctica debemos hacer un paso más en el que detallamos algunas cosas para que al momento de pasarlo a la base de datos real sea más fácil, este es el _diagrama físico_.
### Tipos de datos
Una parte muy importante en este diagrama son los **tipos de dato**, estos son:
#### Texto
* CHAR(n): Permite almacenar caracteres de n cantidad, es decir que puede almacenar cadenas también
* VARCHAR(n): También sirve para almacenar cadenas, pero no toma un espacio fijo como si lo hace CHAR, este toma un espacio mínimo y después se va agrandando o achicando según se lo necesite. Esto lo hace muy eficiente si no se conoce el tamaño de la cadena
* TEXT: Nos permite almacenar cadenas de texto más grandes que lo que permiten las demás, es decir que permite más de 255 caracteres
#### Número
* INTEGER: se lo define así cuando necesitamos un número entero y, esto permite que se hagan operaciones con él, ya que no se trata de una cadena o carácter
* BIGINT: Es un _subtipo_ del INTEGER y permite almacenar un número mucho más grande
* SMALLINT: También es un _subtipo_ de INTEGER y sirve para números muy chicos, usualmente menores a 99
* DECIMAL(n,s): Es para números decimales y a este se le pone en n el número sin decimales y en s los números decimales
* NUMERIC(n,s): Mismo que DECIMAL pero más estricto
> El uso de BIGINT y SMALLINT hacen mucho más eficiente la base de datos
#### Fecha / Hora
* DATE: Puede contener la fecha, es decir año, mes y día
* TIME: Puede contener la hora
* DATETIME: Contiene el tanto la fecha como la hora
* TIMESTAMP: Contiene el timestamp del momento (más información [aquí](https://www.unixtimestamp.com/))
#### Lógico
* BOOLEAN: Puede tener dos valoes 1 o 0, true o false

### Constraints
Los Constraints o Restricciones son reglas de tipo o cantidad de datos que se pueden colocar en un lugar, estos son:
* NOT NULL: No deja que se puedan poner valores nulos, es decir que es obligatorio que se le coloque algo (ej. full_name)
* UNIQUE: Valída que el valor enviado no se repita en la tabla, hace que este sea único (ej. username, email)
* PRIMARY KEY: Es una combinación de NOT NULL y UNIQUE, esto nos da la certeza de que este atributo es único y esto después nos va a ayudar a realizar las relaciones entre entidades (ej. id)
* FOREIGN KEY: Contiene la PRIMARY KEY de la entidad que se relaciona con esta, de esta forma se liga una tabla con otra y, tiene las mismas características que está exceptuando la UNIQUE, ya que en esta si se puede repetir esta key (ej. usuario tiene varios productos)
* CHECK: Nos permite colocar la regla que queramos lo cual hace que sea muy potente esta restricción
* DEFAULT: Cuando queremos que no sea obligatorio colocar algo, pero tampoco queremos que quede como NULL se usa esta restricción poniendo en este el valor por default (ej. 0)
* INDEX: Nos permite hacer búsquedas más rápidas en la base de datos, el problema es que cada vez que se coloca un dato se tiene que volver a indexar todo lo que hace que no sea ideal si se le colocan datos constantemente. Es ideal para cuando son datos pseudofijos, pero que son consultados constantemente.
> Siempre que no se cumpla cualquiera de estas reglas al momento de enviar información, la base de datos va a devolver un error y no va a guardar la información que se le envió
> NOTA DE COLOR: Si queremos hacer por ejemplo un atributo id, podemos usar AUTO_INCREMENT para que así no se tenga que hacer manualmente o desde el servidor.

### Normalización
La normalización nos ayuda a dejar todo en una forma normal obedeciendo así a los 12 mandamientos de Codd. Lo que se hace en este punto es designar y aplicar una serie de reglas a las relaciones obtenidas tras el paso del modelo entidad-relación o ER con el objetivo de minimizar la redundancia de datos y facilitando así la gestión posterior de la base de datos. Un ejemplo de una tabla sin normalizar seria:
|alumno  |nivel_curso    |nombre_curso        |materia_1|materia_2|
|:----:  |:---------:    |:----------:        |:-------:|:-------:|
|Kim P.  |Maestría       |Data Engineering    |MySQL    |Python   |
|Maria M.|Licenciatura   |Analista en Sistemas|MySQL    |Python   |

Las reglas que se tienen que aplicar son las siguentes:
1. Atributos atómicos, es decir que no se pueden tener campos repetidos. Con esta corrección la tabla quedaría así:
##### alumnos
|alumno_id|alumno  |nivel_curso    |nombre_curso        |materia|
|:-------:|:----:  |:---------:    |:----------:        |:-----:|
|1        |Kim P.  |Maestría       |Data Engineering    |Python |
|1        |Kim P.  |Maestría       |Data Engineering    |MySQL  |
|2        |Maria M.|Licenciatura   |Analista en Sistemas|MySQL  |
|2        |Maria M.|Licenciatura   |Analista en Sistemas|Python |
> Ya no se repite materia lo que hace que se reduzcan los campos repetidos y sobre todo, lo más importante es que si llega un nuevo alumno que toma una sola materia este no tendra un campo vacio
2. El campo de la tabla debe depender de una clave única, esto quiere decir que en una misma tabla no se puede repetir varias veces la clave única; esto si pasa en la tabla anterior, ya que se repite 1 y 2 dos veces. Con esta corrección la tabla quedaría así:
##### alumnos
|alumno_id|alumno  |nivel_curso    |nombre_curso        |
|:-------:|:----:  |:---------:    |:----------:        |
|1        |Kim P.  |Maestría       |Data Engineering    |
|2        |Maria M.|Licenciatura   |Analista en Sistemas|
##### materias
|materia_id|alumno_id|materia|
|:--------:|:-------:|:-----:|
|1         |1        |MySQL  |
|2         |1        |Python |
|3         |2        |MySQL  |
|4         |2        |Python |
> Ahora nos quedarían dos tablas pero cada una con una clave única por cada fila creada. Además conceptualmente queda bien, ya que la materia y el alumno son dos entidades distintas
3. Los campos que NO son clave NO deben tener dependencia, esto quiere decir que si una entidad no tiene ligada intrínsecamente o propiamente un campo este debe ser una tabla independiente. Con esta corrección la tabla quedaría así:
##### alumnos
|alumno_id|alumno  |curso_id|
|:-------:|:----:  |:------:|
|1        |Kim P.  |1       |
|2        |Maria M.|2       |
##### cursos
|curso_id|nivel_curso    |nombre_curso        |
|:------:|:---------:    |:----------:        |
|1       |Maestría       |Data Engineering    |
|2       |Licenciatura   |Analista en Sistemas|
##### materias
|materia_id|alumno_id|materia|
|:--------:|:-------:|:-----:|
|1         |1        |MySQL  |
|2         |1        |Python |
|3         |2        |MySQL  |
|4         |2        |Python |
> Básicamente como Kim P. no va a ser el único que estudie ese curso, estos campos no están únicamente ligados al así que eso significa que tiene que ser otra entidad aparte
4. Los campos multivaluados se identifican por una clave única, es decir que si tenemos un atributo que existe múltiples veces debemos crear otra tabla para identificarlos con una clave única. Con esta corrección la tabla quedaría así:
##### alumnos
|alumno_id|alumno  |curso_id|
|:-------:|:----:  |:------:|
|1        |Kim P.  |1       |
|2        |Maria M.|2       |
##### cursos
|curso_id|nivel_curso    |nombre_curso        |
|:------:|:---------:    |:----------:        |
|1       |Maestría       |Data Engineering    |
|2       |Licenciatura   |Analista en Sistemas|
##### materias
|materia_id|materia|
|:--------:|:-----:|
|1         |MySQL  |
|2         |Python |
##### materias_por_alumno
|mpa_id|materia_id|alumno_id|
|:----:|:--------:|:-------:|
|1     |1         |1        |
|2     |1         |1        |
|3     |1         |2        |
|4     |1         |2        |
> Acá la última tabla nos sirve simplemente para unir las materias con los alumnos

Una aclaración importante sobre esto, mediante se va a aumentando el nivel (es de arriba hacia abajo, es decir que la primera regla expuesta es la Nro. 1) se deben respetar las reglas anteriores y, lo que nos permite todo esto es que a lo largo de toda la base de datos no haya ningún dato repetido. Sobre todo nos va a permitir hacer querys complejos en el futuro.
### Normalización por ChatGPT
La información que se presenta a continuación ha sido proporcionada por ChatGPT, un modelo de lenguaje grande entrenado por OpenAI.

Las normas de normalización en bases de datos SQL son un conjunto de reglas y principios que se aplican a la estructura de una base de datos para minimizar la redundancia y dependencia de datos, y aumentar la integridad y flexibilidad de la base de datos.

Existen varias formas de normalización, cada una de las cuales se divide en diferentes niveles o formas. A continuación se describen brevemente cada una de ellas:
#### Forma normal (1NF): Es la forma más básica de normalización y se basa en tres reglas:
* Cada tabla debe tener una clave primaria única que identifique de manera única a cada fila de la tabla.
* No pueden haber valores duplicados en las filas de la tabla.
* Cada columna debe tener un solo valor (no se pueden almacenar múltiples valores en una misma columna).
#### Forma normal de segundo grado (2NF): Además de cumplir con todas las reglas de la 1NF, para estar en 2NF debe cumplirse lo siguiente:
* Cada columna de la tabla debe depender funcionalmente de la clave primaria completa. Esto significa que si se conoce la clave primaria, entonces se pueden determinar todos los demás valores de la fila.
* No deben existir dependencias parciales, es decir, no deben existir columnas que dependan de una parte de la clave primaria (por ejemplo, si la clave primaria es una combinación de dos campos, no deben existir columnas que dependan solo de uno de ellos).
#### Forma normal de tercer grado (3NF): Además de cumplir con todas las reglas de la 2NF, para estar en 3NF debe cumplirse lo siguiente:
* No deben existir dependencias transitorias, es decir, no deben existir columnas que dependan de otras columnas que a su vez dependen de la clave primaria.
#### Forma normal de Boyce-Codd (BCNF): Además de cumplir con todas las reglas de la 3NF, para estar en BCNF debe cumplirse lo siguiente:
* Cada determinante debe ser una clave candidata, es decir, debe ser posible determinar todas las
### Normalizando PlatziBlog
Antes de normalizar se debe hacer el diagrama fisico de cada una de las tablas, esto quedaria asi:
##### usuarios
* id: INTEGER (PRIMARY KEY)
* login: VARCHAR(30) NOT NULL
* password: VARCHAR(32) NOT NULL
* nickname: VARCHAR(40) NOT NULL
* email: VARCHAR(40) NOT NULL && UNIQUE
##### post
* id: INTEGER (PRIMARY KEY)
* titulo: VARCHAR(150)
* fecha_publicacion: TIMESTAMP
* contenido: TEXT
* estatus: CHAR(8) CHECK(IN('activo','inactivo'))
* usuario_id: INTEGER (FOREIGN KEY)
* categorias_id: INTEGER (FOREIGN KEY)
##### comentario
* id: INTEGER (PRIMARY KEY)
* comentario: TEXT (NOT NULL)
* usuario_id: INTEGER (FOREIGN KEY)
* publicacion_id: INTEGER (FOREIGN KEY)
##### categoria
* id: INTEGER (PRIMARY KEY)
* categoria: (NOT NULL)
##### etiquetas
* id: INTEGER (PRIMARY KEY)
* nombre_etiqueta: VARCHAR (NOT NULL)
#### Diagrama físico
![Diagrama físico platzi blog](./assets/diagrama-fisico-platzi-blog.jpg)

> **ERROR EN LA IMAGEN**: la tabla publicacion deberia tener tambien un atributo que es este: categoria_idL INTEGER (FOREIGN KEY)

> IMPORTANTE: siempre que tengamos una relación uno a muchos vamos a tener que poner el id de la entidad que es UNA en la entidad que es MUCHOS como llave foránea, de esta forma se puede identificar bien de quien es que; esto lo vemos en muchas de las entidades presentes.

> Además, cuando tenemos una relación muchos a muchos opcional lo que debemos hacer es romper esa relación y poner una tabla intermedia que se va a llamar _tabla pívot_ y cumple la función de simplemente relacionar las dos tablas, esta va a contener las dos llaves que quiere conectar.
## Instalación local de un RDBMS
Antes de comenzar a hacer las bases de datos, necesitamos un _manejador de bases de datos_; para esto hay dos maneras: de forma local o en la nube. Nosotros usaremos la primera opción y en específico lo haremos con MySQL.
MySQL tiene un impacto histórico y es uno de los más utilizados en la industria, además tiene una versión de la comunidad que es libre y gratuita; para instalarla podemos ir [aquí](https://dev.mysql.com/downloads/windows/installer/). Una vez tengamos descargado el instalador debemos seguir la instalación normalmente, yo hice una instalación full para no tener problemas más adelante pero se podría reducir la instalación a menos cosas para así ocupar menos espacio y menos recursos sean consumidos.
## ¿Qué es un RDBMS?
Un RDBMS (Relational Data Base Management System) es un programa que se encarga de cumplir las reglas de Codd y que nos ayuda a hacer todo lo que ya hicimos de manera teórica utilizable en la realidad. Ejemplos de esto son: Oracle (tiene MySQL), posgreSQL y MariaDB; todas estas tienen el mismo lenguaje base pero cada una lo usa a su manera, imponiéndole reglas y características.
## Clientes gráficos
Un cliente gráfico es la interfaz gráfica que nos permite de una forma de ver como funciona nuestra base de datos internamente, esta representa las entidades como tablas teniendo a los atributos como columnas; además nos permite modificar la base de datos y en general administrarlas. En nuestro caso vamos a usar _MySQL Workbench_.
## Servicios administrados
Hoy en día, las empresas no tienen un RDBMS instalado en su servidor sino que los tercerizan. Estos servicios que contratan se llaman Cloud o Servicios administrados, esto significa que vos como empresa contratista solo te encargas del contenido de la base de datos y no en el Sistema Operativo, actualizaciones, redes y mantenimiento en general; ejemplo de empresas que prestan este servicio son: AWS (Amazon Web Services), GCP (Google Cloud Platform) y Microsoft Azure.
Si queremos iniciarnos en todo este mundo tenemos [aquí](https://console.cloud.google.com/getting-started?pli=1) una guia del mismo Google y los siguientes cursos de Platzi:
* [Curso de Introduccion a Google Cloud Platform](https://platzi.com/clases/fundamentos-google/)
* [Curso de Almacenamiento en la Nube con Google Cloud Platform](https://platzi.com/cursos/almacenamiento-gcp/)

La opción de usar Google Cloud es muy buena, ya que nos da una cantidad de almacenamiento gratis que nos permite usar el servicio en proyectos de desarrollo pero, pasando el límite pasa a ser pago y es por eso que te pide que coloques una tarjeta antes de comenzar. Probablemente es una muy buena opción si estamos iniciando una empresa pero estamos en una etapa de desarrollo intermedia en la que debemos hacer pruebas más realistas para poder así finalizar todo y pasar a desplegarla.
> En el curso explican como se usa más o menos y, aunque lo vi, no me parece TAN pertinente en este curso así que si se quiere saber más de esto debemos investigar o realizar los cursos. Otra opción es retomar la clase [aquí](https://platzi.com/clases/1566-bd/20209-servicios-administrados9920/)
## Historia de SQL
SQL (Structured Query Language) es el lenguaje que se usa para comunicarse con los RDBMS's y, en general existe un amplio uso de este lenguaje. SQL se crea en un momento de la historia en el que se querían hacer consultas a datos, pero no existía un estándar real para hacerlo, de esta forma con el nuevo lenguaje se unificó todo para que las empresas puedan hacer cosas conectadas y para que en general no sea todo un descontrol. Este lenguaje tiene una estructura muy clara y fija, es fácil de replicar para diferentes proyectos una vez que es aprendida.
> DATO: NOSQL se suele relacionar con bases de datos no relacionales que no usan SQL, pero en realidad en su base si lo usan y es por esto que el nombre es Not Only Structured Query Language
## Structured Query Language: Subgrupos de comandos
SQL tiene cuatro subgrupos de comandos, estos son:
* DDL o Data Definition Language: son los orientados a la definición del como es la estructura de la base de datos, permitiendo así crear, alterar, eliminar, vaciar, entre otros.
* DML o Data Manipulation Language: están orientados al manejo de todos los datos que contiene una tabla, logrando con estos guardar, modificar, recuperar, eliminar y actualizar.
* DCL o Data Control Language: en este se incluyen aquellos comandos que permiten administrar las personas o usuarios acceder o no a ciertos privilegios dentro de la base de datos.
* TCL o Transaction Control Language: se utilizan para las transacciones de bases de datos.
## DDL
Como ya vimos antes, este lenguaje es con el que vamos a poder crear y administrar la estructura de una base de datos. Esta tiene diversos comandos dentro que serán muy útiles, ya que se podrán crear las tablas o entidades que se incluyeron en el diagrama físico.
> Si queremos revisar más información de este subgrupo el profesor nos da este [link](https://en.wikipedia.org/wiki/Data_definition_language)

Con este vamos a manipular tres objetos, estos son:
* Bases de datos o Schemas: es el repositorio de datos que va a usar el proyecto
* Tablas: son la proyección o traducción a SQL de las entidades que vimos antes
* View: es la proyección de los datos de una tabla de forma que sean entendibles para alguien, esto es importante, ya que como la base de datos está normalizada vamos a ver que tenemos toda la información dividida en pedazos y debemos armar esto para que sea entendible
### CREATE
Nos permite crear una tabla, columna, base de datos/schema, etc. Algunos ejemplos son:

CREATE DATABASE nombre_db;
USE nombre_db;

Acá podemos ver como creamos una base de datos con el nombre 'nombre_db' y después, en la segunda línea, la usamos para que cuando empezamos a hacer consultar o inserciones de datos el programa sepa sobre que tabla estamos trabajando. También se puede usar SCHEMA en lugar de DATABASE.

CREATE TABLE nombre_tabla (
  atributo_1 int,
  atributo_2 vatchar(25),
  atributo_3 varchar(255)
);

Acá se ve como se crea una tabla llamada 'nombre_tabla' y, como se puede observar al momento de crearla debemos aclarar entre paréntesis el tipo de dato que va a ser; recordemos que los tipos de datos los vimos en la clase de Diagramas Físicos. Otra cosa importante es que después del tipo de dato podemos colocar el Constrains que queramos, como por ejemplo:

CREATE TABLE nombre_db.nombre_tabla (
	id int NOT NULL AUTO_INCREMENT,
  nombre varchar(30) NOT NULL,
	PRIMARY KEY ( id );

Como podemos ver, al momento de crear el ID utiliza el AUTO_INCREMENT que es de mucha utilidad para este tipo de atributos.
Otra parte muy importante es la **creación de vistas**, esto lo que hace es tomar datos ponerlos de forma presentable y convertirlas en algo que podamos consultar recurrentemente; este consta de dos partes principales que están separadas por el AS, podemos ver un ejemplo aquí:

CREATE VIEW v_argentina_customers AS
  SELECT customer_name,
  last_purchase
  FROM customers
  WHERE country = "Argentina";

Acá, con un poco de lógica podemos entender que lo que hace es crear una especie de sub tabla con todos los nombres de cliente y fecha de última compra de aquellos clientes que sean de Argentina que estén en la tabla de clientes. Una vez creada la vista, este 'preset' se mantiene en memoria por lo que si días después queremos revisarla va a estar actualizada y no debemos hacer la consulta nuevamente.
### ALTER
Nos permite alterar o modificar una tabla, columna, base de datos/schema, etc. Algunos ejemplos son:

ALTER TABLE people ADD date_of_birth date;

ALTER TABLE test.people
CHANGE COLUMN date_of_birth date_of_birth year;

ALTER TABLE people DROP COLUMN date_of_birth;

Acá lo que podemos ver es que modificamos la tabla people agregándole una nueva columna, luego alteramos la columna de la tabla y luego eliminamos la columna de la tabla. Si queremos que por ejemplo al columna vaya despues de otra podemos hacer esto:

ALTER TABLE people ADD nickname AFTER first_name;

ALTER TABLE people MODIFY date_of_birth YEAR;

En el ultimo ejemplo podemos ver como modificamos el tipo de dato de una columna sin tener que hacerlo con CHANGE, esa opcion es mejor si queremos cambiar todo: nombre y lo demas.
### DROP
Nos permite borrar una tabla, columna, base de datos/schema, etc. Algunos ejemplos son:

DROP TABLE nombre_tabla;

DROP DATABASE nombre_db;

DROP VIEW nombre_view

Como podemos ver, se pueden borrar tablas, bases de datos y views; previamente vimos como con ayuda de ALTER tambien podemos borrar columnas.
## DML
Esta parte del lenguaje SQL nos va a servir para modificar el contenido de las tablas que están contenidas dentro de una base de datos, con este vamos a poder crear una nueva entrada, actualizarla, eliminarla o extraerla con algún motivo específico. Si queremos encontrar más información podemos ir [aquí](https://en.wikipedia.org/wiki/Data_manipulation_language) o [aquí](https://www.w3schools.in/mysql/ddl-dml-dcl/); también es recomendable buscar en la web sobre nuestra duda.
DML está dividido en cuatro comandos principales:
### INSERT
Este comando nos permite meter información dentro de una tabla SQL y se lo puede hacer de esta forma:

INSERT INTO nombre_tabla (atributo1, atributo2, atributo3)
VALUES ('valor1','valor2','valor3');

INSERT INTO nombre_tabla (atributo1, atributo2, atributo3)
VALUES ('valor1','valor2','valor3'),
('valor1','valor2','valor3'),
('valor1','valor2','valor3');

Cada uno sé esos datos que están entre paréntesis después de la segunda línea corresponden cada uno a una fila de la tabla.
### UPGRADE
En este caso, nos va a permitir actualizar una tabla de la base de datos. Podemos actualizar tanto con condicionales como sin estas. Algunos ejemplos son:

UPDATE nombre_tabla
SET atributo1 = 'valor1', atributo4 = 'valor4'
WHERE person_id = 1;

UPDATE citizens
SET country = 'Mexico'
WHERE city = 'CDMX';

UPDATE table_1
SET status = 'active'

Como podemos ver, el último ejemplo no tiene una condicional lo que hace que TODAS las filas de la tabla se actualicen con ese valor en ese atributo; en los demás ejemplos si lo limita según como coincide alguna columna con la condición.
### DELETE
Nos va a permitir eliminar una fila completa poniendole una condicional o no, ejemplos de eso son:

DELETE FROM table1 WHERE person_id = 1;

DELETE FROM table2;

Como podemos ver en el segundo caso no se presenta una condicional por ende estaría eliminando TODAS LAS FILAS de table2
### SELECT
Permite que "traigamos" o seleccionemos ciertos datos de una tabla y hasta de una fila especifica, es bastante compleja y más adelante veremos más sobre esto; por el momento acá hay algunos ejemplos:

SELECT atributo1, atributo2 FROM tabla1;

SELECT atributo1, atributo2 FROM tabla1 WHERE atributo5 = true;

SELECT * FROM tabla1 WHERE id = 2;

Creo que no hay mucho que explicar, lo único nuevo que vemos es la utilización de *, pero todos sabemos que es para traer TODO el contenido de la fila
## Creando PlatziBlog
Una vez que ya tenemos el diagrama físico tenemos una representación muy fiel de lo que vamos a hacer en la base de datos, es por eso que debemos ahora tomar este y usarlo como base para crearla. Cuando debemos crear las tablas conviene empezar por aquellas que no van a tener ninguna llave foránea.
> Si queremos darnos cuenta más fácil cuáles no van a tener llave foránea vamos a notar que usualmente las que no tienen el final de la relación en MUCHOS pero no siempre es asi
### Creacion de tablas independientes

-- Creacion de categorias
CREATE TABLE categorias (
	id INTEGER NOT NULL AUTO_INCREMENT,
  nombre_categoria VARCHAR(30) NOT NULL,
  PRIMARY KEY ( id ));


-- Creacion de etiquetas
CREATE TABLE etiquetas (
	id INTEGER NOT NULL AUTO_INCREMENT,
	nombre_etiqueta VARCHAR(30) NOT NULL,
	PRIMARY KEY ( id ));


-- Creacion de usuarios
CREATE TABLE usuarios (
	id INTEGER NOT NULL AUTO_INCREMENT,
	login VARCHAR(30) NOT NULL,
  password VARCHAR(32) NOT NULL,
  nickname VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL UNIQUE,
	PRIMARY KEY ( id ));


-- Yo en el código anterior creo usuarios, pero la uniquekey si queremos verlo en serio se crea de esta forma
CREATE TABLE usuarios (
  id int NOT NULL AUTO_INCREMENT,
  login varchar(30) NOT NULL,
  password varchar(32) NOT NULL,
  nickname varchar(40) NOT NULL,
  email varchar(40) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


> TODO ESTO TAMBIEN SE PUEDE CREAR CON AYUDA DEL PROGRAMA EN LUGAR DE POR TERMINAL
### Creacion de tablas dependientes
Las tablas dependientes son aquellas que tienen llaves foráneas y, por ende, dependen de que la tabla de la cual toman dicha llave exista. Estas tablas dentro del proyecto de PlatziBlog son: publicacion, publicacion_etiqueta y comentario; ahora vamos a crearlas.
Si queremos crear las tablas con ayuda del programa (lo cual no recomiendo ya que siempre es mejor aprenderse el lenguaje bien) podemos hacerlo normalmente y, cuando llegamos a la parte de las FOREIGN KETs debemos ponerlas como NOT NULL y luego ir al apartado de Foreign Keys donde debemos hacer esto:
![Foreign Keys en MySQL Workbench](./assets/ejemplo_foreign_key_mysql_workbench.jpg)

-- Creacion de publicacion - Forma 1
--    Primer paso: Creamos la tabla normalmente
CREATE TABLE publicaciones (
	id INTEGER NOT NULL AUTO_INCREMENT,
	titulo VARCHAR(150) NOT NULL,
  fecha_publicacion TIMESTAMP NOT NULL,
  contenido TEXT NOT NULL,
  estatus CHAR(8) CHECK(estatus IN('activo','inactivo')) DEFAULT 'activo',
  usuario_id INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL,
	PRIMARY KEY ( id ));
--    Paso dos: Seteamos las columnas como foreign key
ALTER TABLE publicaciones ADD INDEX publicaciones_usuarios_idx (usuario_id ASC);
ALTER TABLE publicaciones ADD CONSTRAINT publicaciones_usuarios
	FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

ALTER TABLE publicaciones ADD INDEX publicaciones_categorias_idx (categoria_id ASC);
ALTER TABLE publicaciones ADD CONSTRAINT publicaciones_categorias
	FOREIGN KEY (categoria_id)
    REFERENCES categorias (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;


-- Creacion de publicacion - Forma 2
--    Creamos todo de una (No lo hace el del curso, es lo que me muestra MySQL WORKBENCH)
CREATE TABLE platziblog.publicaciones (
  id INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  fecha_publicacion TIMESTAMP NOT NULL,
  contenido TEXT NOT NULL,
  estatus CHAR(8) NOT NULL,
  usuario_id INT NOT NULL,
  categoria_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX publicaciones_usuarios_idx (usuario_id ASC) VISIBLE,
  INDEX publicaciones_categorias_idx (categoria_id ASC) VISIBLE,
  CONSTRAINT publicaciones_usuarios
    FOREIGN KEY (usuario_id)
    REFERENCES platziblog.usuarios (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT publicaciones_categorias
    FOREIGN KEY (categoria_id)
    REFERENCES platziblog.categorias (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

> La diferencia entre crear todo de una y cambiar despues de crear es nula, es mejor hacer todo de una si ya sabemos que va a ser asi
En ambos casos se dan cosas muy importantes, por eso vamos a explicarlo por puntos:
1. INDEX publicaciones_usuarios_idx (usuario_id ASC) VISIBLE: crea un índice llamado publicaciones_usuarios_idx en la tabla publicaciones que se basa en el campo usuario_id. Al crear un índice en el campo usuario_id, se está permitiendo que las consultas que filtren u ordenen por el campo usuario_id se ejecuten de manera más eficiente. El término ASC significa "ascendente", lo que indica que el índice se ordenará en orden ascendente (de menor a mayor) según el valor del campo usuario_id. El término "VISIBLE" indica que el índice es visible para las consultas optimizador. Esto significa que el optimizador de consultas puede considerar el uso de este índice al determinar la manera más eficiente de ejecutar una consulta. Si se omite el término "VISIBLE", el índice se considerará "INVISIBLE" y no se usará en la optimización de consultas.
2. ON DELETE NO ACTION o ON UPDATE NO ACTION: lo que define es "que se hace si se elimina esa fila de la otra tabla", las opciones que se pueden seleccionar son:
* NO ACTION: no va a hacer nada, lo ignora. Esto significa que si se actualiza esta va a quedar desactualizada o, que si borran la fila esta no se borra.
* CASCADE: lo que pase en el otro pasa en este, si la otra se actualiza o borra esta hace lo mismo.
* SET NULL: si la otra se actualiza o borra esta se setea NULL.
* RESTRICT: si la otra se quiere borrar o actualizar no va a dejar, rebota la acción.
### Creacion de tablas transitivas

-- Creacion de comentarios
CREATE TABLE comentarios (
	id INT NOT NULL AUTO_INCREMENT,
    cuerpo_comentario TEXT NOT NULL,
    usuario_id INT NOT NULL,
    publicacion_id INT NOT NULL,
    PRIMARY KEY ( id),
    INDEX comentarios_usuarios_idx (usuario_id ASC) VISIBLE,
    INDEX comentarios_publicaciones_idx (publicacion_id ASC) VISIBLE,
    CONSTRAINT comentarios_usuarios
		  FOREIGN KEY (usuario_id)
      REFERENCES usuarios (id)
      ON DELETE NO ACTION
      ON UPDATE CASCADE,
	CONSTRAINT comentarios_publicaciones
		FOREIGN KEY (publicacion_id)
    REFERENCES publicaciones (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);


-- Creacion de publicacion_etiqueta
CREATE TABLE publicaciones_etiquetas (
	id INT NOT NULL AUTO_INCREMENT,
  publicacion_id INT NOT NULL,
  etiqueta_id INT NOT NULL,
  PRIMARY KEY ( id ),
  INDEX publicacionesetiquetas_publicaciones_idx ( publicacion_id ASC ) VISIBLE,
  INDEX publicacionesetiquetas_etiquetas_idx ( etiqueta_id ASC ) VISIBLE,
  CONSTRAINT publicacionesetiquetas_publicaciones
	FOREIGN KEY ( publicacion_id )
      REFERENCES platziblog.usuarios ( id )
      ON DELETE NO ACTION
      ON UPDATE CASCADE,
	CONSTRAINT publicacionesetiquetas_etiquetas
		FOREIGN KEY ( etiqueta_id )
        REFERENCES platziblog.etiquetas ( id )
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

> Como podemos ver, se le agrega un campo de id para que a la larga sea más fácil de manejar; también nos damos cuenta de que al final tanto publicacion_id y etiqueta_id no son PRIMARY KEYs lo cual confirma nuestras sospechas de que no tenía lógica

Otra cosa muy importante es que en **MySQL Workbench** tenemos una herramienta de "Ingeniería inversa" lo que significa que partiendo de una base de datos podemos saber todo lo que se hizo en esa base de datos y nos muestra como un diagrama físico cobre esta. Esto sirve mucho cuando entramos a un trabajo que ya tiene la base de datos armada y queremos saber como es que funciona realmente y también quizás hasta en que se puede optimizar.
## Consultas en SQL
Las consultas son fundamentales en SQL, ya que son lo importante de estas, lo que hace que sea una herramienta excelente para cualquier tipo de negocio. Con estas podemos unir tablas, seleccionar de forma correcta los datos, presentar estadísticas, entre otros; y con esto lograr entender mejor algo o salvar un negocio tomando la decisión correcta.
En conclusión, es lo que le permite a las organizaciones tomar decisiones de forma acertada y basada en los datos; hacer esto puede definir en futuro de la empresa para bien, ya que se sabe que es lo que se está haciendo.
### Estructura básica de un Query
Los querys son la forma en que estructuramos las preguntas que le vamos a hacer a la base de datos, la estructura de esta puede ser muy simple o ya más compleja. Antes de hacer un query debemos preguntarnos que es lo que queremos saber de la base de datos, es decir que es lo que le queremos "preguntar" a la base de datos; ejemplos de esto serian: "Cuantos usuarios de mi aplicación compraron en el último mes", "Que usuarios son de Argentina y cuantos productos compraron cada uno", entre otro montón de posibilidades que a su vez varían según el negocio al que esté enfocada la base de datos.
Los querys siempre están divididos en dos partes: **SELECT** y **FROM**, pero algunas veces también puede aparecer una parte que es **WHERE**; la estructura de estos es así:

-- Ejemplo sacado del curso
SELECT city, COUNT(*) AS total
FROM people
WHERE active = true
GROUP BY city
ORDER BY total DESC
HAVING total >= 2;

Como podemos ver quizás no es TAN básica esta estructura, por lo que vamos a explicarla por arriba:
1. SELECT permite seleccionar que datos queremos traer
2. AS permite que un dato se proyecte como una columna, es decir que en este caso COUNT(*) se proyecta o aparece como total
3. FROM permite seleccionar de donde vamos a sacar los datos
4. WHERE permite filtrar mediante una condición para que solo traiga las columnas que cumplan con esta
5. GROUP BY permite agrupar por un criterio o columna, es decir que todas las filas que sean iguales en la columna colocada van a agruparse
6. OREDER BY permite ordenar lo seleccionado según algún criterio o columna
7. DESC hace referencia a que lo muestre en forma descendente, el contrario seria ASC
8. HAVING permite filtrar los grupos con una condición, es decir que si algún grupo no cumple con esa condición no se va a seleccionar

Un ejemplo de una estructura básica con el proyecto actual es la que responde a la pregunta probablemente muy común en un blog: "Cuantos artículos se publicaron este mes":

SELECT COUNT(*) AS total
FROM publicaciones
WHERE TIMESTAMPDIFF(MONTH,fecha_publicacion,now()) = 0;

Con este query también se puede saber cuantos el mes pasado o hace 8 meses, ya que cambiando el 0 de la tercera línea lo podemos definir, además podemos hacerlo por días o años cambiando el MONTH y con la misma lógica anterior. También podríamos sumar todos los artículos de varios meses (relacionándolo con una temporada, por ejemplo) cambiando el = por un < y colocando la cantidad de meses que queremos sumar hacia atrás en lugar del 0, por ejemplo:

SELECT COUNT(*) AS total
FROM publicaciones
WHERE TIMESTAMPDIFF(MONTH,fecha_publicacion,now()) < 3;

Eso consultaría cuantos artículos se publicaron en los últimos 3 meses pudiendo así hacer una estadística de un periodo o de una medida tomada y como se proyectó en los resultados.
## Mi proyecto: Registro policial
Una base de datos que almacene a todos los ciudadanos de un país o ciudad y que permita asignarle a estos licencias (de conducir, de armas, etc.), pero que también se pueda mantener un registro criminal en esta. Lo básico para el registro criminal es: delitos cometidos, órdenes de restricción, denuncias en su contra, etc.
### Entidades
* ciudadano
  * dni
  * nombres
  * apellidos
  * fecha_de_nacimiento
  * domicilio
* pasaporte
  * numero_de_pasaporte
  * dni
* cuit
  * numero_de_cuit VARCHAR
  * dni
* denuncia
  * dni_denunciante
  * dni_denunciado
  * denuncia
* condena
  * dni_condenado
  * condena
  * motivo
  * id_exp_judicial
* multa
  * dni_multado
  * monto
  * motivo
### Relaciones
![Relaciones proyecto personal](./assets/proyecto-propio-relaciones.jpg)
> Esta desactualizado ya que después agregué un par de entidades más, pero la lógica con estas es la misma
### Diagrama Físico
* ciudadano
  * dni INTEGER (PRIMARY KEY)
  * nombres VARCHAR (NOT NULL)
  * apellidos VARCHAR (NOT NULL)
  * fecha_de_nacimiento DATE (NOT NULL)
  * domicilio VARCHAR (NOT NULL)
* pasaporte
  * numero_de_pasaporte VARCHAR (PRIMARY KEY)
  * dni INTEGER (FOREIGN KEY)
* cuit
  * numero_de_cuit VARCHAR (PRIMARY KEY)
  * dni INTEGER (FOREIGN KEY)
* denuncia
  * numero_denuncia INTEGER (PRIMARY KEY)
  * dni_denunciante INTEGER (FOREIGN KEY)
  * denuncia TEXT (NOT NULL)
* condena
  * numero_condena INTEGER (PRIMARY KEY)
  * dni_condenado INTEGER (FOREIGN KEY)
  * condena INTEGER (NOT NULL)
  * motivo TEXT (NOT NULL)
  * id_exp_judicial INTEGER (FOREIGN KEY)
* multa
  * numero_multa INTEGER (PRIMARY KEY)
  * dni_multado INTEGER (FOREIGN KEY)
  * monto DECIMAL (NOT NULL)
  * motivo TEXT (NOT NULL)
### Normalización
Para comenzar la normalización es más simple tener una visión de tablas de todas las entidades y de ahí partir para realizarla.
##### ciudadano
|dni|nombres|apellidos|fecha_de_naciemiento|domicilio|
|:-:|:-----:|:-------:|:------------------:|:-------:|
##### pasaporte
|numero_de_pasaporte|dni|
|:-----------------:|:-:|
##### ciut
|numero_de_cuit|dni|
|:------------:|:-:|
##### denuncia
|numero_denuncia|dni_denunciante|dni_denunciado|denuncia|
|:-------------:|:-------------:|:------------:|:------:|
##### condena
|numero_condena|dni_condenado|condena|motivo|id_exp_judicial|
|:------------:|:-----------:|:-----:|:----:|:-------------:|
##### multa
|numero_multa|dni_multado|monto|motivo|
|:----------:|:---------:|:---:|:----:|

> Se agregaron varias PRIMARY KEY a algunas entidades, pero no por la normalización sino porque me equivoque yo, fuera de eso creo que no hay nada que se deba normalizar

> **No se tuvo que normalizar nada**, ya que no detecte nada que deba ser normalizado

El diagrama físico con sus relaciones y todo queda así:
![Diagrama físico proyecto personal](./assets/diagrama-fisico-proyecto-personal.jpg)
### Creando la base de datos

-- Creacion de la base de datos
CREATE DATABASE registro_policial DEFAULT CHARACTER SET utf8mb4;
USE registro_policial;


-- Creacion de ciudadanos
CREATE TABLE ciudadanos (
	dni INT NOT NULL,
  nombres VARCHAR(30) NOT NULL,
  apellidos VARCHAR(30) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  domicilio VARCHAR(255) NOT NULL,
  sexo CHAR(1) NOT NULL CHECK(sexo IN ('m','f')),
  PRIMARY KEY( dni )
);

En este caso no puse un AUTO_INCREMENT ya que no es una base de datos de natalidad, por ende los datos se insetran casi que manualmente

-- Creacion de cuits
CREATE TABLE cuits (
	numero_cuit INT NOT NULL,
  ciudadano_dni INT NOT NULL UNIQUE,
  PRIMARY KEY ( numero_cuit ),
  INDEX cuits_ciudadanos_idx ( ciudadano_dni ASC) VISIBLE,
  CONSTRAINT cuits_ciudadanos
	FOREIGN KEY (ciudadano_dni)
      REFERENCES ciudadanos ( dni )
      ON DELETE CASCADE
      ON UPDATE RESTRICT
);

Aca tenemos una correccion importante, luego de buscar en internet descubri que "todo Pasaporte adopta una identificación única e irrepetible para cada soporte de libreta emitida" es decir que teniendo en cuenta esto tiene que tener un created_at o algo por el estilo. Luego me tome el tiempo de hablar con ChatGPT sobre como se definen dichos numero y me constesto esto:
El patrón específico que sigue el número de pasaporte en Argentina es el siguiente:
* La primera letra indica el país de emisión. En el caso de Argentina, la primera letra es "A".
* Las siguientes dos letras indican el tipo de documento. En el caso de los pasaportes, estas letras son "PE" para los pasaportes electrónicos y "PP" para los pasaportes tradicionales.
* Los siguientes cuatro dígitos indican el número de serie del pasaporte. Estos dígitos se incrementan secuencialmente para cada nuevo pasaporte emitido.
* Los últimos dos dígitos indican el año de emisión del pasaporte. Por ejemplo, si el año de emisión es 2022, los últimos dos dígitos serán "22".

Por lo tanto, un número de pasaporte de Argentina podría tener una estructura similar a esta: AXX999999YY, donde A es la primera letra, X son las siguientes dos letras, 9 son los cuatro dígitos de la serie y Y son los dos dígitos del año de emisión. Cada número de pasaporte es único y no se repite.
Simplemente confio en ChatGPT para hacerlo:

-- Creacion de pasaportes
CREATE TABLE pasaportes (
	id INT NOT NULL AUTO_INCREMENT,
  numero_pasaporte CHAR(9) NOT NULL UNIQUE,
  ciudadano_dni INT NOT NULL UNIQUE,
  PRIMARY KEY ( id ),
  INDEX pasaportes_ciudadanos_idx ( ciudadano_dni ASC) VISIBLE,
  CONSTRAINT pasaportes_ciudadanos
	  FOREIGN KEY ( ciudadano_dni )
	  REFERENCES ciudadanos ( dni )
	  ON DELETE CASCADE
	  ON UPDATE RESTRICT
);


-- Creacion de multas
CREATE TABLE multas (
	id INT NOT NULL AUTO_INCREMENT,
  ciudadano_dni INT NOT NULL,
  monto DECIMAL NOT NULL CHECK(monto > 0),
  motivo VARCHAR(255),
  PRIMARY KEY ( id),
	INDEX multas_ciudadanos_idx ( ciudadano_dni ASC) VISIBLE,
  CONSTRAINT multas_ciudadanos
		FOREIGN KEY ( ciudadano_dni )
		REFERENCES ciudadanos ( dni )
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);


-- Creacion de condenas
CREATE TABLE condenas (
	id INT NOT NULL AUTO_INCREMENT,
  ciudadano_dni INTEGER NOT NULL,
  condena INT NOT NULL,
  motivo VARCHAR(255) NOT NULL,
  id_exp_judicial INTEGER NOT NULL,
  PRIMARY KEY ( id ),
  INDEX condenas_ciudadanos_idx ( ciudadano_dni ASC) VISIBLE,
  CONSTRAINT condenas_ciudadanos
	  FOREIGN KEY ( ciudadano_dni )
	  REFERENCES ciudadanos ( dni )
	  ON DELETE CASCADE
	  ON UPDATE RESTRICT
);

En este ultimo CREATE el campo id_exp_judicial queda en el aire por que no tenemos una base de datos del poder judicial, pero deberia ser una FOREIGN KEY o por lo menos setearse manualmente.

-- Creacion de denuncias
CREATE TABLE denuncias (
	id INT NOT NULL,
  ciudadano_dni INT NOT NULL,
  denuncia TEXT NOT NULL,
  PRIMARY KEY ( id ),
  INDEX denuncias_ciudadanos_idx ( ciudadano_dni ASC) VISIBLE,
  CONSTRAINT denuncias_ciudadanos
	  FOREIGN KEY ( ciudadano_dni )
	  REFERENCES ciudadanos ( dni )
	  ON DELETE CASCADE
	  ON UPDATE RESTRICT
);
`

const filters_button = document.getElementById('apply-filters-button');
const title_filtersElement = document.querySelector('input#filter-titles');
const hashtag_filtersElement = document.querySelector('input#filter-hashtags');

const clipboard_button = document.getElementById('output-to-clipboard');

button.addEventListener('click', main);

filters_button.addEventListener('click', applyFilters)

function applyFilters (e){
  const title_filters = title_filtersElement.value.split(",");
  const hashtag_filters = hashtag_filtersElement.value.split(",");

  for(const filter of hashtag_filters){
    hashtagFilter.push(filter.length);
  }

  for(const filter of title_filters){
    contentFilter.push(filter);
  }
}

function main(e){
  const text = input.value;

  const regex = /#+? .+/g;
  if(!regex.test(text)) return;

  const titles = text.match(regex);

  const titlesIndexables = titles.filter(title => !title.startsWith('# '));

  let index = ``;
  let numOfTabs = 0;
  let numOfHashtags = 2; /* don't change */

  for (const title of titlesIndexables) {
    const st = title.split(' ');
    const currentNumOfHashtags = st[0].length;
    const currentTitleName = st.slice(1).join(' ');

    if(hashtagFilter.includes(currentNumOfHashtags)) continue;
    if(contentFilter.includes(currentTitleName)) continue;


    if(currentNumOfHashtags > numOfHashtags){
      numOfTabs++
    }else if(currentNumOfHashtags === numOfHashtags - 1){
      numOfTabs--
    }else if(currentNumOfHashtags != numOfHashtags){
      numOfTabs = currentNumOfHashtags - 2;
    }

    numOfHashtags = currentNumOfHashtags;

    const str = st.join(' ').slice(currentNumOfHashtags+1); /* slice(currentNumOfHashtags+1) remove the '#(...) ' */
    let id = str.toLowerCase().replaceAll(/[^\w\s-áéúíóÑñ]/g,"").split(" ").join("-");
    if(index.includes(`(#${id})`)){
      let finalNumber = index.match(new RegExp(`(#${id})`)).length.toString() - 1;
      id = `${id}-${finalNumber}`;
    }
    index = index + `${`  `.repeat(numOfTabs)}* [${str}](#${id})\n`;
  }
  
  output.value = index;
}

clipboard_button.addEventListener('click', outputToClipboard);

function outputToClipboard(e){
  navigator.clipboard.writeText(output.value);
  const output_area = document.getElementById('output-area');
  const notification = document.createElement('div');
  notification.innerText = 'Copiado al portapapeles';
  notification.classList.add('notification');
  notification.id = 'notification'
  output_area.appendChild(notification);
  setTimeout(() => {
    output_area.removeChild(document.getElementById('notification'));
  },2000);
}