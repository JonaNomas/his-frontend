<template>
  <div>
    <h1 class="mb-5">Atención Medica</h1>
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
                  <td>{{ pacienteEncontrado?.fechaNacimiento ? fechaDDMMAAAA(pacienteEncontrado.fechaNacimiento) :
                    'NoRegistra' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>

    <div v-if="seEncontroPaciente">

      <!--ANTECEDENTE MORBIDO-->
      <div class="mt-5">
        <v-row>
          <v-col>
            <h3>Antecedentes Morbidos</h3>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="success" @click="dialogAtencionesEnfermeria = true">Registrar Nuevo</v-btn>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
              :headers="headersTablaAtencionesEnfermeria" :items="atencion.atencionEnfermeria" class="elevation-1">
              <template #[`item.actions`]="{ item }">
                <div>
                  <v-icon color="error" @click="eliminarAtencionesEnfermeria(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialogAtencionesEnfermeria" max-width="700">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title><v-icon left>mdi-plus</v-icon> Antecedente Morbido</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-5">
                <v-col>
                  <v-text-field type="text" dense label="Nuevo Antecedente Morbido" v-model="nuevoRegistroEnfermeria"
                    prepend-inner-icon="mdi-view-list" outlined hide-details></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn dense block color="success" @click="insertarNuevoRegistroEnfermeria">Agregar nuevo
                    registro</v-btn>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="dialogAtencionesEnfermeria = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEliminarAtencionesEnfermeria" max-width="700px">
          <v-card>
            <v-toolbar dense color="error" dark>
              <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-10">
              <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEliminarAtencionesEnfermeria = false">Cancelar</v-btn>
              <v-btn color="error darken-1" text @click="confirmarEliminarAtencionesEnfermeria">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!--ALERGIA-->
      <div class="mt-5">
        <v-row>
          <v-col>
            <h3>Alergias</h3>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="success" @click="dialogAtencionesEnfermeria2 = true">Registrar Nuevo</v-btn>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
              :headers="headersTablaAtencionesEnfermeria2" :items="atencion.alergias" class="elevation-1">
              <template #[`item.actions`]="{ item }">
                <div>
                  <v-icon color="error" @click="eliminarAtencionesEnfermeria2(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialogAtencionesEnfermeria2" max-width="700">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title><v-icon left>mdi-plus</v-icon> Alergia</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-5">
                <v-col>
                  <v-text-field type="text" dense label="Nueva Alergia" v-model="nuevoRegistroEnfermeria2"
                    prepend-inner-icon="mdi-view-list" outlined hide-details></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn dense block color="success" @click="insertarNuevoRegistroEnfermeria2">Agregar nuevo
                    registro</v-btn>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="dialogAtencionesEnfermeria2 = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEliminarAtencionesEnfermeria2" max-width="700px">
          <v-card>
            <v-toolbar dense color="error" dark>
              <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-10">
              <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEliminarAtencionesEnfermeria2 = false">Cancelar</v-btn>
              <v-btn color="error darken-1" text @click="confirmarEliminarAtencionesEnfermeria2">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!--Evaluacion-->
      <v-row>
        <v-col>
          <h3>Anamnesis Medica</h3>
        </v-col>
      </v-row>

      <div>
        <v-row>
          <v-col>
            <v-textarea dense label="Evaluación" v-model="txtaDescripcionMotivoConsulta" outlined
              hide-details></v-textarea>
          </v-col>
        </v-row>
      </div>

      <!--   Diagnostico   -->
      <div class="mt-5">
        <v-row>
          <v-col>
            <h2>Diagnóstico</h2>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogDiagnostico = true">Registrar
              Nuevo</v-btn>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaDiagnostico"
              :items="atencion.diagnostico" class="elevation-1">
              <template #[`item.actions`]="{ item }">
                <div>
                  <v-icon color="error" :disabled="!esMedicoElUsuario"
                    @click="eliminarDiagnostico(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialogDiagnostico" max-width="700">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title><v-icon left>mdi-plus</v-icon> Diagnóstico</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-5">
                <v-col>
                  <v-autocomplete dense label="Nuevo Diagnóstico" v-model="nuevoDiagnostico"
                    prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoDiagnosticos"
                    item-value="nombre" item-text="nombre"></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn dense block color="success" @click="insertarNuevoRegistroDiagnostico">Agregar nuevo
                    diagnostico</v-btn>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="dialogDiagnostico = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEliminarDiagnostico" max-width="700px">
          <v-card>
            <v-toolbar dense color="error" dark>
              <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-10">
              <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEliminarDiagnostico = false">Cancelar</v-btn>
              <v-btn color="error darken-1" text @click="confirmarEliminarDiagnostico">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!--   Indicaciones de Medicamentos   -->
      <div class="mt-5">
        <v-row>
          <v-col>
            <h2>Indicaciones de Medicamentos</h2>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogIndicacionesMedicamentos = true">Registrar
              Nuevo</v-btn>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
              :headers="headersTablaIndicacionesMedicamentos" :items="atencion.indicacionesMedicamentos"
              class="elevation-1">
              <template #[`item.actions`]="{ item }">
                <div>
                  <v-icon color="error" :disabled="!esMedicoElUsuario"
                    @click="eliminarIndicacionesMedicamentos(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialogIndicacionesMedicamentos" max-width="800">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title><v-icon left>mdi-plus</v-icon> Indicaciones Medicamentos</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-5">
                <v-col>
                  <v-autocomplete dense label="Medicamento" v-model="nuevoMedicamento" prepend-inner-icon="mdi-view-list"
                    outlined hide-details :items="listadoMedicamentos" item-value="nombre"
                    item-text="nombre"></v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field type="number" dense label="Dosis" v-model="nuevoDosis" prepend-inner-icon="mdi-view-list"
                    outlined hide-details min="0"></v-text-field>
                </v-col>
                <v-col>
                  <v-autocomplete dense label="Medicamento" v-model="nuevoConcentracion"
                    prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoConcentracion"
                    item-value="nombre" item-text="nombre"></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete dense label="Vía" v-model="nuevoVia" prepend-inner-icon="mdi-view-list" outlined
                    hide-details :items="listadoVias" item-value="nombre" item-text="nombre"></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn dense block color="success" @click="insertarNuevoRegistroMedicamentos">Agregar nuevo medicamento
                    a administrar</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="dialogIndicacionesMedicamentos = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEliminarIndicacionesMedicamentos" max-width="700px">
          <v-card>
            <v-toolbar dense color="error" dark>
              <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-10">
              <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEliminarIndicacionesMedicamentos = false">Cancelar</v-btn>
              <v-btn color="error darken-1" text @click="confirmarEliminarIndicacionesMedicamentos">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!--    Indicaciones Generales  -->
      <div>
        <v-row>
          <v-col>
            <h2>Indicaciones Generales</h2>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogIndicacionesGenerales = true">Registrar
              Nuevo</v-btn>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
              :headers="headersTablaIndicacionesGenerales" :items="atencion.indicacionesGenerales" class="elevation-1">
              <template #[`item.actions`]="{ item }">
                <div>
                  <v-icon color="error" :disabled="!esMedicoElUsuario"
                    @click="eliminarIndicacionesGenerales(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialogIndicacionesGenerales" max-width="700">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title><v-icon left>mdi-plus</v-icon> Indicaciones Generales</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-5">
                <v-col>
                  <v-text-field type="text" dense label="Nueva Indicacion General" v-model="nuevoIndicacionGeneral"
                    prepend-inner-icon="mdi-view-list" outlined hide-details></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn dense block color="success" @click="insertarNuevoRegistroIndicacionGeneral">Agregar nueva
                    indicacion a seguir</v-btn>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="dialogIndicacionesGenerales = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEliminarIndicacionesGenerales" max-width="700px">
          <v-card>
            <v-toolbar dense color="error" dark>
              <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-10">
              <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEliminarIndicacionesGenerales = false">Cancelar</v-btn>
              <v-btn color="error darken-1" text @click="confirmarEliminarIndicacionesGenerales">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!--   Solicitud de exámenes de laboratorio   -->
      <div>
        <v-row>
          <v-col>
            <h2>Solicitud de exámenes de laboratorio</h2>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogExamenesLaboratorio = true">Registrar
              Nuevo</v-btn>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
              :headers="headersTablaExamenesLaboratorio" :items="atencion.examenesLaboratorio" class="elevation-1">
              <template #[`item.actions`]="{ item }">
                <div>
                  <v-icon color="error" :disabled="!esMedicoElUsuario"
                    @click="eliminarExamenesLaboratorio(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialogExamenesLaboratorio" max-width="700">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title><v-icon left>mdi-plus</v-icon> Exámenes de Laboratorio</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-5">
                <v-col>
                  <v-autocomplete dense label="Examen de Laboratorio" v-model="nuevoExamenLaboratorio"
                    prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoExamenesLaboratorio"
                    item-value="nombre" item-text="nombre"></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn dense block color="success" @click="insertarNuevoRegistroExamenLaboratorio">Agregar nuevo examen
                    solicitado</v-btn>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="dialogExamenesLaboratorio = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEliminarExamenesLaboratorio" max-width="700px">
          <v-card>
            <v-toolbar dense color="error" dark>
              <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-10">
              <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEliminarExamenesLaboratorio = false">Cancelar</v-btn>
              <v-btn color="error darken-1" text @click="confirmarEliminarExamenesLaboratorio">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!--   Solicitud a Imagenologia   -->
      <div>
        <v-row>
          <v-col>
            <h2>Solicitud a Imagenologia</h2>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogExamenesImagenologia = true">Registrar
              Nuevo</v-btn>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
              :headers="headersTablaExamenesImagenologia" :items="atencion.examenesImagenologia" class="elevation-1">
              <template #[`item.actions`]="{ item }">
                <div>
                  <v-icon color="error" :disabled="!esMedicoElUsuario"
                    @click="eliminarExamenesImagenologia(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="dialogExamenesImagenologia" max-width="700">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title><v-icon left>mdi-plus</v-icon> Exámenes de Imagenologia</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-5">
                <v-col>
                  <v-autocomplete dense label="Examen de Imagenologia" v-model="nuevoExamenImagenologia"
                    prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoExamenesImagenologia"
                    item-value="nombre" item-text="nombre"></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn dense block color="success" @click="insertarNuevoRegistroExamenImagenologia">Agregar nuevo examen
                    solicitado</v-btn>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="dialogExamenesImagenologia = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEliminarExamenesImagenologia" max-width="700px">
          <v-card>
            <v-toolbar dense color="error" dark>
              <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-10">
              <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEliminarExamenesImagenologia = false">Cancelar</v-btn>
              <v-btn color="error darken-1" text @click="confirmarEliminarExamenesImagenologia">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <v-alert text v-model="alertaSuccessModel" outlined dismissible type="success" class="mt-5">
        {{ mensajeSuccess }}
      </v-alert>

      <v-row>
        <v-col>
          <v-btn color="success" dense block @click="guardarAtencion" :loading="estaGuardandoAtencion"
            :disabled="estaGuardandoAtencion">Guardar Atención</v-btn>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'

export default {
  name: 'AtencionMedicaVista',
  data () {
    return {
      estaGuardandoAtencion: false,
      esMedicoElUsuario: true,
      alertaErrorModel2: false,
      mensajeError2: '',

      alertaSuccessModel: false,
      mensajeSuccess: '',
      alertaSuccessModel2: false,
      mensajeSuccess2: '',

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

      // Atencion
      atencion: {
        id: this.$route.params.id,
        paciente: '19033183-0',
        antecedentesMorbidos: [],
        alergias: [],
        evaluaciones: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            evaluacion: 'Reconsulta por cuadro de dias de evolucion odinofagia y fiebre, con ausencia de tos y congestion Evaluado en urgencia dental, se deriva por sospecha de amigdalitis',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        examenesLaboratorio: [],
        examenesImagenologia: [],
        indicacionesMedicamentos: [],
        indicacionesGenerales: [],
        diagnostico: [],
        atencionEnfermeria: []

      },
      /**
     *
     *
     * ANTECEDENTES MORBIDOS TABLA
     * ANTECEDENTES MORBIDOS TABLA
     * ANTECEDENTES MORBIDOS TABLA
     *
     */
      // Tablas
      headersTablaAtencionesEnfermeria: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Antecedente Morbido', value: 'atencion' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      nuevoRegistroEnfermeria: '',
      dialogAtencionesEnfermeria: false,
      dialogEliminarAtencionesEnfermeria: null,
      eliminarAtencionesEnfermeriaIndex: null,

      /**
     *
     *
     * ALERGIAS TABLA
     * ALERGIAS TABLA
     * ALERGIAS TABLA
     *
     */
      // Tablas
      headersTablaAtencionesEnfermeria2: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Alergia', value: 'alergia' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      nuevoRegistroEnfermeria2: '',
      dialogAtencionesEnfermeria2: false,
      dialogEliminarAtencionesEnfermeria2: null,
      eliminarAtencionesEnfermeriaIndex2: null,

      /**
       *
       *
       * Indicaciones Medicamentos TABLA
       * Indicaciones Medicamentos TABLA
       * Indicaciones Medicamentos TABLA
       *
       */
      // Tablas
      listadoConcentracion: [
        { nombre: 'g' },
        { nombre: 'mg' },
        { nombre: 'µg' },
        { nombre: 'ng' },
        { nombre: 'cm3' }
      ],
      listadoVias: [
        { nombre: 'IM' },
        { nombre: 'EV' },
        { nombre: 'VO' },
        { nombre: 'SC' },
        { nombre: 'IR' }
      ],
      headersTablaIndicacionesMedicamentos: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Medicamento', value: 'medicamento' },
        { text: 'Dosis', value: 'dosis' },
        { text: 'Via', value: 'via' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      dialogIndicacionesMedicamentos: false,
      dialogEliminarIndicacionesMedicamentos: null,
      eliminarIndicacionesMedicamentosIndex: null,
      nuevoMedicamento: '',
      nuevoDosis: '',
      nuevoConcentracion: '',
      nuevoVia: '',
      listadoMedicamentos: [
        { id: 1, nombre: 'Paracetamol' },
        { id: 2, nombre: 'Ketorolaco' },
        { id: 3, nombre: 'Ibuprofeno' },
        { id: 4, nombre: 'Diclofenaco' },
        { id: 5, nombre: 'Dipirona' },
        { id: 6, nombre: 'Metamizol' },
        { id: 7, nombre: 'Tramadol' },
        { id: 8, nombre: 'Morfina' },
        { id: 9, nombre: 'Codeina' },
        { id: 10, nombre: 'Oxicodona' },
        { id: 11, nombre: 'Oximorfona' },
        { id: 12, nombre: 'Fentanilo' },
        { id: 13, nombre: 'Buprenorfina' },
        { id: 14, nombre: 'Hidromorfona' },
        { id: 15, nombre: 'Tapentadol' },
        { id: 16, nombre: 'Pregabalina' },
        { id: 17, nombre: 'Gabapentina' },
        { id: 18, nombre: 'Amitriptilina' },
        { id: 19, nombre: 'Duloxetina' },
        { id: 20, nombre: 'Venlafaxina' },
        { id: 21, nombre: 'Oxcarbazepina' },
        { id: 22, nombre: 'Carbamazepina' },
        { id: 23, nombre: 'Lamotrigina' },
        { id: 24, nombre: 'Topiramato' },
        { id: 25, nombre: 'Fenitoina' },
        { id: 26, nombre: 'Valproato' }
      ],
      /**
       *
       *
       * Indicaciones Generales TABLA
       * Indicaciones Generales TABLA
       * Indicaciones Generales TABLA
       *
       */
      // Tablas
      headersTablaIndicacionesGenerales: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Indicacion', value: 'indicacion' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      dialogIndicacionesGenerales: false,
      dialogEliminarIndicacionesGenerales: null,
      eliminarIndicacionesGeneralesIndex: null,
      nuevoIndicacionGeneral: '',
      /**
       *
       *
       * Diagnostico TABLA
       * Diagnostico TABLA
       * Diagnostico TABLA
       *
       */
      // Tablas
      headersTablaDiagnostico: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Diagnóstico', value: 'diagnostico' },
        { text: 'CIE-10', value: 'cie' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      dialogDiagnostico: false,
      dialogEliminarDiagnostico: null,
      eliminarDiagnosticoIndex: null,
      nuevoDiagnostico: '',
      nuevoCie: '',
      listadoDiagnosticos: [
        { id: 1, nombre: 'Fractura de Muñeca', cie: 'S52.5' },
        { id: 2, nombre: 'Apendicitis Aguda', cie: 'S54.5' },
        { id: 3, nombre: 'Dolor de cabeza no especificado', cie: 'S12.5' }
      ],
      /**
       *
       *
       * Examenes Laboratorio Tabla TABLA
       * Examenes Laboratorio Tabla TABLA
       * Examenes Laboratorio Tabla TABLA
       *
       */
      // Tablas
      listadoExamenesLaboratorio: [],
      headersTablaExamenesLaboratorio: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Examen', value: 'examen' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      dialogExamenesLaboratorio: false,
      dialogEliminarExamenesLaboratorio: null,
      eliminarExamenesLaboratorioIndex: null,
      nuevoExamenLaboratorio: '',
      /**
       *
       *
       * Examenes Imagenologia Tabla TABLA
       * Examenes Imagenologia Tabla TABLA
       * Examenes Imagenologia Tabla TABLA
       *
       */
      // Tablas
      listadoExamenesImagenologia: [],
      headersTablaExamenesImagenologia: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Examen', value: 'examen' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      dialogExamenesImagenologia: false,
      dialogEliminarExamenesImagenologia: null,
      eliminarExamenesImagenologiaIndex: null,
      nuevoExamenImagenologia: ''
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
    /**
     *
     *
     * ANTECEDENTES MORBIDOS TABLA
     * ANTECEDENTES MORBIDOS TABLA
     * ANTECEDENTES MORBIDOS TABLA
     *
     */
    // Tablas
    eliminarAtencionesEnfermeria (item) {
      this.dialogEliminarAtencionesEnfermeria = true
      this.eliminarAtencionesEnfermeriaIndex = this.atencion.atencionEnfermeria.indexOf(item)
    },
    confirmarEliminarAtencionesEnfermeria () {
      this.atencion.atencionEnfermeria.splice(this.eliminarAtencionesEnfermeriaIndex, 1)
      this.dialogEliminarAtencionesEnfermeria = false
    },
    // Nuevo Registro Enfermeria
    insertarNuevoRegistroEnfermeria () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        atencion: this.nuevoRegistroEnfermeria,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoRegistroEnfermeria = ''
      this.atencion.atencionEnfermeria.push(nuevoRegistro)
      this.dialogAtencionesEnfermeria = false
    },

    /**
     *
     *
     * ALERGIA TABLA
     * ALERGIA TABLA
     * ALERGIA TABLA
     *
     */
    // Tablas
    eliminarAtencionesEnfermeria2 (item) {
      this.dialogEliminarAtencionesEnfermeria2 = true
      this.eliminarAtencionesEnfermeriaIndex2 = this.atencion.alergias.indexOf(item)
    },
    confirmarEliminarAtencionesEnfermeria2 () {
      this.atencion.alergias.splice(this.eliminarAtencionesEnfermeriaIndex2, 1)
      this.dialogEliminarAtencionesEnfermeria2 = false
    },
    // Nuevo Registro Enfermeria
    insertarNuevoRegistroEnfermeria2 () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        alergia: this.nuevoRegistroEnfermeria2,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Médico'
        }
      }
      this.nuevoRegistroEnfermeria2 = ''
      this.atencion.alergias.push(nuevoRegistro)
      this.dialogAtencionesEnfermeria2 = false
    },
    /**
     *
     *
     * Indicaciones Medicamentos TABLA
     * Indicaciones Medicamentos TABLA
     * Indicaciones Medicamentos TABLA
     *
     */
    // Tablas
    // Eliminar Indicaciones Medicamentos
    eliminarIndicacionesMedicamentos (item) {
      this.dialogEliminarIndicacionesMedicamentos = true
      this.eliminarIndicacionesMedicamentosIndex = this.atencion.indicacionesMedicamentos.indexOf(item)
    },
    confirmarEliminarIndicacionesMedicamentos () {
      this.atencion.indicacionesMedicamentos.splice(this.eliminarIndicacionesMedicamentosIndex, 1)
      this.dialogEliminarIndicacionesMedicamentos = false
    },
    // Nuevo Indicaciones Medicamentos
    insertarNuevoRegistroMedicamentos () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        medicamento: this.nuevoMedicamento,
        dosis: this.nuevoDosis + this.nuevoConcentracion,
        via: this.nuevoVia,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoMedicamento = ''
      this.nuevoDosis = ''
      this.nuevoVia = ''
      this.atencion.indicacionesMedicamentos.push(nuevoRegistro)
      this.dialogIndicacionesMedicamentos = false
    },
    /**
     *
     *
     * Indicaciones Generales TABLA
     * Indicaciones Generales TABLA
     * Indicaciones Generales TABLA
     *
     */
    // Tablas
    eliminarIndicacionesGenerales (item) {
      this.dialogEliminarIndicacionesGenerales = true
      this.eliminarIndicacionesGeneralesIndex = this.atencion.indicacionesGenerales.indexOf(item)
    },
    confirmarEliminarIndicacionesGenerales () {
      this.atencion.indicacionesGenerales.splice(this.eliminarIndicacionesGeneralesIndex, 1)
      this.dialogEliminarIndicacionesGenerales = false
    },
    insertarNuevoRegistroIndicacionGeneral () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        indicacion: this.nuevoIndicacionGeneral,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoIndicacionGeneral = ''
      this.atencion.indicacionesGenerales.push(nuevoRegistro)
      this.dialogIndicacionesGenerales = false
    },
    /**
     *
     *
     * Indicaciones Diagnostico TABLA
     * Indicaciones Diagnostico TABLA
     * Indicaciones Diagnostico TABLA
     *
     */
    // Tablas
    eliminarDiagnostico (item) {
      this.dialogEliminarDiagnostico = true
      this.eliminarDiagnosticoIndex = this.atencion.diagnostico.indexOf(item)
    },
    confirmarEliminarDiagnostico () {
      this.atencion.diagnostico.splice(this.eliminarDiagnosticoIndex, 1)
      this.dialogEliminarDiagnostico = false
    },
    insertarNuevoRegistroDiagnostico () {
      this.nuevoCie = this.listadoDiagnosticos.find(diagnostico => diagnostico.nombre === this.nuevoDiagnostico).cie
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        diagnostico: this.nuevoDiagnostico,
        cie: this.nuevoCie,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoDiagnostico = ''
      this.nuevoCie = ''
      this.atencion.diagnostico.push(nuevoRegistro)
      this.dialogDiagnostico = false
    },
    /**
       *
       *
       * Examenes Laboratorio Tabla TABLA
       * Examenes Laboratorio Tabla TABLA
       * Examenes Laboratorio Tabla TABLA
       *
       */
    // Tablas
    eliminarExamenesLaboratorio (item) {
      this.dialogEliminarExamenesLaboratorio = true
      this.eliminarExamenesLaboratorioIndex = this.atencion.examenesLaboratorio.indexOf(item)
    },
    confirmarEliminarExamenesLaboratorio () {
      this.atencion.examenesLaboratorio.splice(this.eliminarExamenesLaboratorioIndex, 1)
      this.dialogEliminarExamenesLaboratorio = false
    },
    insertarNuevoRegistroExamenLaboratorio () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        examen: this.nuevoExamenLaboratorio,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoExamenLaboratorio = ''
      this.atencion.examenesLaboratorio.push(nuevoRegistro)
      this.dialogExamenesLaboratorio = false
    },
    cargarListadoExamenesLaboratorio () {
      this.listadoExamenesLaboratorio = [
        {
          id: 1,
          nombre: 'Uremia'
        },
        {
          id: 2,
          nombre: 'Glucosa'
        },
        {
          id: 3,
          nombre: 'Creatinina'
        },
        {
          id: 4,
          nombre: 'Urea'
        },
        {
          id: 5,
          nombre: 'Hemograma'
        },
        {
          id: 6,
          nombre: 'Electrolitos'
        },
        {
          id: 7,
          nombre: 'Gases Arteriales'
        },
        {
          id: 8,
          nombre: 'Proteinas Totales'
        },
        {
          id: 9,
          nombre: 'Proteinas Fraccionadas'
        },
        {
          id: 10,
          nombre: 'Bilirrubina'
        },
        {
          id: 11,
          nombre: 'Fosfatasa Alcalina'
        },
        {
          id: 12,
          nombre: 'Transaminasa Glutamico Oxalacetica'
        },
        {
          id: 13,
          nombre: 'Transaminasa Glutamico Piruvica'
        },
        {
          id: 14,
          nombre: 'Fosforo'
        },
        {
          id: 15,
          nombre: 'Calcio'
        },
        {
          id: 16,
          nombre: 'Magnesio'
        },
        {
          id: 17,
          nombre: 'Lipidos'
        },
        {
          id: 18,
          nombre: 'Colesterol'
        },
        {
          id: 19,
          nombre: 'Trigliceridos'
        },
        {
          id: 20,
          nombre: 'Colesterol HDL'
        },
        {
          id: 21,
          nombre: 'Colesterol LDL'
        },
        {
          id: 22,
          nombre: 'Colesterol VLDL'
        },
        {
          id: 23,
          nombre: 'Colesterol Total'
        },
        {
          id: 24,
          nombre: 'Colesterol Total'
        },
        {
          id: 25,
          nombre: 'Colesterol Total'
        },
        {
          id: 26,
          nombre: 'Colesterol Total'
        }
      ]
    },
    /**
       *
       *
       * Examenes Imagenologia Tabla TABLA
       * Examenes Imagenologia Tabla TABLA
       * Examenes Imagenologia Tabla TABLA
       *
       */
    // Tablas
    cargarListadoExamenesImagenologia () {
      this.listadoExamenesImagenologia = [
        { id: '1', nombre: 'Rx Torax AP' },
        { id: '2', nombre: 'Culumna Total' },
        { id: '3', nombre: 'Rx Muñeca' }

      ]
    },
    eliminarExamenesImagenologia (item) {
      this.dialogEliminarExamenesImagenologia = true
      this.eliminarExamenesImagenologiaIndex = this.atencion.examenesImagenologia.indexOf(item)
    },
    confirmarEliminarExamenesImagenologia () {
      this.atencion.examenesImagenologia.splice(this.eliminarExamenesImagenologiaIndex, 1)
      this.dialogEliminarExamenesImagenologia = false
    },
    insertarNuevoRegistroExamenImagenologia () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        examen: this.nuevoExamenImagenologia,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoExamenImagenologia = ''
      this.atencion.examenesImagenologia.push(nuevoRegistro)
      this.dialogExamenesImagenologia = false
    },
    guardarAtencion () {
      this.estaGuardandoAtencion = true
      setTimeout(() => {
        this.estaGuardandoAtencion = false
        this.alertaSuccessModel = true
        this.mensajeSuccess = 'Se ha ingresado correctamente la atención.'
      }, 1000)
    }

  },
  created () {
    this.cargarListadoExamenesLaboratorio()
    this.cargarListadoExamenesImagenologia()
  }
}
</script>

<style scoped>.negrita {
  font-weight: bold;
}

.contenerdorTabla {
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 20px;
}</style>
