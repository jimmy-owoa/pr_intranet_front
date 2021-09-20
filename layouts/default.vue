<template>
  <v-app>
    <v-main>
      <!-- <Navbar /> -->
      <MenuNavbar />
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
import { mapActions } from 'vuex'
import MenuNavbar from '~/components/MenuNavbar.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  components: { Navbar, MenuNavbar },
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