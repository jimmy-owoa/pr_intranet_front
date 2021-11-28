<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>

    <v-col cols="12">
      <v-card rounded="lg">
        <v-card-text>
          <v-row>
            <v-col cols="10">
              <p class="title ma-0 hc__blue-text">#{{ ticket.id}} - {{ ticket.subcategory }}</p>
              <p class="mt-2">{{ ticket.description }}</p>
            </v-col>

            <v-col cols="2" class="d-flex justify-content-center">
              <p :class="`ma-0 ${statusColor(ticket.status)}`">
                <v-icon :class="statusColor(ticket.status)">{{ statusIcon(ticket.status) }}</v-icon>
                {{ ticket.status }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" class="mt-2">
      <v-card flat class="pa-2" v-if="ticket.chat_messages && ticket.chat_messages.length">
        <v-row>
          <v-col 
            cols="12"
            :class="`d-flex ${message.user_id === currentUser.id ? 'justify-end' : ''}`" 
            v-for="(message, i) in ticket.chat_messages" :key="i"
          >
            <v-col cols="12" md="5">
              <v-card :color="colorCard(message)" >
                <v-card-text class="pa-1 mb-1">
                  <p :class="colorText(message)">{{ message.content }}</p>
                </v-card-text>
              </v-card>
              
              <p class="caption" v-if="message.user_id === currentUser.id">
                {{ message.created_at }}
              </p>

              <p class="caption" v-else>
                {{ message.created_at }} - Asistente
              </p>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12" class="mt-1" v-if="!ticket.closed_at">
      <v-card>
        <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="message"
                  label="Mensaje"
                  placeholder="Escribe tu mensaje..."
                  auto-grow
                  outline
                  rows="1"
                  color="#067be2"
                  hide-details
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-btn 
                  class="ml-0" 
                  color="primary"
                  :disabled="!message.length || loading"
                  @click="handleCreateMessage()"
                >
                  <v-progress-circular
                    :size="20"
                    indeterminate
                    color="#067be2"
                    class="mr-1"
                    v-show="loading"
                  ></v-progress-circular>
                  Responder
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-col>

    <v-col cols="12" class="mt-2" v-if="ticket.closed_at && !ticket.survey_answered">
      <SatisfactionSurvey :ticket="ticket" />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import SatisfactionSurvey from '../../components/helpcenter/SatisfactionSurvey.vue'

export default {
  middleware: ['auth'],
  components: {
    Breadcrumbs,
    SatisfactionSurvey,
  },
  data: () => ({
    ticket: {},
    message: "",
    loading: false,
  }),
  computed: {
    breadcrumbs() {
      let items = [
        { to: "/", text: "Inicio", disabled: false, exact: true },
        { to: "/mis-casos", text: "Mis casos", disabled: false, exact: true },
        { to: "", text: `${this.$route.params.id}`, disabled: true }
      ]

      if (this.$vuetify.breakpoint.smAndDown) items.splice(-1)
      
      return items
    },
    currentUser() {
      return this.$nuxt.$auth.user
    }
  },
  methods: {
    ...mapActions("helpcenter", ["fetchTicket", "createMessage"]),
    async getTicket() {
      const res = await this.fetchTicket(this.$route.params.id)
      this.ticket = res
    },
    async handleCreateMessage() {
      this.loading = true
      const payload = { ticketId: this.$route.params.id, content: this.message}
      const res = await this.createMessage(payload)

      if (res.success) {
        this.message = ""
        this.getTicket()
      }
      
      this.loading = false
    },
    colorCard(message) {
      return `${message.user_id === this.currentUser.id ? '#067be2' : 'indigo lighten-5'}`
    },
    colorText(message) {
      return `${message.user_id === this.currentUser.id ? 'ma-0 white--text' : 'ma-0 lighten-5'}`
    },
    statusColor(status) {
      if (status === "Abierto") return "hc__color-open"
      else if (status === "Atendido") return "hc__color-attended"
      else return "hc__color-close"
    },
    statusIcon(status) {
      if (status === "Abierto") return "mdi-history"
      else if (status === "Atendido") return "mdi-cached"
      else return "mdi-check-all"
    },
  },
  created() {
    this.getTicket()
  },
  mounted(){
    window.scrollTo(0, 0);
  },
}
</script>
<style lang="css">
.hc__rounded-card{
  border-radius: 0.5rem
}

.hc__color-open {
  color:#E8114b !important
}

.hc__color-attended {
  color: #2196f3 !important
}

.hc__color-close {
  color:#4caf50 !important
}
</style>