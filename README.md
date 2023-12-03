# his-frontend

[TOC]

## Git Commits

Sugerencia de nuevos commits:

- **add**: Una nueva característica.
- **change**: Cambio en alguna característica.
- **fix**: Arregla un bug que afecta al usuario.
- **perf**: Cambios que mejoran el rendimiento del sitio.
- **build**: Cambios en el sistema de build, tareas de despliegue o instalación.
- **ci**: Cambios en la integración continua.
- **docs**: Cambios en la documentación.
- **refactor**: Refactorización del código como cambios de nombre de variables o funciones.
- **style**: Cambios de formato, tabulaciones, espacios o puntos y coma, etc; no afectan al usuario.
- **test**: Añade tests o refactoriza uno existente.

Ejemplo:

```bash
add: barra de busqueda
```

## Proyecto

### Asignación de horas

#### Formato JSON para una hora

```javascript
{
 name: "Dermatologo",
 start: new Date("2023-11-13T19:00:00"),
 end: new Date("2023-11-13T19:15:00"),
 color: "blue",
 timed: true,
 profesionalSalud: {
  nombre: "Juan Perez",
  especialidad: "Dermatologo",
  rut: "12.345.678-9"
    },
 responsable: {
  nombre: "Juan Perez",
  rut: "12.345.678-9"
 },
 fechaCreacion: new Date("2023-11-13T19:00:00"),
 duracion: 15,
 estado: "Disponible"
}
```

Estructurara de datos que se deben recibir del backend

```javascript
{
 name:String,
 start:DateTime,
 profesionalSalud: {
  nombre:String,
  especialidad:String,
  rut:String
    },
 responsable: {
  nombre:String,
  rut:String
 },
 fechaCreacion:DateTime,
 duracion:INT,
 estado:String
}
```

### Inicio de Sesión

#### Solicitud a API

URL

```url
https://api.medsoft.cl/api/Usuario/Login
```

Metodo

```bash
POST
```

Data

```javascript
{
  "rut":String,
  "password":String
}
```

#### Formato respuesta solicitud API

1.- En caso de que las credenciales propocionadas sean **correctas**

```javascript
{
 "login": true,
 "token": "-- TOKEN --"
}
```

2.- En caso de que las credenciales proporcionales sean **incorrectas**

```javascript
{
 "login": false,
 "token": ""
}
```

##### Payload del TOKEN minimos

```javascript
{
 "nombre": "",
 "apellidoPaterno": "",
 "apellidoMaterno": "",
 "run": "",
 "email": "",
 "uid": "",
 "permisos": []
}
```

JWT

```javascript
{
  "nombre": "",
  "apellidoPaterno": "",
  "apellidoMaterno": "",
  "run": "",
  "email": "",
  "uid": "",
  "permisos": [],
  "jti": "60a4d124-3ed8-4bcc-89e5-dea92e896fd0",
  "exp": 1701627176,
  "iss": "*",
  "aud": "*"
}
//
{
  "nombre": "Victor",
  "apellidoPaterno": "Guzman",
  "apellidoMaterno": "Contreras",
  "run": "19033183-0",
  "email": "vguzmanc@medsoft.cl",
  "uid": "60a4d124-3ed8-4bcc-89e5-dea92e896fd0",
  "permisos": [0],
  "jti": "60a4d124-3ed8-4bcc-89e5-dea92e896fd0",
  "exp": 1701627176,
  "iss": "*",
  "aud": "*"
}
```

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJWaWN0b3IiLCJhcGVsbGlkb1BhdGVybm8iOiJHdXptYW4iLCJhcGVsbGlkb01hdGVybm8iOiJDb250cmVyYXMiLCJydW4iOiIxOTAzMzE4My0wIiwiZW1haWwiOiJ2Z3V6bWFuY0BtZWRzb2Z0LmNsIiwidWlkIjoiNjBhNGQxMjQtM2VkOC00YmNjLTg5ZTUtZGVhOTJlODk2ZmQwIiwicGVybWlzb3MiOlswXSwianRpIjoiNjBhNGQxMjQtM2VkOC00YmNjLTg5ZTUtZGVhOTJlODk2ZmQwIiwiZXhwIjoxNzAxNjI3MTc2LCJpc3MiOiIqIiwiYXVkIjoiKiJ9.m1PEqYw-eVhshNpwQ9aIe13kb5751sqlcuXt8_tfDzQ
```
