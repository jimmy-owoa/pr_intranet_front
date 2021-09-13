<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row no-gutters class="d-flex justify-center">
          <v-col cols="12" lg="12" xl="10">
            <v-row>
              <v-col md="3">
                <SideMenu />
              </v-col>

              <v-col md="8">
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
export default {
  components: { 
    SideMenu 
  },
}
</script>

<style lang="css">
.hc__blue-text {
  color: #1B0088
}
</style>