<template>
  <v-div>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4" class="pt-33">
          <v-text-field
            v-model="user.name"
            label="Nombre"
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" class="pt-33">
          <v-text-field
            v-model="user.legal_number"
            label="Código"
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" class="pt-33">
          <v-text-field
            v-model="user.email"
            label="Correo electrónico"
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.id_exa_boss"
            label="Supervisor"
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field
            v-model="user.country"
            label="Oficina"
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="societies.name"
            :items="societies"
            label="Sociedad *"
            item-text="name"
            item-value="id"
            persistent-hint
            required
            v-on:change="sendData"
          ></v-autocomplete>
        </v-col>
        
        <v-col cols="12" md="3">
          <select
            class="select-divisas"
            ref="seleccionado"
            v-on:change="sendData"
          >
            <option :value="{}" selected disabled>
              Divisa de la rendición
            </option>
            <option
              v-for="divisa in divisas"
              v-bind:value="Object.keys(divisa)[0]"
            >
              {{ Object.keys(divisa)[0] }}
            </option>
          </select>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            v-model="description"
            outlined
            label="Servicios *"
            v-on:change="sendData"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
  </v-div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["selectUser"],
  data: () => ({
    user: null,
    description: null,
    divisas: [],
    societies: [],
    seleccionado: null
  }),
  mounted() {
    this.$emit("selectUser", this.user);
  },
  created() {
    this.user = this.$nuxt.$auth.user;
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
    },
    sendData() {
      this.$emit("getValues", {
        description: this.description,
        divisa: this.$refs.seleccionado.value,
        society: this.societies.name
      });
    }
  }
};
</script>
<style lang="css">
.pt-33 {
  padding-top: 33px;
}
.select-divisas {
  border-bottom: 1px solid black;
  width: 200px;
}
</style>
