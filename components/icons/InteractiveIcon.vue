<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Outline"
    viewBox="0 0 24 24"
    :height="height"
    :width="width"
    :fill="color"
  >
    <path
      d="M23.707,22.293,22.63,21.216,20.9,19.489,23.689,16.7a1,1,0,0,0-.365-1.646L14.355,11.8a2,2,0,0,0-2.561,2.56l3.263,8.969a1,1,0,0,0,.722.635,1.007,1.007,0,0,0,.217.023,1,1,0,0,0,.707-.293L19.489,20.9l1.727,1.727,1.077,1.077a1,1,0,0,0,1.414-1.414ZM16.4,21.165l-2.724-7.49,7.49,2.724Z"
    />
    <path
      d="M10,20A10,10,0,1,1,20,10a1,1,0,0,1-2,0,8,8,0,1,0-8,8,1,1,0,0,1,0,2Z"
    />
    <path
      d="M8.084,15.62a1,1,0,0,1-.383-.076A6,6,0,1,1,15.547,7.71a1,1,0,1,1-1.848.764A4,4,0,1,0,8.468,13.7a1,1,0,0,1-.384,1.924Z"
    />
  </svg>
</template>
<script>
export default {
  props: {
    height: { type: Number, default: 40 },
    width: { type: Number, default: 40 },
    color: { type: String, default: "black" }
  }
}
</script>
<style>
</style>