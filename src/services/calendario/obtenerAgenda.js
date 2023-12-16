import api from '@/services/api'

export default async function (tipoAtencion, especialidad, profesional, estadoHora, ano, mes) {
  try {
    const respuestaAPI = await api().post('/api/Agenda/obtenerAgenda', {
      tipoAtencion: 'TODOS',
      especialidad: 'TODOS',
      profesional: 'TODOS',
      estadoHora: 'TODOS',
      ano: 2023,
      mes: 1
    })
    return respuestaAPI.data
  } catch (error) {
    throw new Error('Error al obtener la agenda desde la API: ' + error.message)
  }
}
