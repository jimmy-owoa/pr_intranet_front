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
      </v-row>
    </v-card-text>
  </v-div>
</template>

<script>
export default {
  props: ["selectUser"],
  data: () => ({
    user: null
  }),

  mounted() {
    this.$emit("selectUser", this.user);
  },
  created() {
    this.user = this.$nuxt.$auth.user;
  }
};
</script>
<style lang="css">
.pt-33 {
  padding-top: 33px;
}
</style>
