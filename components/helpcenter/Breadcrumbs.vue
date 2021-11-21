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
  color: #BB3D4D;
  font-size: 1.3em;
}

.j-breadcrumbs > .v-breadcrumbs__divider {
  font-size: 1.3em;
  color: #BB3D4D !important;
}

.j-breadcrumbs div.v-breadcrumbs__item--disabled {
  color: #BB3D4D !important;
  font-weight: bold;
  font-size: 1.3em;
}
</style>