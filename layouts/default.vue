<template>
  <v-app>
    <v-main>
      <!-- <v-app-bar fixed app color="primary" dark >
        <v-row>
          <v-col cols="12" sm="3" class="py-0"></v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" class="mt-6 py-0">
                    <v-text-field
                      placeholder="Buscar..."
                      clearable
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-app-bar> -->
      <v-container>
        <v-row no-gutters class="d-flex justify-center">
          <v-col cols="12" lg="12" xl="10">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Default',
  methods: {
    ...mapActions('user', ['fetchCurrentUser']),
  },
  created() {
    // let user_code = this.$route.query.user || ""
    // this.fetchCurrentUser(user_code);
  },
}
</script>

<style lang="css">
.hc__blue-text {
  color: #1B0088
}

.cursor-pointer {
  cursor: pointer;
}
</style>