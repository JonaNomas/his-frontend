<template>
  <span :class="`triage-info C${categoria}`">{{ "C" + categoria }}</span>
</template>
<script>
export default {
  name: 'TriageCategorizacionEtiqueta',
  props: {
    categoria: {
      required: true
    }
  }
}
</script>

<style scoped>
.triage-info {
  background-color: var(--v-primary-base);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
}

.triage-info.C1 {
  background-color: var(--v-error-base);
}

.triage-info.C2 {
  background-color: var(--v-error-base);
}

.triage-info.C3 {
  background-color: var(--v-warning-base);
}

.triage-info.C4 {
  background-color: var(--v-success-base);
}

.triage-info.C5 {
  background-color: var(--v-success-base);
}
</style>
