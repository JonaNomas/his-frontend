<template>
  <div>
    <h1>Ingresar Nuevo Paciente</h1>

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
        <v-autocomplete dense label="Estado Civil" v-model="estadoCivil" prepend-inner-icon="mdi-ballot-outline" outlined
          hide-details :items="selectEstadosCiviles"></v-autocomplete>
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
        <v-autocomplete dense v-model="grupoSanguineo" label="Grupo Sanguineo" prepend-inner-icon="mdi-blood-bag" outlined
          hide-details :items="selectGruposSanguineos"></v-autocomplete>
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
        <v-btn block :loading="enviandoFormulario" :disabled="enviandoFormulario" @click="agregarNuevoPaciente"
          color="success"><v-icon left>mdi-account-plus-outline</v-icon>Crear nuevo paciente</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ingresarNuevoPaciente from '@/services/ingresarNuevoPaciente'
import obtenerUsuarioPorRut from '@/services/obtenerUsuarioPorRut'

export default {
  name: 'IngresarNuevoPaciente',
  data () {
    return {
      rut: '16542345-6',
      primerNombre: 'Juan',
      segundoNombre: 'Roberto',
      apellidoPaterno: 'Farias',
      apellidoMaterno: 'Lopez',
      fechaNacimiento: new Date().toISOString().substr(0, 10),
      telefono: '92143287',
      direccion: 'Av Bulnes 0256',
      region: 'Magallanes y de la Antártica Chilena',
      comuna: 'Punta Arenas',
      estadoCivil: 'Soltero',
      nombreSocial: 'El',
      prevision: 'Fonasa',
      grupoSanguineo: 'A+',
      donadorOrganos: 'No',
      nombreContactoEmergencia: 'Brisa Cecilia Contreras Ramirez',
      parentescoContactoEmergencia: 'Madre',
      telefonoContactoEmergencia: '93254789',
      sexo: 'Masculino',
      correo: 'vguzmanc@correo.cl',
      // Cargando
      enviandoFormulario: false,
      // Fecha
      menuFechaNacimiento: false,
      // Alerta Error
      alertaErrorModel: false,
      mensajeError: '',
      alertaSuccessModel: false,
      mensajeSuccess: '',
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
    async agregarNuevoPaciente () {
      this.enviandoFormulario = true
      this.alertaErrorModel = false
      this.alertaSuccessModel = false
      const usuarioEncontrado = await obtenerUsuarioPorRut(this.rut)
      if (usuarioEncontrado.data !== '') {
        this.enviandoFormulario = false
        this.alertaErrorModel = true
        this.mensajeError = 'El paciente ya se encuentra registrado en el sistema.'
        return
      }
      const nuevoPaciente = {
        rut: this.rut,
        nombrePrimer: this.primerNombre,
        nombreSegundo: this.segundoNombre,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        fechaNacimiento: this.fechaNacimiento,
        telefono: this.telefono,
        direccion: `${this.direccion}, ${this.comuna}, ${this.region}`,
        correo: this.correo,
        contactoEmergencia: this.nombreContactoEmergencia,
        idParentesco: 2,
        telefonoEmergencia: this.telefonoContactoEmergencia,
        grupoSanguineo: this.grupoSanguineo,
        donador: false,
        prevision: this.prevision,
        estadoCivil: this.estadoCivil,
        sexo: 'M',
        nombreSocial: this.nombreSocial,
        estadoSalud: 0,
        fechaDefuncion: null
      }
      ingresarNuevoPaciente(nuevoPaciente).then((response) => {
        this.enviandoFormulario = false
        if (response.status === 200) {
          this.alertaSuccessModel = true
          this.mensajeSuccess = 'Paciente ingresado correctamente.'
          this.limpiarCampos()
        } else {
          this.alertaErrorModel = true
          this.mensajeError = 'Error al ingresar paciente.'
        }
      }).catch(() => {
        this.enviandoFormulario = false
        this.alertaErrorModel = true
        this.mensajeError = 'Error al ingresar paciente.'
      })
    },
    limpiarCampos () {
      this.rut = ''
      this.primerNombre = ''
      this.segundoNombre = ''
      this.apellidoPaterno = ''
      this.apellidoMaterno = ''
      this.fechaNacimiento = new Date().toISOString().substr(0, 10)
      this.telefono = ''
      this.direccion = ''
      this.region = ''
      this.comuna = ''
      this.estadoCivil = ''
      this.nombreSocial = ''
      this.prevision = ''
      this.grupoSanguineo = ''
      this.donadorOrganos = ''
      this.nombreContactoEmergencia = ''
      this.parentescoContactoEmergencia = ''
      this.telefonoContactoEmergencia = ''
      this.sexo = ''
      this.correo = ''
    }
  }
}
</script>
@/services/paciente/ingresarNuevoPaciente