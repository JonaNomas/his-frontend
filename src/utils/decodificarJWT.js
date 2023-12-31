/**
 *
 * @param {String} token Token JWT de tres partes separadas por un punto
 * @returns {{}} Información decodificada del token
 */
export default function (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jwtInformacionDecodificada = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jwtInformacionDecodificada)
}
