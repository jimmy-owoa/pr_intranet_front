<template>
  <v-card rounded="lg" class="pl-3">
    <v-card-title>
      <h2 class="font-weight-thin hc__blue-text">{{question.name}}</h2>
    </v-card-title>

    <v-card-text class="subheading " v-html="question.content"></v-card-text>

    <v-card-actions>
      <v-row>
        <v-col cols="12" md="3">
          <v-img
            src="https://assets-intranet-security.s3.us-east-2.amazonaws.com/helpcenter_img_01.jpg"
            aspect-ratio="2.75"
            height="100"
          ></v-img>
        </v-col>
        <v-col cols="12" md="9" class="pl-4">
          <h2 class="font-weight-thin hc__blue-text">
            ¿Necesitas más ayuda?
          </h2>
          <v-col class="subheading mt-1">
            Escríbenos y nos comunicaremos contigo.
          </v-col>
          <v-btn outlined class="hc__color-2 mt-4" :to="'/crear-caso'">
            Crear un caso
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    question: { type: Object, required: true }
  }
}
</script>
<style lang="css">
.hc__color-2 {
  color:#0041F5 !important
}
</style>