<template>
  <v-card rounded="lg">
    <v-img
      src="https://assets-intranet-security.s3.us-east-2.amazonaws.com/helpcenter_img_01.jpg"
      aspect-ratio="2.75"
    ></v-img>
    

      <p class="text-h6 ma-0 font-weight-thin hc__blue-text text-center">
        ¿Necesitas más ayuda?
      </p>
      <p class="text-subtitle mt-1 text-center">
        Escríbenos y nos comunicaremos contigo.
      </p>
    <v-card-actions class="text-xs-center">
      <v-btn outlined class="hc__color-2 mx-auto" :to="'/mis-casos/crear-caso'">
        Crear un caso
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