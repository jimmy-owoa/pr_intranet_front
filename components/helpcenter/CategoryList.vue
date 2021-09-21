<template lang="">
  <v-row>
    <v-col cols="12" md="6" v-for="category in categories" :key="category.id">
      <v-card 
        :class="`pointer mb-2 py-3 ${isMobile ? '' : 'mr-2'}`" 
        max-width="600"
        rounded="lg"
        @click="$router.push(`/${category.slug}`)"
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
              <p class="text-h6 ma-0 text-center uk-category-name">
                {{ category.name }}
              </p>
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
<style>
.uk-category-name {
  font-weight: 300 !important;
  color: #2196F3;
}
</style>