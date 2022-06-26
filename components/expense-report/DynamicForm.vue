<template>
  <div>
    <v-card dense outlined type="error" style="margin: 5px">
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="societies.name"
            :items="societies"
            label="Sociedad *"
            item-text="name"
            item-value="id"
            persistent-hint
            required
            v-on:click.capture="sendData"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="2">
          <v-autocomplete
            v-model="divisas"
            :items="divisas"
            label="Divisa *"
            item-text="name"
            item-value="id"
            persistent-hint
            required
            v-on:click.capture="sendData"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field class="p-10" label="Subtotal" required></v-text-field>
        </v-col>
      
        <v-col cols="12" md="3">
          <v-file-input class="p-10" show-size label="Adjunto"></v-file-input>
        </v-col>
        <v-col cols="12" md="1" class="btn-close">
          <v-btn class="mx-2" fab dark small color="error">
            <v-icon dark>
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["selectDynamicForm"],
  data: () => ({
    societies: [],
    divisas: [],
    data: []
  }),
  created() {
    this.getSocieties();
    this.getDivisas();
  },
  methods: {
    ...mapActions("expense-report", ["fetchSocieties", "fetchDivisas"]),
    async getSocieties() {
      const res = await this.fetchSocieties();
      this.societies = res;
    },
    async getDivisas() {
      const res = await this.fetchDivisas();
      this.divisas = res;
      console.log(this.divisas);
    },
    sendData(){
      this.data = {divisa: this.divisas, society: this.societies}
      this.$emit("selectDynamicForm", this.data);
    }
  }
};
</script>
<style>
.btn-close {
  text-align: center;
  padding-top: 25px;
}
.p-10 {
  padding: 10px;
}
</style>
