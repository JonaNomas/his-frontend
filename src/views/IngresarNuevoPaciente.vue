<template>
  <div>
    <h1>Ingresar Nuevo Paciente</h1>

    <v-subheader>Datos Generales</v-subheader>
    <v-row>
      <v-col>
        <v-text-field
          dense
          label="RUN"
          prepend-inner-icon="mdi-barcode"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          dense
          label="Sexo"
          prepend-inner-icon="mdi-account"
          outlined
          hide-details
          :items="selectSexos"
        ></v-autocomplete>
      </v-col>
    </v-row>

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
        <v-autocomplete
          dense
          label="Region"
          prepend-inner-icon="mdi-map-marker"
          outlined
          hide-details
          :items="selectRegiones"
        ></v-autocomplete>
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

    <v-row>
      <v-col>
        <v-autocomplete
          dense
          label="Estado Civil"
          prepend-inner-icon="mdi-ballot-outline"
          outlined
          hide-details
          :items="selectEstadosCiviles"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-subheader class="mt-5">Datos de Salud</v-subheader>
    <v-row>
      <v-col>
        <v-autocomplete
          dense
          label="Prevision"
          prepend-inner-icon="mdi-hospital-box"
          outlined
          hide-details
          :items="selectPrevisiones"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          dense
          label="Grupo Sanguineo"
          prepend-inner-icon="mdi-blood-bag"
          outlined
          hide-details
          :items="selectGruposSanguineos"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          dense
          label="Donador de Organos"
          prepend-inner-icon="mdi-handshake"
          outlined
          hide-details
          :items="selectDonadoresOrganos"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-subheader class="mt-5">Contacto de Emergencia</v-subheader>
    <v-row>
      <v-col>
        <v-text-field
          dense
          label="Nombre Contacto Emergencia"
          prepend-inner-icon="mdi-account-supervisor-circle"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-autocomplete
          dense
          label="Parentesco Contacto Emergencia"
          prepend-inner-icon="mdi-account"
          outlined
          hide-details
          :items="selectParentescos"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Telefono Contacto Emergencia"
          prepend-inner-icon="mdi-phone"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-5">
      <v-col>
        <v-btn block color="success"><v-icon left>mdi-account-plus-outline</v-icon>Crear nuevo paciente</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IngresarNuevoPaciente',
  data () {
    return {
      // Datos select
      selectSexos: [
        'Masculino',
        'Femenino'
      ],
      selectEstadosCiviles: [
        'Soltero',
        'Casado',
        'Viudo',
        'Divorciado'
      ],
      selectGruposSanguineos: [
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-'
      ],
      selectDonadoresOrganos: [
        'Si',
        'No'
      ],
      selectPrevisiones: [
        'Fonasa',
        'Isapre',
        'Particular'
      ],
      selectRegiones: [
        'Arica y Parinacota',
        'Tarapacá',
        'Antofagasta',
        'Atacama',
        'Coquimbo',
        'Valparaíso',
        'Metropolitana de Santiago',
        'Libertador General Bernardo O\'Higgins',
        'Maule',
        'Ñuble',
        'Biobío',
        'La Araucanía',
        'Los Ríos',
        'Los Lagos',
        'Aysén del General Carlos Ibáñez del Campo',
        'Magallanes y de la Antártica Chilena'
      ],
      selectParentescos: [
        'Padre',
        'Madre',
        'Hermano',
        'Hermana',
        'Tio',
        'Tia',
        'Abuelo',
        'Abuela',
        'Primo',
        'Prima',
        'Amigo',
        'Amiga',
        'Otro'
      ]

    }
  }
}
</script>
