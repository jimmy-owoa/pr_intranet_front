<template>
  <v-app>
    <v-main class="uk-background-primary">
      <MenuNavbar v-if="this.$nuxt.$auth.user"/>
      <v-container style="margin-top: 80px">
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

export default {
  components: { 
    MenuNavbar 
  },
  name: 'Default',
  methods: {
    ...mapActions('user', ['fetchCurrentUser']),
  },
}
</script>

<style lang="css">
.hc__blue-text {
  color: #002DA4
}

.cursor-pointer {
  cursor: pointer;
}

.uk-background-primary {
  background-color: #EFEFEF;
}

.uk-overtitle {
  font-weight: 300;
  font-size: 1.2rem;
  text-transform: uppercase !important;
  text-align: center;
  color: #002DA4;
  letter-spacing: 3px;
}

.uk-heading-title {
  font-size: 5.2rem;
  line-height: 1;
  text-align: center;
  color: #002DA4;
  letter-spacing: 2px;
}
</style>