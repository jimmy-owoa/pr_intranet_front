<template>
  <v-div>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="5">
          <p class="m-0">Digite el nombre del usuario que va a rendir</p>
          <v-autocomplete
            v-model="user"
            :label="user"
            :items="items"
            item-text="name"
            item-value="id"
            :search-input.sync="search"
            persistent-hint
            flat
            cache-items
            :loading="isLoading"
            return-object
            required
            @change="updateUser(user)"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="2" class="pt-33" v-if="this.user != null">
          <v-text-field
            v-model="user.legal_number"
            label="Código"
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" class="pt-33" v-if="this.user != null">
          <v-text-field
            v-model="user.email"
            label="Correo electrónico"
            required
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" v-if="this.user != null">
          <v-text-field
            v-model="user.id_exa_boss"
            label="Supervisor"
            required
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" v-if="this.user != null">
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
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    user: null
  }),
  methods: {
    updateUser(user) {
      this.user = user;
    }
  },
  watch: {
    search(val) {
      // Items have already been loaded
      let all_results = [];
      let all_ids = [];
      if (this.search == null || this.search.length < 3) return;
      this.isLoading = true;
      // Lazily load input items
      this.$axios
        .get(`search/users?search=${val}`)
        .then(res => res.data.users)
        .then(res => {
          this.items = res;
          this.$emit("selectUser", this.user);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
<style lang="css">
.pt-33 {
  padding-top: 33px;
}
.m-0 {
  margin: 0px !important;
}
</style>
