<template>
  <div>
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
              color="#002DA4"
              v-bind:value=true
           ></v-radio>
           <v-radio
              label="Extranjera"
              color="#002DA4"
              :value=false
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
                  <v-icon color="#002DA4">
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
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ['isLocalDraft', 'divisasDraft'],
  data: () => ({
    divisas: [],
    seleccionado: null,
    place_expense_report: true,
  }),
  watch:{
    isLocalDraft: {
      handler: function(val, oldVal) {
        if(val == 'true'){
          this.place_expense_report = true;
        }else{
          this.place_expense_report = false;
        }
      }
    },
    divisasDraft:{
      handler: function(val, oldVal) {
        this.seleccionado = val;
      }
    }
  },
  created() {
    this.getDivisas();
  },
  methods: {
    ...mapActions("expense-report", ["fetchDivisas"]),

    async getDivisas() {
      const res = await this.fetchDivisas();
      this.divisas = res.filter((item) => Object.keys(item)[0] !== 'N/A')
    },
    sendData() {
      this.$emit("getValues", {
        divisa: this.seleccionado,
        is_local: this.place_expense_report
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
