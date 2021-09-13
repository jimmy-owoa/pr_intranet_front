<template>
  <v-app>
    <v-main>
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
  methods: {
    ...mapActions('user', ['fetchCurrentUser']),
  },
  created() {
    this.fetchCurrentUser();
  },
}
</script>

<style lang="css">
.hc__blue-text {
  color: #1B0088
}
</style>