<template>
  <div>
    <v-row>
      <v-col>
        <h1>Actualizar datos de paciente</h1>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col class="d-flex justify-center">
        <v-card max-width="500" width="500" elevation="3">
          <v-card-text>
            <v-form ref="form" v-model="formularioBuscarModel" @submit.prevent="buscarPacientePorRut" lazy-validation
              :disabled="btnBuscarCargando">
              <v-row>
                <v-col cols="10">
                  <v-text-field label="RUN" v-model="buscarRun" prepend-icon="mdi-account"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn type="submit" class="mt-3" block color="success" :loading="btnBuscarCargando"
                    :disabled="btnBuscarCargando">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-alert text v-model="alertaErrorModel" outlined dismissible type="error" class="mt-5">
              {{ mensajeError }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="seEncontroPaciente">
      <v-subheader>Datos Generales</v-subheader>
      <v-row>
        <v-col>
          <v-text-field dense v-model="rut" label="RUN" prepend-inner-icon="mdi-barcode" outlined
            hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-autocomplete dense label="Sexo" v-model="sexo" prepend-inner-icon="mdi-account" outlined hide-details
            :items="selectSexos"></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field dense label="Primer Nombre" v-model="primerNombre" prepend-inner-icon="mdi-account-box" outlined
            hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-text-field dense label="Segundo Nombre" v-model="segundoNombre" prepend-inner-icon="mdi-account-box" outlined
            hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field dense label="Apellido Paterno" v-model="apellidoPaterno" prepend-inner-icon="mdi-account-box"
            outlined hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-text-field dense label="Apellido Materno" v-model="apellidoMaterno" prepend-inner-icon="mdi-account-box"
            outlined hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-menu v-model="menuFechaNacimiento" :close-on-content-click="false" :nudge-right="40"
            transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field dense v-model="fechaNacimiento" label="Fecha Nacimiento" outlined hide-details
                prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="fechaNacimiento" @input="menuFechaNacimiento = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-text-field type="number" dense label="Telefono" v-model="telefono" prepend-inner-icon="mdi-phone" outlined
            hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-text-field dense v-model="correo" label="Correo Electronico" prepend-inner-icon="mdi-email" outlined
            hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field dense label="Direccion" v-model="direccion" prepend-inner-icon="mdi-map-marker" outlined
            hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-autocomplete dense label="Region" v-model="region" prepend-inner-icon="mdi-map-marker" outlined hide-details
            :items="selectRegiones"></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field dense label="Comuna" v-model="comuna" prepend-inner-icon="mdi-map-marker" outlined
            hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete dense label="Estado Civil" v-model="estadoCivil" prepend-inner-icon="mdi-ballot-outline"
            outlined hide-details :items="selectEstadosCiviles"></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete dense label="Nombre Social" v-model="nombreSocial" prepend-inner-icon="mdi-bullhorn" outlined
            hide-details :items="selectNombreSocial"></v-autocomplete>
        </v-col>
      </v-row>

      <v-subheader class="mt-5">Datos de Salud</v-subheader>
      <v-row>
        <v-col>
          <v-autocomplete dense v-model="prevision" label="Prevision" prepend-inner-icon="mdi-hospital-box" outlined
            hide-details :items="selectPrevisiones"></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete dense v-model="grupoSanguineo" label="Grupo Sanguineo" prepend-inner-icon="mdi-blood-bag"
            outlined hide-details :items="selectGruposSanguineos"></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete dense v-model="donadorOrganos" label="Donador de Organos" prepend-inner-icon="mdi-handshake"
            outlined hide-details :items="selectDonadoresOrganos"></v-autocomplete>
        </v-col>
      </v-row>

      <v-subheader class="mt-5">Contacto de Emergencia</v-subheader>
      <v-row>
        <v-col>
          <v-text-field dense v-model="nombreContactoEmergencia" label="Nombre Contacto Emergencia"
            prepend-inner-icon="mdi-account-supervisor-circle" outlined hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete dense v-model="parentescoContactoEmergencia" label="Parentesco Contacto Emergencia"
            prepend-inner-icon="mdi-account" outlined hide-details :items="selectParentescos"></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field type="number" dense v-model="telefonoContactoEmergencia" label="Telefono Contacto Emergencia"
            prepend-inner-icon="mdi-phone" outlined hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-alert text v-model="alertaErrorModel" outlined dismissible type="error" class="mt-5">
        {{ mensajeError }}
      </v-alert>
      <v-alert text v-model="alertaSuccessModel" outlined dismissible type="success" class="mt-5">
        {{ mensajeSuccess }}
      </v-alert>

      <v-row class="mt-3">
        <v-col>
          <v-btn block :loading="enviandoFormulario" :disabled="enviandoFormulario" @click="actualizarDatosPaciente"
            color="success"><v-icon left>mdi-account-plus-outline</v-icon>Crear nuevo paciente</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'

export default {
  name: 'ActualizarPacienteVista',
  data () {
    return {
      rut: '',
      primerNombre: '',
      segundoNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaNacimiento: '',
      telefono: '',
      direccion: '',
      region: '',
      comuna: '',
      estadoCivil: '',
      nombreSocial: '',
      prevision: '',
      grupoSanguineo: '',
      donadorOrganos: '',
      nombreContactoEmergencia: '',
      parentescoContactoEmergencia: '',
      telefonoContactoEmergencia: '',
      sexo: '',
      correo: '',
      // Mensajes
      alertaErrorModel: false,
      mensajeError: '',
      alertaErrorModel2: false,
      mensajeError2: '',
      alertaSuccessModel: false,
      mensajeSuccess: '',
      // Cargando
      btnGuardandoExamenCargando: false,
      enviandoFormulario: false,
      // Formulario buscar por RUT
      formularioBuscarModel: true,
      btnBuscarCargando: false,
      // Datos
      buscarRun: '',
      pacienteEncontrado: {},
      seEncontroPaciente: false,
      menuFechaNacimiento: false,
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
      ],
      selectNombreSocial: [
        'El',
        'Ella',
        'Elle'
      ]
    }
  },
  methods: {
    buscarPacientePorRut () {
      this.btnBuscarCargando = true
      this.alertaErrorModel = false
      this.seEncontroPaciente = false
      obtenerPacientePorRut(this.buscarRun)
        .then((response) => {
          if (response === '') {
            this.mensajeError = 'No se encontró un paciente con el RUN ingresado.'
            this.alertaErrorModel = true
            this.btnBuscarCargando = false
            this.seEncontroPaciente = false
            return
          }
          this.seEncontroPaciente = true
          this.pacienteEncontrado = response
          this.btnBuscarCargando = false
          console.log(this.pacienteEncontrado)
          this.llenarCamposPaciente()
        })
        .catch(() => {
          this.btnBuscarCargando = false
          this.seEncontroPaciente = false
        })
    },
    llenarCamposPaciente () {
      this.rut = this.pacienteEncontrado.run
      this.primerNombre = this.pacienteEncontrado.nombrePrimer
      this.segundoNombre = this.pacienteEncontrado.nombreSegundo
      this.apellidoPaterno = this.pacienteEncontrado.apellidoPaterno
      this.apellidoMaterno = this.pacienteEncontrado.apellidoMaterno
      this.fechaNacimiento = this.pacienteEncontrado.fechaNacimiento
      this.telefono = this.pacienteEncontrado.telefono
      this.direccion = ''
      this.region = ''
      this.comuna = ''
      this.estadoCivil = this.pacienteEncontrado.estadoCivil
      this.nombreSocial = this.pacienteEncontrado.nombreSocial
      this.prevision = this.pacienteEncontrado.prevision
      this.grupoSanguineo = this.pacienteEncontrado.grupoSanguineo
      this.donadorOrganos = this.pacienteEncontrado.donador ? 'Si' : 'No'
      this.nombreContactoEmergencia = this.pacienteEncontrado.contactoEmergencia
      this.parentescoContactoEmergencia = this.pacienteEncontrado
      this.telefonoContactoEmergencia = 'Madre'
      this.sexo = this.pacienteEncontrado.sexo ? 'Masculino' : 'Femenino'
      this.correo = this.pacienteEncontrado.correo
    },
    actualizarDatosPaciente () {
      //
    }
  },
  mounted () {
  },
  components: {
  }
}
</script>
