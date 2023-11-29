# his-frontend

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
 name: 'Dermatologo',
 start: new Date('2023-11-13T19:00:00'),
 end: new Date('2023-11-13T19:15:00'),
 color: 'blue',
 timed: true,
 profesionalSalud: {
  nombre: 'Juan Perez',
  especialidad: 'Dermatologo',
  rut: '12.345.678-9'
    },
 responsable: {
  nombre: 'Juan Perez',
  rut: '12.345.678-9'
 },
 fechaCreacion: new Date('2023-11-13T19:00:00'),
 duracion: 15,
 estado: 'Disponible'
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
