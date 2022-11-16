<template>
  <v-div>
    <v-row class="center" justify="center">
        <v-col cols="12" md="4"> 
          <v-autocomplete
            v-model="selectedAccounts"
            :items="accounts"
            label="Método de pago *"
            :item-text=getItemText
            item-value="id"
            persistent-hint
            required
            v-on:change="sendData"
        ></v-autocomplete>
      </v-col>
        <v-col cols="12" md="8" v-if="selectedAccounts == 'Transferencia bancaria moneda local'">
            <div class="d-flex" style="width: 100%;" v-if="getUserAccount">
            <v-col cols="4"> 
              <v-text-field
              disabled
              outlined
              label="Banco"
              v-model="getUserAccount.bank_name">
              </v-text-field>
            </v-col>
            <v-col cols="4"> 
              <v-text-field
              disabled
              outlined
              label="Tipo de cuenta"
              v-model="getUserAccount.account_type">
              </v-text-field>
            </v-col>
            <v-col cols="4"> 
              <v-text-field
              disabled
              outlined
              label="Número de cuenta"
              v-model="getUserAccount.account_number">
              </v-text-field>
            </v-col>
          </div>
          <div v-else>
            <v-col cols="12" md="8">
              <v-text-field
                value="No hay registros de datos bancarios"
                label="Datos bancarios"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </div>

        </v-col>
        <v-col cols="12" md="8" v-if="selectedAccounts != 'Transferencia bancaria moneda local'">
          <div class="d-flex" style="width: 100%;">
            <v-col cols="12"> 
              <v-textarea height="100px"
                v-model="bank_account_details"
                persistent-hint
                outlined
                v-on:change="sendData">
                <template v-slot:label>
                  <div v-if="selectedAccounts == 'Transferencia bancaria moneda extranjera'">
                    Ingrese los datos de su cuenta bancaria en moneda extranjera  
                  </div>
                  <div v-if="selectedAccounts == 'Abono tarjeta de crédito'">
                    Ingrese los datos de tarjeta de crédito
                  </div>
                </template>
              </v-textarea>
            </v-col>
          </div>
        </v-col >
      <v-col cols="12" md="12" class="">
        <v-container
          class="px-0 center-cols"
          fluid
        >
          <v-checkbox
            v-model="office_checkbox"
            label="En caso de asignar el gasto de reembolso a una oficina en particular, marque aquí."
            v-on:change="sendData"
          ></v-checkbox>
        </v-container>
      </v-col>
      <v-col cols="12" md="6" v-if="office_checkbox"> 
        <v-container class="px-0 center-cols" >
          <v-autocomplete
            v-model="selectedCountry"
            :items="countries"
            label="País destino del reembolso *"
            :item-text="getItemText"
            :item-value="getItemValue"
            persistent-hint
            required
            v-on:change="sendData"
          >
            <template v-slot:append>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="#BB3D4D">
                      mdi-help
                    </v-icon>
                  </v-btn>
                </template>
                <span
                  >En caso de ser un reembolso particular de un país, clasificar el país, de lo contrario centro de costo.</span
                >
              </v-tooltip>
            </template>
          </v-autocomplete>
        </v-container>
      </v-col>
    </v-row>
  </v-div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ['selectedAccountsDraft', 'country', 'bankAccountDetailsDraft'],
  data: () => ({
    countries: [],
    selectedCountry: null,
    selectedAccounts: 'Transferencia bancaria moneda local',
    bank_account_details: [],
    accounts: [],
    office_checkbox: false,
  }),
  watch:{
    selectedAccountsDraft: {
      handler: function(val, oldVal) {
        this.selectedAccounts = val;
      }
    },
    country:{
      handler: function(val, oldVal) {
        this.selectedCountry = val;
        if(this.selectedCountry != 'NULL'){
          this.office_checkbox = true
        }
      }
    },
    bankAccountDetailsDraft:{
      handler: function(val, oldVal) {
        this.bank_account_details = val;
      }
    }
  },
  created() {
    this.getCountries();
    this.getPaymentMethod();
  },
  mounted(){
  },
  computed: {
    ...mapGetters("expense-report", ["getUser", "getUserAccount"])
  },
  methods: {
    ...mapActions("expense-report", ["fetchCountries", "fetchPaymentMethod"]),
    
    async getCountries() {
      const res = await this.fetchCountries();
      this.countries = res.filter((item) => Object.keys(item)[0] != 'NULL')
    },
    async getPaymentMethod() {
      const res = await this.fetchPaymentMethod();
      this.accounts = res;
    },
    getItemText(item) {
      return Object.keys(item)[0];
    },
    getItemValue(item){
      return Object.values(item)[0]
    },
    sendData() {
      if(this.office_checkbox == false){
        this.selectedCountry = null
      }
      this.$emit("getValues", {
        country: this.selectedCountry,
        selectedAccounts: this.selectedAccounts,
        bank_account_details: this.bank_account_details,
      });
    }
  },
};
</script>
<style scoped>
  .center-cols{
    display: flex;
    justify-content: center;
  }
</style>
