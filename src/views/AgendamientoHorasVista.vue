
<template>
  <div>
    <h1>Agendamiento Horas Medicas</h1>
    <CalendarioHoras />
  </div>
</template>
<script>

import CalendarioHoras from '@/components/CalendarioHoras.vue'
export default {
  name: 'AgendamientoHorasVista',
  data () {
    return {
      //
    }
  },
  components: {
    CalendarioHoras
  }
}
</script>
