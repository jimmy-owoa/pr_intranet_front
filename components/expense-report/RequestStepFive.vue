<template>
  <v-div>
    <v-row class="center">
      <v-col cols="12">
        <v-autocomplete
          v-model="selectedcountry"
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
                  <v-icon color="info">
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

      <v-col cols="12"> </v-col>
    </v-row>
  </v-div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    countries: [],
    selectedcountry: null
  }),
  created() {
    this.getCountries();
  },
  methods: {
    ...mapActions("expense-report", ["fetchCountries"]),

    async getCountries() {
      const res = await this.fetchCountries();
      this.countries = res;
    },
    getItemText(item) {
      return Object.keys(item)[0];
    },
    sendData() {
      this.$emit("getValues", {
        country: this.selectedcountry
      });
    }
  }
};
</script>
<style scoped></style>
