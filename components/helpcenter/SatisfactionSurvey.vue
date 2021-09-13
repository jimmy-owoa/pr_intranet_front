<template>
  <v-card rounded="lg">
    <v-card-title class="title info--text justify-center pb-0">
      !GRACIAS POR RESPONDER A ESTA ENCUESTA!   
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 md12 class="d-flex justify-center">
          Este caso fue cerrado. Te invitamos a responder una encuesta de satisfación
        </v-flex>
        <v-flex xs12 md12 class="d-flex justify-center">
          ¿Qué tan satisfecho te encuentras con nuestro servicio?
        </v-flex>

        <v-flex xs12 md12 mt-2>
          <v-layout row wrap>
            <v-flex class="text-center" v-for="n in 5" :key="n">
              <v-img class="mx-auto" :src="require(`@/assets/face_${n}.jpg`)" contain height="50"></v-img>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex class="" v-for="n in 5" :key="n">
              <v-checkbox
                class="justify-center ma-0 pl-2"
                v-model="value"
                :value="n"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="info"
        text
        @click="handleCreateAnswer()"
        :disabled="!value"
      >
        Responder encuesta
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from "sweetalert2"

export default {
  props: {
    ticket: { type: Object, required: true },
  },
  data: () => ({
    value: null
  }),
  methods: {
    ...mapActions("helpcenter", ["createSatisfactionAnswer"]),
    showAlert() {
      return Swal.fire({
        title: "Gracias por tu respuesta.",
        icon: "success"
      })
    },
    async handleCreateAnswer() {
      const payload = { ticketId: this.ticket.id, value: this.value }
      const res = await this.createSatisfactionAnswer(payload)

      if (res.success) {
        this.value = null
        this.ticket.survey_answered = true
        this.showAlert()
      }
    }
  },
}
</script>
<style lang="">
  
</style>