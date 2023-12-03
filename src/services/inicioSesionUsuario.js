// import api from '@/services/api.js'

export default function (rut, password) {
  // FIXME: Descomentar las lineas cuando la API sea Funcional
  // const credenciales = {
  //   usuario: rut,
  //   password: password
  // }

  // return api().post('/api/Usuario/Login', credenciales).data

  if (rut === '19033183-0' && password === '123') {
    const TESTDATA = {
      login: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJWaWN0b3IiLCJhcGVsbGlkb1BhdGVybm8iOiJHdXptYW4iLCJhcGVsbGlkb01hdGVybm8iOiJDb250cmVyYXMiLCJydW4iOiIxOTAzMzE4My0wIiwiZW1haWwiOiJ2Z3V6bWFuY0BtZWRzb2Z0LmNsIiwidWlkIjoiNjBhNGQxMjQtM2VkOC00YmNjLTg5ZTUtZGVhOTJlODk2ZmQwIiwicGVybWlzb3MiOlswXSwianRpIjoiNjBhNGQxMjQtM2VkOC00YmNjLTg5ZTUtZGVhOTJlODk2ZmQwIiwiZXhwIjoxNzAxNjI3MTc2LCJpc3MiOiIqIiwiYXVkIjoiKiJ9.m1PEqYw-eVhshNpwQ9aIe13kb5751sqlcuXt8_tfDzQ'
    }

    return TESTDATA
  } else {
    const TESTDATA = {
      login: false,
      token: ''
    }

    return TESTDATA
  }
}
