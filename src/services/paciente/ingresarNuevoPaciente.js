import api from '@/services/api'

/**
 * Crea un nuevo paciente mediante una solicitud POST a la API.
 *
 * @param {Object} nuevoPaciente - Objeto con los datos del paciente.
 * @param {string} nuevoPaciente.rut - Rut del paciente.
 * @param {string} nuevoPaciente.nombrePrimer - Primer nombre del paciente.
 * @param {string} nuevoPaciente.nombreSegundo - Segundo nombre del paciente.
 * @param {string} nuevoPaciente.apellidoPaterno - Apellido paterno del paciente.
 * @param {string} nuevoPaciente.apellidoMaterno - Apellido materno del paciente.
 * @param {string} nuevoPaciente.fechaNacimiento - Fecha de nacimiento del paciente (en formato ISO).
 * @param {string} nuevoPaciente.telefono - Número de teléfono del paciente.
 * @param {string} nuevoPaciente.direccion - Dirección del paciente.
 * @param {string} nuevoPaciente.correo - Correo electrónico del paciente.
 * @param {string} nuevoPaciente.contactoEmergencia - Contacto de emergencia del paciente.
 * @param {number} nuevoPaciente.idParentesco - ID del parentesco del paciente.
 * @param {string} nuevoPaciente.telefonoEmergencia - Número de teléfono de emergencia del paciente.
 * @param {string} nuevoPaciente.grupoSanguineo - Grupo sanguíneo del paciente.
 * @param {boolean} nuevoPaciente.donador - Indica si el paciente es donador de órganos.
 * @param {string} nuevoPaciente.prevision - Previsión de salud del paciente.
 * @param {string} nuevoPaciente.estadoCivil - Estado civil del paciente.
 * @param {string} nuevoPaciente.sexo - Género del paciente (M o F).
 * @param {string} nuevoPaciente.nombreSocial - Nombre social del paciente.
 * @param {number} nuevoPaciente.estadoSalud - Estado de salud del paciente.
 * @param {string} nuevoPaciente.fechaDefuncion - Fecha de defunción del paciente (en formato ISO).
 *
 * @returns {Promise} - Promesa que resuelve a la respuesta de la API.
 */

export default function (nuevoPaciente) {
  return api().post('api/Paciente/crearPaciente', {
    ...nuevoPaciente
  })
}

/*
VALORES A ENVIAR EN EL OBJETO nuevoPaciente
{
  "rut": "string",
  "nombrePrimer": "string",
  "nombreSegundo": "string",
  "apellidoPaterno": "string",
  "apellidoMaterno": "string",
  "fechaNacimiento": "2023-12-08T19:42:44.806Z",
  "telefono": "string",
  "direccion": "string",
  "correo": "string",
  "contactoEmergencia": "string",
  "idParentesco": 0,
  "telefonoEmergencia": "string",
  "grupoSanguineo": "string",
  "donador": true,
  "prevision": "string",
  "estadoCivil": "string",
  "sexo": "string",
  "nombreSocial": "string",
  "estadoSalud": 0,
  "fechaDefuncion": "2023-12-08T19:42:44.806Z"
}
*/
