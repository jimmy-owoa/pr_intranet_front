<template>
  <v-app>
    <v-main class="uk-background-primary">
      <MenuNavbar />
      <v-container style="margin-top: 70px">
        <v-row no-gutters justify="center">
          <v-col cols="12" lg="12" xl="10" class="pa-0 ma-0">
            <v-row>
              <v-col cols="12" md="3" class="px-0">
                <SideMenuMobile v-if="$vuetify.breakpoint.mobile" />
                <SideMenu v-else />
              </v-col>

              <v-col cols="12" md="8" class="px-0">
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
import SideMenu from '~/components/helpcenter/SideMenu'
import SideMenuMobile from '~/components/helpcenter/SideMenuMobile'
import MenuNavbar from '~/components/MenuNavbar'

export default {
  components: { 
    SideMenu,
    SideMenuMobile,
    MenuNavbar,
  },
}
</script>

<style lang="css">

</style>