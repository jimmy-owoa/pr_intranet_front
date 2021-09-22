<template>
  <v-app>
    <MenuNavbar />
    <!-- <Navbar /> -->
    <v-main class="uk-background-primary">
      <v-container style="margin-top: 30px">
        <v-row no-gutters class="d-flex justify-center">
          <v-col cols="12" lg="12" xl="10" class="pa-0 ma-0">
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
  color: #2196F3
}

.cursor-pointer {
  cursor: pointer;
}

.uk-background-primary {
  background-color: #2196F3;
}

.uk-overtitle {
  font-weight: 300;
  font-size: 1.2rem;
  text-transform: uppercase !important;
  text-align: center;
  color: white;
  letter-spacing: 3px;
}

.uk-heading-title {
  font-size: 5.2rem;
  line-height: 1;
  text-align: center;
  color: white;
  letter-spacing: 2px;
}
</style>