<template>
  <v-div>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="5">
          <p class="m-0">indicar por cuenta de quien esta rindiendo</p>
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
            v-on:change="sendData"
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
        <v-col cols="12" md="4" v-if="this.user != null">
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
        <v-col cols="12" md="3" v-show="this.user != null">
          <select class="select-divisas" ref="seleccionado" v-on:change="sendData">
            <option :value="{}" selected disabled>
              Divisa de la rendición
            </option>
            <option 
              v-for="divisa in divisas" v-bind:value="Object.keys(divisa)[0]" >
              {{ Object.keys(divisa)[0] }}
            </option>
          </select>
        </v-col>
        <v-col cols="12" md="12" v-if="this.user != null">
          <v-textarea
            v-model="description"
            outlined
            required
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
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    user: null,
    divisas: [],
    seleccionado: null,
    description: null,
    societies: []
  }),
  mounted() {
    this.$emit("selectUser", this.user);
  },
  created() {
    this.getSocieties();
    this.getDivisas();
  },
  methods: {
    ...mapActions("expense-report", ["fetchDivisas", "fetchSocieties"]),
    async getSocieties() {
      const res = await this.fetchSocieties();
      this.societies = res;
    },
    async getDivisas() {
      const res = await this.fetchDivisas();
      this.divisas = res;
    },
    sendData(){
      console.log(this.$refs.seleccionado.value)
      this.$emit('getValues', {
        divisa: this.$refs.seleccionado.value,
        description: this.description,
        user: this.user,
        society: this.societies.name
      });
     },
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
