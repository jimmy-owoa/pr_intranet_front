<template>
  <v-card rounded="lg">
    <v-card-title class="title info--text justify-center pb-0">
      !GRACIAS POR RESPONDER A ESTA ENCUESTA!   
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12" class="d-flex justify-center">
          Este caso fue cerrado. Te invitamos a responder una encuesta de satisfación
        </v-col>
        <v-col cols="12" md="12" class="d-flex justify-center">
          ¿Qué tan satisfecho te encuentras con nuestro servicio?
        </v-col>

        <v-col cols="12" md="12" class="mt-2">
          <v-row justify="center">
            <v-col cols="1" class="text-center" v-for="n in 5" :key="n">
              <v-img
                v-if="value === n"
                class="mx-auto" 
                :src="require(`@/assets/images/face_${n}.jpg`)" 
                contain 
                height="50"
              ></v-img>
              <v-img
                v-else
                class="mx-auto cursor-pointer" 
                :src="require(`@/assets/images/face_${n}_bn.jpg`)" 
                contain 
                height="50" 
                @click="setAnswer(n)"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="info"
        class="mx-auto"
        outlined
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
    setAnswer(value) {
      this.value = value
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