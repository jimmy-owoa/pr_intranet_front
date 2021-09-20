<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row no-gutters class="d-flex justify-center">
          <v-col cols="12" lg="12" xl="10">
            <v-row>
              <v-col cols="12" md="3">
                <SideMenuMobile v-if="$vuetify.breakpoint.mobile" />
                <SideMenu v-else />
              </v-col>

              <v-col cols="12" md="8">
                <Nuxt />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from '~/components/helpcenter/SideMenu.vue'
import SideMenuMobile from '~/components/helpcenter/SideMenuMobile.vue'
export default {
  components: { 
    SideMenu,
    SideMenuMobile 
  },
}
</script>

<style lang="css">
.hc__blue-text {
  color: #1B0088
}
</style>