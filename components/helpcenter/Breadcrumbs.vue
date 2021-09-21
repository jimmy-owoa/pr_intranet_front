<template>
  <v-breadcrumbs class="j-breadcrumbs py-0" :items="items" divider=">"></v-breadcrumbs>
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
  color: white;
  font-size: 1.2em;
}

.j-breadcrumbs > .v-breadcrumbs__divider {
  font-size: 1.2em;
  color: white !important;
}

.j-breadcrumbs div.v-breadcrumbs__item--disabled {
  color: white !important;
  font-weight: bold;
}
</style>