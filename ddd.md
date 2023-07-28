# estructura recomendada para ddd

## comunicacion entre capas

Manejaremos 3 capas: infrastructure (1), application (2), y domain (3).

Cada capa solo puede comunicarse con elementos de la misma capa o de una capa inferior.
Por lo tanto, la capa 1 solo puede comunicarse con elementos de la misma capa 1,
o con elementos de la capa 2, de igual manera la 2 con la 3, y por lo tanto la capa 3
solo puede conectarse con elementos de su misma capa.


## en nodejs - estructura de carpetas:

- src
  - user
    - infrastructure:1
      - controllers
        en nuestro controlador vamos a manejar nuestra `application` con inyeccion de dependencias
      - routes
        rutas a nuestro controlador, de ser requeridas.
        por ejemplo se necesitan con express, pero no con nestjs.
      - models
        - schema
          conexion a nuestra fuente de datos. muy similar a entity o dto,
          pero para manejo de base de datos, redis, mock, etc.
      - db
        coneccion a base de datos
      - repository
        clases que implementan los `repository` de `domain`.
        para manejo de data, ya a nivel de almacenamiento (mongo, sql, redis, mock, etc)
        ejemplo: `MongoRepository` y `MockRepository` que implementen `UserRepository` (ver `domain`).
        Los repositorios pueden usar las conexiones a db requeridas.
    - application:2
      - use cases
        los casos de uso son clases con las acciones a realizar, con las especificacion que sean requeridas.
        ejemplo: supongamos que queremos registrar un usuario, implementemos `registerUser`, pero si
        posteriormente necesitamos que al registrarse tambien se envien notificaciones, creamos
        otro caso de uso, `registerUserAndNotify`.
        - el constructor recibirá `repository` por inyeccion de dependencia.
        - nuestros casos de uso deberían crear
    - domain:3
      - entity
        interface/estructura importante para el negocio, ejemplo: name, id(cedula, nit, uuid, etc), birthdate.
        solo la estructura realmente requerida
      - value/dto
        una clase que va a recibir y generar/mapear nuestra estructura de datos
        - posiblemente implemente entity
      - repository
        interface/estructura que nos indica los metodos que necesitaremos para obtener datos
        (find, create, update, delete, get list).
        ejemplo: `UserRepository`.



# Ejemplos de codigo de apoyo

## DTO decorator (se coloca antes de una funcion para autogenera una instancia de un DTO especificado)
```ts
function dto<T>(dtoClass: new (...args: any[]) => T) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const originalMethod = target[propertyKey];

    target[propertyKey] = function (...args: any[]) {
      const dtoInstance = new dtoClass(args[parameterIndex]);
      args[parameterIndex] = dtoInstance;
      return originalMethod.apply(this, args);
    };
  };
}
// ejemplo de uso
class UserUseCase {
  /**
   * La funcion recibe como primer parametro un objeto con X cantidad de datos,
   * el decorador se encarga de generar una instancia del DTO.
   */
  register(@dto(UserDto) user: UserDTO) {
    // ...
  }
}
```
