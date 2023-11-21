
<template>
  <div>
    <h1 class="mb-3">Agendamiento Horas Medicas</h1>
    <CalendarioHoras v-if="true" />
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
