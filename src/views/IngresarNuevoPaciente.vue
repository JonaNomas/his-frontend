<template>
  <div>
    <h1 class="mb-5">Ingresar Nuevo Paciente</h1>

    <v-subheader>Datos Generales</v-subheader>
    <v-row>
      <v-col>
        <v-text-field
          dense
          label="Primer Nombre"
          prepend-inner-icon="mdi-account-box"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Segundo Nombre"
          prepend-inner-icon="mdi-account-box"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          dense
          label="Apellido Paterno"
          prepend-inner-icon="mdi-account-box"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Apellido Materno"
          prepend-inner-icon="mdi-account-box"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          dense
          label="Fecha de Nacimiento"
          prepend-inner-icon="mdi-calendar-month"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Telefono"
          prepend-inner-icon="mdi-phone"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Correo Electronico"
          prepend-inner-icon="mdi-email"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          dense
          label="Direccion"
          prepend-inner-icon="mdi-map-marker"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Region"
          prepend-inner-icon="mdi-map-marker"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Comuna"
          prepend-inner-icon="mdi-map-marker"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
