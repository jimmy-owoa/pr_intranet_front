<template>
  <v-div>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4" class="pt-33">
          <v-text-field
            v-model="user.full_name"
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
            v-model="user.supervisor"
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
            v-model="selectedSociety"
            :items="societies"
            label="Sociedad *"
            item-text="name"
            item-value="id"
            persistent-hint
            required
            v-on:change="sendData"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="description"
            label="Titulo de la  rendición *"
            maxlength="200"
            v-on:change="sendData"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: ["selectUser", 'descriptionDraft', 'societiesDraft'],
  data: () => ({
    user: null,
    description: null,
    societies: [],
    seleccionado: null,
    selectedSociety: null
  }),
  mounted() {
    this.$emit("selectUser", this.user);
    if(this.user != null){
      this.selectedSociety = this.user.society
    }
  },
  created() {
    this.user = this.$nuxt.$auth.user;
    this.getSocieties();
    this.getUser();
  },
  watch:{
    descriptionDraft: { 
      handler: function(val, oldVal) {
        this.description = val;
      }
    },
    societiesDraft: { 
      handler: function(val, oldVal) {
        this.selectedSociety = val;
      }
    } 
  },
  methods: {
    ...mapActions("expense-report", ["fetchSocieties", "fetchRequestUser"]),
    ...mapMutations("expense-report", ["setUser"]),
    async getUser() {
      const res = await this.fetchRequestUser();
      this.setUser(res);
    },
    async getSocieties() {
      const res = await this.fetchSocieties(this.user.id);
      this.societies = res;
    },
    sendData() {
      this.$emit("getValues", {
        description: this.description,
        society: this.selectedSociety
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
