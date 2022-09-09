<template>
  <div>
    <v-card dense outlined type="error" style="margin: 5px">
      <v-row>
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
    divisas: [],
    data: []
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
    sendData(){
      this.data = {divisa: this.divisas}
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
