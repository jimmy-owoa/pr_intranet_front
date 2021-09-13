<template>
  <v-breadcrumbs class="j-breadcrumbs" :items="items" divider=">"></v-breadcrumbs>
</template>
<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
  }
}
</script>
<style lang="css">
.j-breadcrumbs a {
  text-decoration: none; 
  color: black;
  font-size: 1.2em;
}

.j-breadcrumbs > .v-breadcrumbs__divider {
  font-size: 1.2em;
  color: black !important;
}

.j-breadcrumbs a.v-breadcrumbs__item--disabled {
  color: black !important;
  font-weight: bold;
}
</style>