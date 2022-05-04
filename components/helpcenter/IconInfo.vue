<template>
  <v-row >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700"
    >
    
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#BB3D4D"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <span>
         <v-icon large>mdi-information</v-icon>
        </span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Rendición de Gastos
        </v-card-title>
        <v-card-text>Realiza tu rendición de gastos a través de este módulo. Como
          requisitos debes ingresar los siguientes datos como mínimo:
        <ul class="">
          <li>Ingresar la moneda de pago</li>
          <li>Ingresar el subtotal de la/las rendiciones cargadas</li>
          <li>Adjuntar todos los comprobantes de pago</li>
        </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
<style lang="css">
</style>