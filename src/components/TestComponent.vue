<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <h1>{{ test }}</h1>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
    name: 'TestComponent',

    data: () => ({
        test: "Probando el componente."
    }),
}
</script>
  