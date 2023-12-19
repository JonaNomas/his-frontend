<template>
  <div>
    <v-row>
      <v-col cols="10" class="d-flex flex-inline align-center">
        <h1>Atención</h1>
        <span class="ml-3 font-weight-thin"> - {{ $route.params.id }}</span>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-btn color="accent" to="/urgencias/atencion/"><v-icon left>mdi-arrow-left</v-icon>Volver</v-btn>
      </v-col>
    </v-row>

    <!--   Identificacion de Atención   -->
    <div>
      <v-row>
        <v-col>
          <h2>Identificacion de Atención</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          --
        </v-col>
      </v-row>
    </div>

    <!--   Identificacion del Paciente   -->
    <div>
      <v-row>
        <v-col>
          <h2>Identificacion del Paciente</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <TablaDatosSimplePaciente :paciente-encontrado="paciente" />
        </v-col>
      </v-row>
    </div>

    <!--   Triage   -->
    <div>
      <v-row>
        <v-col>
          <h2>Triage</h2>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaTriage"
            :items="atencion.triage" class="elevation-1">
          </v-data-table>
        </v-col>
      </v-row>
    </div>

    <!--   Signos Vitales   -->
    <div>
      <v-row>
        <v-col>
          <h2>Signos Vitales</h2>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="success" @click="dialogSignosVitales = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaSignosVitales"
            :items="atencion.signosVitales" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" @click="eliminarSignosVitales(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogSignosVitales" max-width="700">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title><v-icon left>mdi-plus</v-icon> Signos Vitales</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row class="mt-5">
              <v-col>
                <v-text-field type="number" dense label="Presión Arterial Sistolica (PSA)" v-model="nuevoPas"
                  prepend-inner-icon="mdi-arm-flex" outlined hide-details min="0"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field type="number" dense label="Presión Arterial Diastolica (PAD)" v-model="nuevoPad"
                  prepend-inner-icon="mdi-arm-flex" outlined hide-details min="0"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field type="number" dense label="Pulso por Minuto" v-model="pulso"
                  prepend-inner-icon="mdi-heart-pulse" outlined hide-details min="0"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field type="number" dense label="Temperatura Axilar" v-model="nuevoTemperaturaAxilar"
                  prepend-inner-icon="mdi-thermometer" outlined hide-details min="0"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field type="number" dense label="Temperatura Rectal" v-model="nuevoTemperaturaRectal"
                  prepend-inner-icon="mdi-thermometer" outlined hide-details min="0"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field type="number" dense label="Saturación de O2" v-model="nuevoSaturacionO2"
                  prepend-inner-icon="mdi-approximately-equal" outlined hide-details max="100"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field type="number" dense label="Frecuencia Respiratoria" v-model="nuevoFrecuenciaRespiratoria"
                  prepend-inner-icon="mdi-weather-windy" outlined hide-details min="0"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field type="number" dense label="Dolor (EVA)" v-model="nuevoDolorEva"
                  prepend-inner-icon="mdi-alert-octagram" outlined hide-details min="0" max="10"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field type="number" dense label="OMV (Glassgow)" v-model="nuevoOmvGlassgow"
                  prepend-inner-icon="mdi-brain" outlined hide-details min="0" max="15"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field type="number" dense label="Hemoglucotest" v-model="nuevoHemoglucotest"
                  prepend-inner-icon="mdi-diabetes" outlined hide-details></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="insertarNuevoRegistroSignosVitales">Agregar nuevo control de
                  signos vitales</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="dialogSignosVitales = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEliminarSignosVitales" max-width="700px">
        <v-card>
          <v-toolbar dense color="error" dark>
            <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-10">
            <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEliminarSignosVitales = false">Cancelar</v-btn>
            <v-btn color="error darken-1" text @click="confirmarEliminarSignosVitales">Confirmar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!--   Riesgos   -->
    <div>
      <v-row>
        <v-col>
          <h2>Riesgos</h2>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogRiesgos = true">Ingresar / Actualizar</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <RiesgosUrgencia :riesgos="atencion.riesgos" />
        </v-col>
      </v-row>

      <v-dialog v-model="dialogRiesgos" max-width="700">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title><v-icon left>mdi-plus</v-icon> Riesgo</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row class="mt-5">
              <v-col>
                <v-autocomplete dense label="Riesgo IRI" v-model="nuevoRiesgoIri"
                  prepend-inner-icon="mdi-clipboard-list-outline" outlined hide-details
                  :items="selectRiesgos"></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete dense label="Riesgo UPP" v-model="nuevoRiesgoUpp"
                  prepend-inner-icon="mdi-clipboard-list-outline" outlined hide-details
                  :items="selectRiesgos"></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete dense label="Riesgo Caídas" v-model="nuevoRiesgoCaidas"
                  prepend-inner-icon="mdi-clipboard-list-outline" outlined hide-details
                  :items="selectRiesgos"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="modificarRegistroDeRiesgos">Aplicar cambios a los
                  riesgos</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="dialogRiesgos = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!--   Antecedentes Morbidos   -->
    <div>
      <v-row>
        <v-col>
          <h2>Antecedentes Morbidos</h2>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogAntecedentesMorbidos = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaAntedecendesMorbidos" :items="atencion.antecedentesMorbidos" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarAntecedentesMorbidos(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogAntecedentesMorbidos" max-width="700">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title><v-icon left>mdi-plus</v-icon> Antecedentes Morbidos</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row class="mt-5">
              <v-col>
                <v-autocomplete dense label="Riesgo IRI" v-model="nuevoAntecedenteMorbido"
                  prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoAntecedentesMorbidos"
                  item-value="nombre" item-text="nombre"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="insertarNuevoRegistroAntecedentesMorbidos">Agregar nuevo
                  antecedente
                  morbido</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="dialogAntecedentesMorbidos = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEliminarAntecedentesMorbidos" max-width="700px">
        <v-card>
          <v-toolbar dense color="error" dark>
            <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-10">
            <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEliminarAntecedentesMorbidos = false">Cancelar</v-btn>
            <v-btn color="error darken-1" text @click="confirmarEliminarAntecedentesMorbidos">Confirmar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!--Alergias   -->
    <div>
      <v-row>
        <v-col>
          <h2>Alergias</h2>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogAlergias = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaAlergias"
            :items="atencion.alergias" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarAlergias(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogAlergias" max-width="700">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title><v-icon left>mdi-plus</v-icon> Alergias</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row class="mt-5">
              <v-col>
                <v-text-field type="text" dense label="Nueva Alergia" v-model="nuevoAlergia"
                  prepend-inner-icon="mdi-view-list" outlined hide-details></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="insertarNuevoRegistroAlergias">Agregar nuevo registro de
                  alergia</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="dialogAlergias = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEliminarAlergias" max-width="700px">
        <v-card>
          <v-toolbar dense color="error" dark>
            <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-10">
            <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEliminarAlergias = false">Cancelar</v-btn>
            <v-btn color="error darken-1" text @click="confirmarEliminarAlergias">Confirmar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!--   Evaluación   -->
    <div>
      <v-row>
        <v-col>
          <h2>Evaluación</h2>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogEvaluacion = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaEvaluacion"
            :items="atencion.evaluaciones" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarEvaluacion(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogEvaluacion" max-width="700">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title><v-icon left>mdi-plus</v-icon> Evaluación</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row class="mt-5">
              <v-col>
                <v-textarea outlined v-model="nuevoEvaluacion" hide-details label="Nueva Evaluación"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="insertarNuevoRegistroEvaluacion">Agregar nueva evaluación medica</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="dialogEvaluacion = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEliminarEvaluacion" max-width="700px">
        <v-card>
          <v-toolbar dense color="error" dark>
            <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-10">
            <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEliminarEvaluacion = false">Cancelar</v-btn>
            <v-btn color="error darken-1" text @click="confirmarEliminarEvaluacion">Confirmar</v-btn>
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
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogExamenesLaboratorio = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaExamenesLaboratorio" :items="atencion.examenesLaboratorio" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarExamenesLaboratorio(item)">mdi-delete</v-icon>
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
                <v-btn dense block color="success" @click="insertarNuevoRegistroExamenLaboratorio">Agregar nuevo examen solicitado</v-btn>
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
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogExamenesImagenologia = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaExamenesImagenologia" :items="atencion.examenesImagenologia" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarExamenesImagenologia(item)">mdi-delete</v-icon>
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
                <v-btn dense block color="success" @click="insertarNuevoRegistroExamenImagenologia">Agregar nuevo examen solicitado</v-btn>
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

    <!--   Indicaciones de Medicamentos   -->
    <div>
      <v-row>
        <v-col>
          <h2>Indicaciones de Medicamentos</h2>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogIndicacionesMedicamentos = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaIndicacionesMedicamentos" :items="atencion.indicacionesMedicamentos"
            class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarIndicacionesMedicamentos(item)">mdi-delete</v-icon>
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
                <v-autocomplete dense label="Medicamento" v-model="nuevoMedicamento"
                  prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoMedicamentos"
                  item-value="nombre" item-text="nombre"></v-autocomplete>
              </v-col>
              <v-col>
                <v-text-field type="number" dense label="Dosis" v-model="nuevoDosis"
                  prepend-inner-icon="mdi-view-list" outlined hide-details min="0"></v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete dense label="Medicamento" v-model="nuevoConcentracion"
                  prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoConcentracion"
                  item-value="nombre" item-text="nombre"></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete dense label="Vía" v-model="nuevoVia"
                  prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoVias"
                  item-value="nombre" item-text="nombre"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="insertarNuevoRegistroMedicamentos">Agregar nuevo medicamento a administrar</v-btn>
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
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogIndicacionesGenerales = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaIndicacionesGenerales" :items="atencion.indicacionesGenerales" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarIndicacionesGenerales(item)">mdi-delete</v-icon>
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
                <v-btn dense block color="success" @click="insertarNuevoRegistroIndicacionGeneral">Agregar nueva indicacion a seguir</v-btn>
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

    <!--   Diagnostico   -->
    <div>
      <v-row>
        <v-col>
          <h2>Diagnostico</h2>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="success" :disabled="!esMedicoElUsuario" @click="dialogDiagnostico = true">Registrar Nuevo</v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaDiagnostico"
            :items="atencion.diagnostico" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" :disabled="!esMedicoElUsuario" @click="eliminarDiagnostico(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogDiagnostico" max-width="700">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title><v-icon left>mdi-plus</v-icon> Diagnostico</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row class="mt-5">
              <v-col>
                <v-autocomplete dense label="Examen de Imagenologia" v-model="nuevoDiagnostico"
                  prepend-inner-icon="mdi-view-list" outlined hide-details :items="listadoDiagnosticos"
                  item-value="nombre" item-text="nombre"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="insertarNuevoRegistroDiagnostico">Agregar nuevo diagnostico</v-btn>
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

    <!--   Atenciones de Enfermeria   -->
    <div>
      <v-row>
        <v-col>
          <h2>Atenciones de Enfermeria</h2>
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
            <v-toolbar-title><v-icon left>mdi-plus</v-icon> Atenciones de Enfermeria</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row class="mt-5">
              <v-col>
                <v-text-field type="text" dense label="Nuevo Registro de Enfermeria" v-model="nuevoRegistroEnfermeria"
                  prepend-inner-icon="mdi-view-list" outlined hide-details></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dense block color="success" @click="insertarNuevoRegistroEnfermeria">Agregar nuevo registro de enfermeria</v-btn>
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
  </div>
</template>
<script>
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import RiesgosUrgencia from '@/components/urgencias/RiesgosUrgencia.vue'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
export default {
  name: 'AtencionIdUrgenciaVista',
  data () {
    return {
      // --
      esMedicoElUsuario: true,
      // --
      atencion: {},
      paciente: {},
      listadoAntecedentesMorbidos: [],
      listadoExamenesLaboratorio: [],
      listadoExamenesImagenologia: [],
      listadoMedicamentos: [],
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
      listadoDiagnosticos: [],
      // Headers Tablas
      headersTablaTriage: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'PAS', value: 'pas' },
        { text: 'PAD', value: 'pad' },
        { text: 'Pulso', value: 'pulso' },
        { text: 'Temperatura Axilar', value: 'temperaturaAxilar' },
        { text: 'Temperatura Rectal', value: 'temperaturaRectal' },
        { text: 'Saturacion Oxigeno', value: 'saturacionOxigeno' },
        { text: 'Frecuencia Respiratoria', value: 'frecuenciaRespiratoria' },
        { text: 'EVA', value: 'escalaVisualAnaloga' },
        { text: 'OMV', value: 'omv' },
        { text: 'HGT', value: 'hgt' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' }
      ],
      headersTablaSignosVitales: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'PAS', value: 'pas' },
        { text: 'PAD', value: 'pad' },
        { text: 'Pulso', value: 'pulso' },
        { text: 'Temperatura Axilar', value: 'temperaturaAxilar' },
        { text: 'Temperatura Rectal', value: 'temperaturaRectal' },
        { text: 'Saturacion Oxigeno', value: 'saturacionOxigeno' },
        { text: 'Frecuencia Respiratoria', value: 'frecuenciaRespiratoria' },
        { text: 'EVA', value: 'eva' },
        { text: 'OMV', value: 'omv' },
        { text: 'HGT', value: 'hgt' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      headersTablaAntedecendesMorbidos: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Antedecente', value: 'antecedente' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      headersTablaAlergias: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Alergia', value: 'alergia' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      headersTablaEvaluacion: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Evaluacion', value: 'evaluacion' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      headersTablaExamenesLaboratorio: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Examen', value: 'examen' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      headersTablaExamenesImagenologia: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Examen', value: 'examen' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
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
      headersTablaIndicacionesGenerales: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Indicacion', value: 'indicacion' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      headersTablaDiagnostico: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Diagnostico', value: 'diagnostico' },
        { text: 'CIE-10', value: 'cie' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      headersTablaAtencionesEnfermeria: [
        { text: 'Fecha', value: 'fechaHora' },
        { text: 'Atencion', value: 'atencion' },
        { text: 'Cargo', value: 'responsable.cargo' },
        { text: 'Responsable', value: 'responsable.nombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      // Dialogs
      dialogSignosVitales: false,
      dialogRiesgos: false,
      dialogAntecedentesMorbidos: false,
      dialogAlergias: false,
      dialogEvaluacion: false,
      dialogExamenesLaboratorio: false,
      dialogExamenesImagenologia: false,
      dialogIndicacionesMedicamentos: false,
      dialogIndicacionesGenerales: false,
      dialogDiagnostico: false,
      dialogAtencionesEnfermeria: false,
      // Dialog Eliminar
      dialogEliminarSignosVitales: false,
      dialogEliminarAntecedentesMorbidos: null,
      dialogEliminarAlergias: null,
      dialogEliminarEvaluacion: null,
      dialogEliminarExamenesLaboratorio: null,
      dialogEliminarExamenesImagenologia: null,
      dialogEliminarIndicacionesMedicamentos: null,
      dialogEliminarIndicacionesGenerales: null,
      dialogEliminarDiagnostico: null,
      dialogEliminarAtencionesEnfermeria: null,
      // Eliminando
      eliminarSignosVitalesIndex: null,
      eliminarAntecedentesMorbidosIndex: null,
      eliminarAlergiasIndex: null,
      eliminarEvaluacionIndex: null,
      eliminarExamenesLaboratorioIndex: null,
      eliminarExamenesImagenologiaIndex: null,
      eliminarIndicacionesMedicamentosIndex: null,
      eliminarIndicacionesGeneralesIndex: null,
      eliminarDiagnosticoIndex: null,
      eliminarAtencionesEnfermeriaIndex: null,
      // Nuevo Signos Vitales
      nuevoPas: '',
      nuevoPad: '',
      pulso: '',
      nuevoTemperaturaAxilar: '',
      nuevoTemperaturaRectal: '',
      nuevoSaturacionO2: '',
      nuevoFrecuenciaRespiratoria: '',
      nuevoDolorEva: '',
      nuevoOmvGlassgow: '',
      nuevoHemoglucotest: '',
      // Modificar riesgos
      selectRiesgos: [
        'Alto',
        'Medio',
        'Bajo'
      ],
      nuevoRiesgoIri: '',
      nuevoRiesgoUpp: '',
      nuevoRiesgoCaidas: '',
      // Nuevos Antecedentes Morbidos
      nuevoAntecedenteMorbido: '',
      // Nuevo Alergias
      nuevoAlergia: '',
      // Nuevo Evaluacion
      nuevoEvaluacion: '',
      // Nuevo Examen Laboratorio
      nuevoExamenLaboratorio: '',
      // Nuevo Examen Imagenologia
      nuevoExamenImagenologia: '',
      // Nuevo Indicaciones Medicamentos
      nuevoMedicamento: '',
      nuevoDosis: '',
      nuevoConcentracion: '',
      nuevoVia: '',
      // Nueva Indicaciones Generales
      nuevoIndicacionGeneral: '',
      // Nuevo diagnostico
      nuevoDiagnostico: '',
      nuevoCie: '',
      // Nuevo Registro Enfermeria
      nuevoRegistroEnfermeria: ''

    }
  },
  methods: {
    // Llamada a API
    cargarAtencion () {
      this.atencion = {
        id: this.$route.params.id,
        paciente: '19033183-0',
        triage: [{
          id: 1,
          idConsultaUrgencia: 300,
          pas: 120,
          pad: 80,
          pulso: 80,
          temperaturaAxilar: 36.5,
          temperaturaRectal: 36.5,
          saturacionOxigeno: 98,
          frecuenciaRespiratoria: 16,
          escalaVisualAnaloga: 5,
          omv: 0,
          hgt: 120,
          categoria: '1',
          fechaHora: '2023-12-17T18:40:59.803Z',
          responsable: {
            nombre: 'Victor Guzman Contreras',
            rut: '19033183-0',
            cargo: 'Enfermero'
          }
        }],
        signosVitales: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            pas: 120,
            pad: 80,
            pulso: 60,
            temperaturaAxilar: 36,
            temperaturaRectal: 37,
            saturacionOxigeno: 100,
            frecuenciaRespiratoria: 12,
            eva: 10,
            omv: 15,
            hgt: 100,
            responsable: {
              nombre: 'Victor Guzman Contreras',
              rut: '19033183-0',
              cargo: 'Enfermero'
            }
          },
          {
            fechaHora: '2023-12-17T19:40:59.803Z',
            pas: 150,
            pad: 90,
            pulso: 88,
            temperaturaAxilar: 36,
            temperaturaRectal: 37,
            saturacionOxigeno: 95,
            frecuenciaRespiratoria: 22,
            eva: 5,
            omv: 3,
            hgt: 300,
            responsable: {
              nombre: 'Victor Guzman Contreras',
              rut: '19033183-0',
              cargo: 'Enfermero'
            }
          }
        ],
        riesgos: {
          fechaHora: '2023-12-17T18:40:59.803Z',
          iri: 'Alto',
          upp: 'Bajo',
          caidas: 'Bajo',
          responsable: {
            nombre: 'Francisco Perez Perez',
            rut: '19033183-0',
            cargo: 'Medico'
          }
        },
        antecedentesMorbidos: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            antecedente: 'Diabetes',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            antecedente: 'Hipertension',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        alergias: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            alergia: 'Penicilina',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            alergia: 'Paracetamol',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        evaluaciones: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            evaluacion: 'Reconsulta por cuadro de dias de evolucion odinofagia y fiebre, con ausencia de tos y congestion Evaluado en urgencia dental, se deriva por sospecha de amigdalitis',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            evaluacion: 'Se reevalua pero por cuadro de dias de evolucion odinofagia y fiebre, con ausencia de tos y congestion Evaluado en urgencia dental, se deriva por sospecha de amigdalitis',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        examenesLaboratorio: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            examen: 'Uremia',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            examen: 'Glucosa',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        examenesImagenologia: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            examen: 'Radiografia de Torax',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            examen: 'Radiografia de Muñeca',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        indicacionesMedicamentos: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            medicamento: 'Paracetamol',
            dosis: '1G',
            via: 'EV',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            medicamento: 'Ketorolaco',
            dosis: '30MG',
            via: 'EV',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        indicacionesGenerales: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            indicacion: 'Reposo en cama 45°',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            indicacion: 'Regimen Liviano',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            }
          }
        ],
        diagnostico: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            diagnostico: 'Fractura de Muñeca',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            },
            cie: 'S52.5'
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            diagnostico: 'Fractura de Muñeca',
            responsable: {
              nombre: 'Francisco Perez Perez',
              rut: '19033183-0',
              cargo: 'Medico'
            },
            cie: 'S52.5'
          }
        ],
        atencionEnfermeria: [
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            atencion: 'VVP #18 antebrazo derecho',
            responsable: {
              nombre: 'Victor Guzman Contreras',
              rut: '19033183-0',
              cargo: 'Enfermero'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            atencion: 'Paracetamol 1G EV',
            responsable: {
              nombre: 'Victor Guzman Contreras',
              rut: '19033183-0',
              cargo: 'Enfermero'
            }
          },
          {
            fechaHora: '2023-12-17T18:40:59.803Z',
            atencion: 'Ketorolaco 30MG EV',
            responsable: {
              nombre: 'Victor Guzman Contreras',
              rut: '19033183-0',
              cargo: 'Enfermero'
            }
          }
        ]

      }
    },
    async cargarPaciente () {
      const paciente = await obtenerPacientePorRut(this.atencion.paciente)
      this.paciente = paciente
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
    cargarListadoExamenesImagenologia () {
      this.listadoExamenesImagenologia = [
        { id: '1', nombre: 'Rx Torax AP' },
        { id: '2', nombre: 'Culumna Total' },
        { id: '3', nombre: 'Rx Muñeca' }

      ]
    },
    cargarListadoMedicamentos () {
      this.listadoMedicamentos = [
        {
          id: 1,
          nombre: 'Paracetamol'
        },
        {
          id: 2,
          nombre: 'Ketorolaco'
        },
        {
          id: 3,
          nombre: 'Ibuprofeno'
        },
        {
          id: 4,
          nombre: 'Diclofenaco'
        },
        {
          id: 5,
          nombre: 'Dipirona'
        },
        {
          id: 6,
          nombre: 'Metamizol'
        },
        {
          id: 7,
          nombre: 'Tramadol'
        },
        {
          id: 8,
          nombre: 'Morfina'
        },
        {
          id: 9,
          nombre: 'Codeina'
        },
        {
          id: 10,
          nombre: 'Oxicodona'
        },
        {
          id: 11,
          nombre: 'Oximorfona'
        },
        {
          id: 12,
          nombre: 'Fentanilo'
        },
        {
          id: 13,
          nombre: 'Buprenorfina'
        },
        {
          id: 14,
          nombre: 'Hidromorfona'
        },
        {
          id: 15,
          nombre: 'Tapentadol'
        },
        {
          id: 16,
          nombre: 'Pregabalina'
        },
        {
          id: 17,
          nombre: 'Gabapentina'
        },
        {
          id: 18,
          nombre: 'Amitriptilina'
        },
        {
          id: 19,
          nombre: 'Duloxetina'
        },
        {
          id: 20,
          nombre: 'Venlafaxina'
        },
        {
          id: 21,
          nombre: 'Oxcarbazepina'
        },
        {
          id: 22,
          nombre: 'Carbamazepina'
        },
        {
          id: 23,
          nombre: 'Lamotrigina'
        },
        {
          id: 24,
          nombre: 'Topiramato'
        },
        {
          id: 25,
          nombre: 'Fenitoina'
        },
        {
          id: 26,
          nombre: 'Valproato'
        }
      ]
    },
    cargarAntecedentesMorbidos () {
      // TODO: Implementar API
      this.listadoAntecedentesMorbidos = [
        {
          id: 1,
          nombre: 'Diabetes'
        },
        {
          id: 2,
          nombre: 'Hipertension'
        },
        {
          id: 3,
          nombre: 'Cancer'
        },
        {
          id: 4,
          nombre: 'VIH'
        },
        {
          id: 5,
          nombre: 'Tuberculosis'
        },
        {
          id: 6,
          nombre: 'Asma'
        },
        {
          id: 7,
          nombre: 'EPOC'
        },
        {
          id: 8,
          nombre: 'Insuficiencia Renal'
        },
        {
          id: 9,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 10,
          nombre: 'Insuficiencia Hepatica'
        },
        {
          id: 11,
          nombre: 'Insuficiencia Venosa'
        },
        {
          id: 12,
          nombre: 'Insuficiencia Arterial'
        },
        {
          id: 13,
          nombre: 'Insuficiencia Respiratoria'
        },
        {
          id: 14,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 15,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 16,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 17,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 18,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 19,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 20,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 21,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 22,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 23,
          nombre: 'Insuficiencia Cardiaca'
        },
        {
          id: 24,
          nombre: 'Insuficiencia Cardiaca'
        }
      ]
    },
    cargarlistadoDiagnosticos () {
      this.listadoDiagnosticos = [
        {
          id: 1,
          nombre: 'Fractura de Muñeca',
          cie: 'S52.5'
        },
        {
          id: 2,
          nombre: 'Apendicitis Aguda',
          cie: 'S54.5'
        },
        {
          id: 3,
          nombre: 'Dolor de cabeza no especificado',
          cie: 'S12.5'
        }
      ]
    },
    // Eliminar Obetos de Tablas
    // Eliminar Signos Vitales
    eliminarSignosVitales (item) {
      this.dialogEliminarSignosVitales = true
      this.eliminarSignosVitalesIndex = this.atencion.signosVitales.indexOf(item)
    },
    confirmarEliminarSignosVitales () {
      this.atencion.signosVitales.splice(this.eliminarSignosVitalesIndex, 1)
      this.dialogEliminarSignosVitales = false
    },

    // Eliminar Antecedentes Morbidos
    eliminarAntecedentesMorbidos (item) {
      this.dialogEliminarAntecedentesMorbidos = true
      this.eliminarAntecedentesMorbidosIndex = this.atencion.antecedentesMorbidos.indexOf(item)
    },
    confirmarEliminarAntecedentesMorbidos () {
      this.atencion.antecedentesMorbidos.splice(this.eliminarAntecedentesMorbidosIndex, 1)
      this.dialogEliminarAntecedentesMorbidos = false
    },

    // Eliminar Alergias
    eliminarAlergias (item) {
      this.dialogEliminarAlergias = true
      this.eliminarAlergiasIndex = this.atencion.alergias.indexOf(item)
    },
    confirmarEliminarAlergias () {
      this.atencion.alergias.splice(this.eliminarAlergiasIndex, 1)
      this.dialogEliminarAlergias = false
    },

    // Eliminar Evaluacion
    eliminarEvaluacion (item) {
      this.dialogEliminarEvaluacion = true
      this.eliminarEvaluacionIndex = this.atencion.evaluaciones.indexOf(item)
    },
    confirmarEliminarEvaluacion () {
      this.atencion.evaluaciones.splice(this.eliminarEvaluacionIndex, 1)
      this.dialogEliminarEvaluacion = false
    },

    // Eliminar Examenes de Laboratorio
    eliminarExamenesLaboratorio (item) {
      this.dialogEliminarExamenesLaboratorio = true
      this.eliminarExamenesLaboratorioIndex = this.atencion.examenesLaboratorio.indexOf(item)
    },
    confirmarEliminarExamenesLaboratorio () {
      this.atencion.examenesLaboratorio.splice(this.eliminarExamenesLaboratorioIndex, 1)
      this.dialogEliminarExamenesLaboratorio = false
    },

    // Eliminar Examanes de Imagenologia
    eliminarExamenesImagenologia (item) {
      this.dialogEliminarExamenesImagenologia = true
      this.eliminarExamenesImagenologiaIndex = this.atencion.examenesImagenologia.indexOf(item)
    },
    confirmarEliminarExamenesImagenologia () {
      this.atencion.examenesImagenologia.splice(this.eliminarExamenesImagenologiaIndex, 1)
      this.dialogEliminarExamenesImagenologia = false
    },

    // Eliminar Indicaciones Medicamentos
    eliminarIndicacionesMedicamentos (item) {
      this.dialogEliminarIndicacionesMedicamentos = true
      this.eliminarIndicacionesMedicamentosIndex = this.atencion.indicacionesMedicamentos.indexOf(item)
    },
    confirmarEliminarIndicacionesMedicamentos () {
      this.atencion.indicacionesMedicamentos.splice(this.eliminarIndicacionesMedicamentosIndex, 1)
      this.dialogEliminarIndicacionesMedicamentos = false
    },

    // Eliminar Indicaciones Generales
    eliminarIndicacionesGenerales (item) {
      this.dialogEliminarIndicacionesGenerales = true
      this.eliminarIndicacionesGeneralesIndex = this.atencion.indicacionesGenerales.indexOf(item)
    },
    confirmarEliminarIndicacionesGenerales () {
      this.atencion.indicacionesGenerales.splice(this.eliminarIndicacionesGeneralesIndex, 1)
      this.dialogEliminarIndicacionesGenerales = false
    },

    // Eliminar Diagnostico
    eliminarDiagnostico (item) {
      this.dialogEliminarDiagnostico = true
      this.eliminarDiagnosticoIndex = this.atencion.diagnostico.indexOf(item)
    },
    confirmarEliminarDiagnostico () {
      this.atencion.diagnostico.splice(this.eliminarDiagnosticoIndex, 1)
      this.dialogEliminarDiagnostico = false
    },

    // Eliminar Atenciones de Enfermeria
    eliminarAtencionesEnfermeria (item) {
      this.dialogEliminarAtencionesEnfermeria = true
      this.eliminarAtencionesEnfermeriaIndex = this.atencion.atencionEnfermeria.indexOf(item)
    },
    confirmarEliminarAtencionesEnfermeria () {
      this.atencion.atencionEnfermeria.splice(this.eliminarAtencionesEnfermeriaIndex, 1)
      this.dialogEliminarAtencionesEnfermeria = false
    },

    // Agregar Nuevo Registro
    // Signos Vitales
    insertarNuevoRegistroSignosVitales () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        pas: this.nuevoPas,
        pad: this.nuevoPad,
        pulso: this.pulso,
        temperaturaAxilar: this.nuevoTemperaturaAxilar,
        temperaturaRectal: this.nuevoTemperaturaRectal,
        saturacionOxigeno: this.nuevoSaturacionO2,
        frecuenciaRespiratoria: this.nuevoFrecuenciaRespiratoria,
        eva: this.nuevoDolorEva,
        omv: this.nuevoOmvGlassgow,
        hgt: this.nuevoHemoglucotest,
        responsable: {
          nombre: 'Victor Guzman Contreras',
          rut: '19033183-0',
          cargo: 'Enfermero'
        }
      }
      this.nuevoPas = ''
      this.nuevoPad = ''
      this.pulso = ''
      this.nuevoTemperaturaAxilar = ''
      this.nuevoTemperaturaRectal = ''
      this.nuevoSaturacionO2 = ''
      this.nuevoFrecuenciaRespiratoria = ''
      this.nuevoDolorEva = ''
      this.nuevoOmvGlassgow = ''
      this.nuevoHemoglucotest = ''
      this.atencion.signosVitales.push(nuevoRegistro)
      this.dialogSignosVitales = false
    },

    // Signos Vitales
    modificarRegistroDeRiesgos () {
      this.dialogRiesgos = false
      this.atencion.riesgos.fechaHora = new Date().toISOString()
      this.atencion.riesgos.iri = this.nuevoRiesgoIri
      this.atencion.riesgos.upp = this.nuevoRiesgoUpp
      this.atencion.riesgos.caidas = this.nuevoRiesgoCaidas
      this.atencion.riesgos.responsable = {
        nombre: 'Francisco Perez Perez',
        rut: '19033183-0',
        cargo: 'Medico'
      }
      this.nuevoRiesgoIri = ''
      this.nuevoRiesgoUpp = ''
      this.nuevoRiesgoCaidas = ''
    },

    // Antecedentes Morbidos
    insertarNuevoRegistroAntecedentesMorbidos () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        antecedente: this.nuevoAntecedenteMorbido,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoAntecedenteMorbido = ''
      this.atencion.antecedentesMorbidos.push(nuevoRegistro)
      this.dialogAntecedentesMorbidos = false
    },

    // Alergias
    insertarNuevoRegistroAlergias () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        alergia: this.nuevoAlergia,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoAlergia = ''
      this.atencion.alergias.push(nuevoRegistro)
      this.dialogAlergias = false
    },

    // Evaluacion
    insertarNuevoRegistroEvaluacion () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        evaluacion: this.nuevoEvaluacion,
        responsable: {
          nombre: 'Francisco Perez Perez',
          rut: '19033183-0',
          cargo: 'Medico'
        }
      }
      this.nuevoEvaluacion = ''
      this.atencion.evaluaciones.push(nuevoRegistro)
      this.dialogEvaluacion = false
    },

    // Examen laboratorio
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

    // Examen Imagenologia
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

    // Nuevo Indicacion General
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

    // Nuevo Diagnostico
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

    // Nuevo Registro Enfermeria
    insertarNuevoRegistroEnfermeria () {
      const nuevoRegistro = {
        fechaHora: new Date().toISOString(),
        atencion: this.nuevoRegistroEnfermeria,
        responsable: {
          nombre: 'Victor Guzman Contreras',
          rut: '19033183-0',
          cargo: 'Enfermero'
        }
      }
      this.nuevoRegistroEnfermeria = ''
      this.atencion.atencionEnfermeria.push(nuevoRegistro)
      this.dialogAtencionesEnfermeria = false
    }
  },
  mounted () {
    this.cargarAtencion()
    this.cargarPaciente()
    this.cargarAntecedentesMorbidos()
    this.cargarListadoExamenesLaboratorio()
    this.cargarListadoExamenesImagenologia()
    this.cargarListadoMedicamentos()
    this.cargarlistadoDiagnosticos()
  },
  components: {
    TablaDatosSimplePaciente,
    RiesgosUrgencia
  }
}
</script>
