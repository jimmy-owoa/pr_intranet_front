<template>
  <v-div>
    <v-row class="center">
      <v-col cols="12">
        <v-autocomplete
          v-model="selectedCountry"
          :items="countries"
          label="País destino del reembolso *"
          :item-text="getItemText"
          item-value="id"
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
      </v-col>
        <v-col cols="12"> 
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
      <div class="d-flex" style="width: 100%;" v-if="selectedAccounts == 'Transferencia bancaria moneda local'">
        <v-col cols="4"> 
          <v-text-field
          disabled
          label="Banco"
          v-model="userAccounts.bank_name">
          </v-text-field>
        </v-col>
        <v-col cols="4"> 
        <v-text-field
          disabled
          label="Tipo de cuenta"
          v-model="userAccounts.account_type">
          </v-text-field>
        </v-col>
        <v-col cols="4"> 
          <v-text-field
          disabled
          label="Número de cuenta"
          v-model="userAccounts.account_number">
          </v-text-field>
        </v-col>
      </div>
      <div class="d-flex" style="width: 100%;" v-if="selectedAccounts != 'Transferencia bancaria moneda local'">
        <v-col cols="12"> 
          <v-textarea
            v-model="bank_account_details"
            persistent-hint
            outlined
            v-on:change="sendData">
            <template v-slot:label>
              <div>
                Datos Bancarios
              </div>
            </template>
          </v-textarea>
        </v-col>
      </div>
    </v-row>
  </v-div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    countries: [],
    selectedCountry: null,
    selectedAccounts: 'Transferencia bancaria moneda local',
    userAccounts: [],
    bank_account_details: [],
    accounts: []
  }),
  created() {
    this.getCountries();
    this.getAccounts();
    this.getPaymentMethod();
  },
  mounted(){
  },
  methods: {
    ...mapActions("expense-report", ["fetchCountries", "fetchAccounts", "fetchPaymentMethod"]),

    async getCountries() {
      const res = await this.fetchCountries();
      this.countries = res;
    },
    async getAccounts() {
      const res = await this.fetchAccounts();
      this.userAccounts = res;
    },
    async getPaymentMethod() {
      const res = await this.fetchPaymentMethod();
      this.accounts = res;
    },
    getItemText(item) {
      return Object.keys(item)[0];
    },
    sendData() {
      this.$emit("getValues", {
        country: this.selectedCountry,
        selectedAccounts: this.selectedAccounts,
        bank_account_details: this.bank_account_details,
      });
    },
        getItemText(item) {
      return Object.keys(item)[0]
    },
  },
};
</script>
<style scoped></style>
