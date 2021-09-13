<template lang="">
  <v-card rounded="lg">
    <v-img
      src="https://assets-intranet-security.s3.us-east-2.amazonaws.com/helpcenter_img_02.png"
      aspect-ratio="2.75"
    ></v-img>
    
    <p class="text-h6 ma-0 font-weight-thin hc__blue-text text-center">
      ¿Necesitas ver tú historial de casos?
    </p>
    
    <v-card-actions class="text-xs-center">
      <v-btn outlined class="hc__color-2 mx-auto" :to="'/centro-de-ayuda/mis-casos'">
        Ir a Mis casos
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  
}
</script>
<style lang="css">
.hc__blue-text {
  color: #1B0088
}

.hc__color-2 {
  color:#E8114b !important
}
</style>