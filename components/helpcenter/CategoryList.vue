<template lang="">
  <v-row>
    <v-col cols="12" md="6" v-for="category in categories" :key="category.id">
      <v-card 
        :class="`cyan--text pointer mb-2 hc__rounded-card py-3 ${isMobile ? '' : 'mr-2'}`" 
        max-width="600" 
        @click="$router.push(`/centro-de-ayuda/${category.slug}`)"
      >
        <v-row align="center" no-gutters>
          <v-col cols="2">
            <v-img
              :src="category.image"
              height="40px"
              contain
            ></v-img>
          </v-col>
          <v-col cols="10">
            <v-card-title>
              <p class="title hc__blue-text ma-0">{{ category.name }}</p>
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    categories: { type: Array, default: () => [] }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    }
  }
}
</script>
<style lang="">
  
</style>