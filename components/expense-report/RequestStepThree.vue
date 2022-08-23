<template>
  <v-div>
    <v-row class="center">
      <v-col cols="12">
        <h3>Rendición</h3>
        <div class="flex-center">
          <div class="center-checkout">
            <input
              type="radio"
              value="Local"
              id="local"
              v-model="place_expense_report"
              name="place_expense_report"
              checked
              v-on:change="sendData"
            />
            <label for="yo" class="p-radio">Local</label>
          </div>

          <div class="center-checkout">
            <input
              type="radio"
              value="Extranjero"
              id="extranjero"
              v-model="place_expense_report"
              name="place_expense_report"
              v-on:change="sendData"
            />
            <label for="otro">Extanjera</label>
          </div>
        </div>
      </v-col>

      <v-col cols="4">
        <!-- <select
          class="select-divisas"
          ref="seleccionado"
          v-on:change="sendData"
        >
          <option :value="{}" selected disabled>
            Divisa de reembolso
          </option>
          <option
            v-for="divisa in divisas"
            v-bind:value="Object.keys(divisa)[0]"
            :key="divisa.id"
          >
            {{ Object.keys(divisa)[0] }}
          </option>
        </select> -->
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
                  <v-icon color="info">
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
    place_expense_report: 'Local',
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
      if(this.place_expense_report == 'Local'){
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
