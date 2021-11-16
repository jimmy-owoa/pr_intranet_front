<template>
  <v-card class="uk-card-box" rounded="lg" :to="url" height="170">
    <v-row justify="center" class="py-5">
      <component v-bind:is="icon" :height="40" :width="40" color="white"></component>
    </v-row>
    
    <p class="text-h6 ma-0 text-center white--text">
      {{ title }}
    </p>
  </v-card>
</template>
<script>
import ListCheckIcon from '../icons/ListCheckIcon'
import InteractiveIcon from '../icons/InteractiveIcon'
import ChartHistogramIcon from '../icons/ChartHistogramIcon'
export default {
  components: { 
    ListCheckIcon,
    InteractiveIcon,
    ChartHistogramIcon,
  },
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true},
    url: { type: String, required: true},
  },
  methods: {
    goTo() {
      this.$router.push(this.url)
    }
  },
}
</script>
<style lang="css">
.uk-card-box {
  color: #fff;
  background: #BB3D4D !important;
  text-decoration: none;
  padding: 30px;
}

.uk-card-box p {
  font-weight: 300 !important;
}
</style>