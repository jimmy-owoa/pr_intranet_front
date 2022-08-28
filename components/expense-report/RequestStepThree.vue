<template>
  <v-div>
    <v-row class="center">
      <v-col cols="12">
        <h3>Rendición</h3>
        <div class="flex-center">
          <v-radio-group
            v-model="place_expense_report"
            v-on:change="sendData"
            row
          >
            <v-radio
              label="Local"
              color="#BB3D4D"
              value="local"
           ></v-radio>
           <v-radio
              label="Extanjera"
              color="#BB3D4D"
              value="extranjera"
            ></v-radio>
          </v-radio-group>
        </div>
      </v-col>

      <v-col cols="4">
        <v-autocomplete
          v-model="seleccionado"
          :items="divisas"
          label="Divisa de reembolso *"
          :item-text=getItemText
          item-value="id"
          persistent-hint
          required
          v-on:change="sendData"
        >
        <template v-slot:append>
            <v-tooltip  
              top
             >
              <template v-slot:activator="{ on, attrs }">
                 <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="#BB3D4D">
                     mdi-help
                   </v-icon>
                </v-btn>
              </template>
              <span>Marcar la divisa en la cual se realizará el reembolso.</span>
            </v-tooltip>
           </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    divisas: [],
    seleccionado: null,
    place_expense_report: 'local',
  }),
  created() {
    this.getDivisas();
  },
  methods: {
    ...mapActions("expense-report", ["fetchDivisas"]),

    async getDivisas() {
      const res = await this.fetchDivisas();
      this.divisas = res;
    },
    sendData() {
      let local = true
      if(this.place_expense_report == 'local'){
        local = true
      }else{
        local = false
      }
      this.$emit("getValues", {
        divisa: this.seleccionado,
        is_local: local
      });
    },
    getItemText(item) {
      return Object.keys(item)[0]
    },
  }
};
</script>
<style scoped>
.center {
  text-align: center;
  justify-content: center;
}
</style>
