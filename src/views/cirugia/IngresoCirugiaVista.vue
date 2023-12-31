<template>
  <div>
    <h1 class="mb-5">Ingreso Centro Quirúrgico</h1>
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

    <v-row class="d-flex justify-center" v-if="seEncontroPaciente">
      <v-col sm="12" lg="8">
        <div class="contenerdorTabla">
          <h2>Datos de Salud</h2>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="negrita">Run</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.run }}</td>
                </tr>
                <tr>
                  <td class="negrita">Nombre Completo</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado.nombrePrimer + ' ' + pacienteEncontrado.nombreSegundo + ' ' +
                    pacienteEncontrado.apellidoPaterno + ' ' + pacienteEncontrado.apellidoMaterno }}</td>
                </tr>
                <tr>
                  <td class="negrita">Previsión</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.prevision ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Sexo</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.sexo ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Fecha de Nacimiento</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.fechaNacimiento ? fechaDDMMAAAA(pacienteEncontrado.fechaNacimiento) : 'No Registra' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>

    <div v-if="seEncontroPaciente">
      <v-row>
        <v-col>
          <h2>Motivo ingreso al Centro Quirúrgico</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete dense label="Tipo Operación" v-model="selectTipoOperacion" prepend-inner-icon="mdi-account"
            outlined hide-details :items="listadoOperacionesDisponibles"></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete dense label="Asignar Pabellon Disponible" v-model="selectPabellonDisponible" prepend-inner-icon="mdi-account"
            outlined hide-details :items="pabellonesDisponibles"></v-autocomplete>
        </v-col>
      </v-row>

      <v-alert text v-model="alertaErrorModel2" outlined dismissible type="error" class="mt-5">
        {{ mensajeError2 }}
      </v-alert>

      <v-alert text v-model="alertaSuccessModel" outlined dismissible type="success" class="mt-5">
        {{ mensajeSuccess }}
      </v-alert>

      <v-row>
        <v-col>
          <v-btn dense block color="accent" @click="ingresarPacienteUrgencia" :disabled="btnIngresandoPacienteCargando" :loading="btnIngresandoPacienteCargando"><v-icon left>mdi-account-plus</v-icon>Ingresar Paciente</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'

export default {
  name: 'IngresoCirugiaVista',
  data () {
    return {
      alertaErrorModel2: false,
      mensajeError2: '',

      alertaSuccessModel: false,
      mensajeSuccess: '',

      buscarRun: '',
      alertaErrorModel: false,
      mensajeError: '',
      formularioBuscarModel: false,
      btnBuscarCargando: false,
      btnIngresandoPacienteCargando: false,
      pacienteEncontrado: {},
      seEncontroPaciente: false,

      selectQueOcurre: [],
      selectQueOcurreModel: '',
      selectLugarAfectado: [],
      selectLugarAfectadoModel: '',
      txtaDescripcionMotivoConsulta: '',
      // Forumulario
      selectPabellonDisponible: '',
      pabellonesDisponibles: [
        'Pabellon 1', 'Pabellon 2', 'Pabellon 4', 'Recuperación'
      ],
      selectTipoOperacion: '',
      listadoOperacionesDisponibles: [
        'Apendicectomía',
        'Colecistectomía',
        'Hernioplastia',
        'Facoemulsificación',
        'Artroscopia de rodilla',
        'Artroplastia de cadera',
        'Bypass coronario',
        'Implante de marcapasos',
        'Tiroidectomía',
        'Colectomía',
        'Mastectomía',
        'Cesárea',
        'Cirugía de columna vertebral (por ejemplo, laminectomía)',
        'Cirugía de aneurisma cerebral',
        'Cirugía de próstata (prostatectomía)',
        'Cirugía de oído (por ejemplo, estapedectomía)',
        'Cirugía de bypass gástrico (bariátrica)',
        'Cirugía de reconstrucción facial',
        'Cirugía de trasplante de órganos',
        'Cirugía de corrección de deformidades congénitas',
        'Cirugía de reemplazo de articulaciones (por ejemplo, rodilla o cadera)',
        'Cirugía de tumor cerebral (craneotomía)'
      ]
    }
  },
  methods: {
    fechaDDMMAAAA,
    async buscarPacientePorRut () {
      this.btnBuscarCargando = true
      this.alertaErrorModel = false
      const usuarioEncontrado = await obtenerPacientePorRut(this.buscarRun)
      if (usuarioEncontrado !== '') {
        this.pacienteEncontrado = usuarioEncontrado
        this.seEncontroPaciente = true
      } else {
        this.seEncontroPaciente = false
        this.mensajeError = 'No se encontró un paciente con el RUN ingresado.'
        this.alertaErrorModel = true
      }
      this.btnBuscarCargando = false
    },
    obtenerSelectQueOcurre () {
      this.selectQueOcurre = [
        'Dolor',
        'Molestia',
        'Fractura',
        'Perdida Extremidad',
        'Quemadura',
        'Corte',
        'Hemorragia',
        'Perdida de Conocimiento'
      ]
    },
    obtenerSelectLugarAfectado () {
      this.selectLugarAfectado = [
        'Cabeza',
        'Cuello',
        'Torax',
        'Abdomen',
        'Extremidades Superiores',
        'Extremidades Inferiores',
        'Espalda',
        'Otro'
      ]
    },
    ingresarPacienteUrgencia () {
      if (this.selectTipoOperacion === '') {
        this.mensajeError2 = 'Debe Seleccionar un Tipo de Cirugía.'
        this.alertaErrorModel2 = true
        return
      }
      if (this.selectPabellonDisponible === '') {
        this.mensajeError2 = 'Debe seleccionar un pabellon para asignar al paciente.'
        this.alertaErrorModel2 = true
        return
      }
      this.btnIngresandoPacienteCargando = true
      setTimeout(() => {
        this.btnIngresandoPacienteCargando = false
        this.alertaSuccessModel = true
        this.mensajeSuccess = 'Se ha ingresado correctamente el paciente.'
        this.txtaDescripcionMotivoConsulta = ''
      }, 1000)
    }
  },
  created () {
    this.obtenerSelectQueOcurre()
    this.obtenerSelectLugarAfectado()
  }
}
</script>

<style scoped>
.negrita {
  font-weight: bold;
}

.contenerdorTabla {
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 20px;
}
</style>
