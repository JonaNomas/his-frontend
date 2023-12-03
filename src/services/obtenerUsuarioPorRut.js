import api from '@/services/api'

export default function () {
  return api().get('/users/1')
}
