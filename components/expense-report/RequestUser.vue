<template>
  <v-div>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="5" class="pt-33">
          <v-text-field
            v-model="user.name"
            label="Nombre"
            required
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
            required
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.id_exa_boss"
            label="Supervisor"
            required
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field
            v-model="user.country"
            label="Oficina"
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="subcategories.name"
            :items="subcategories"
            label="Subcategorías"
            item-text="name"
            item-value="id"
            persistent-hint
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="9">
          <v-textarea
            v-model="request.description"
            outlined
            label="Descripción de la rendición *"
          ></v-textarea>
        </v-col>
        <v-col cols="4" md="3">
          <v-btn @submit="sendData" class="btn btn-primary">
            Guardar
          </v-btn>
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
    subcategories: [],
    request: []
  }),

  mounted() {
    this.$emit("selectUser", this.user);
  },
  created() {
    this.user = this.$nuxt.$auth.user;
    this.getSubcategories();
  },
  methods: {
    ...mapActions("expense-report", ["fetchSubcategories"]),
    async getSubcategories() {
      const res = await this.fetchSubcategories();
      this.subcategories = res;
    },
    sendData(){
      this.$emit('getValues', {
        subcategories: this.subcategories,
        description: this.request.description
      })
      console.log(this.subcategories,)
    }
  }
};
</script>
<style lang="css">
.pt-33 {
  padding-top: 33px;
}
</style>
