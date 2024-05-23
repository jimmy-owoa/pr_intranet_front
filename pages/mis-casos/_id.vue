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
              <p class="title ma-0 hc__blue-text">#{{ ticket.id }} - {{ ticket.subcategory }}</p>
              <p class="mt-2">{{ ticket.description }}</p>
              <p><strong>Nombre del aplicante:</strong> {{ ticket.applicant_name }}</p>
              <p><strong>Email:</strong> {{ ticket.email }}</p>
              <p><strong>Teléfono:</strong> {{ ticket.phone }}</p>
              <p><strong>Fecha de postulación:</strong> {{ formatDate(ticket.created_at) }}</p>
            </v-col>

            <v-col cols="2" class="d-flex justify-content-center">
              <p :class="`ma-0 ${statusColor(ticket.application_status)}`">
                <v-icon :class="statusColor(ticket.application_status)">{{ statusIcon(ticket.application_status) }}</v-icon>
                {{ ticket.application_status }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import SatisfactionSurvey from '../../components/helpcenter/SatisfactionSurvey.vue'

export default {
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
        { to: "/mis-casos", text: "Mis postulaciones", disabled: false, exact: true },
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
    ...mapActions("helpcenter", ["fetchJobApplication", "createMessage"]),
    async getJobApplication() {
      const res = await this.fetchJobApplication(this.$route.params.id)
      this.ticket = res
    },
    async handleCreateMessage() {
      this.loading = true
      const payload = { ticketId: this.$route.params.id, content: this.message}
      const res = await this.createMessage(payload)

      if (res.success) {
        this.message = ""
        this.getJobApplication()
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
      if (status === "aprobado") return "hc__color-open"
      else if (status === "Atendido") return "hc__color-attended"
      else return "hc__color-close"
    },
    statusIcon(status) {
      if (status === "aprobado") return "mdi-history"
      else if (status === "Atendido") return "mdi-cached"
      else return "mdi-check-all"
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("es-ES", {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    },
    statusColor(status) {
      switch (status) {
        case 'recibida': return 'hc__color-open'; // Color rojo
        case 'en_revision': return 'hc__color-attended'; // Color azul
        case 'preseleccionada': return 'hc__color-attended'; // Color azul claro
        case 'evaluacion': return 'orange lighten-1'; // Color naranja
        case 'no_seleccionada': return 'grey darken-1'; // Color gris oscuro
        case 'seleccionado': return 'hc__color-close'; // Color verde
        default: return '';
      }
    },
    statusIcon(status) {
      switch (status) {
        case 'recibida': return 'mdi-email-receive';
        case 'en_revision': return 'mdi-file-document-edit-outline';
        case 'preseleccionada': return 'mdi-account-search-outline';
        case 'evaluacion': return 'mdi-scale-balance';
        case 'no_seleccionada': return 'mdi-close-circle-outline';
        case 'seleccionado': return 'mdi-check-all';
        default: return '';
      }
    }

  },
  created() {
    this.getJobApplication()
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
  color:red !important
}

.hc__color-attended {
  color: #2196f3 !important
}

.hc__color-close {
  color:#4caf50 !important
}
</style>