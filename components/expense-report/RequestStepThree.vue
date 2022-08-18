<template>
  <v-div>
      <v-row>
        <v-col>
          <select class="select-divisas" ref="seleccionado" v-on:change="sendData">
            <option :value="{}" selected disabled>
              Divisa de la rendición
            </option>
            <option 
              v-for="divisa in divisas" v-bind:value="Object.keys(divisa)[0]" :key='divisa.id' >
              {{ Object.keys(divisa)[0] }}
            </option>
          </select>
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
      this.$emit("getValues", {
        divisa: this.$refs.seleccionado.value,
      });
    }
  }
}

</script>