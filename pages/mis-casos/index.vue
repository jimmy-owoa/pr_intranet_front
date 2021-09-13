<template>
  <v-row>
    <v-col cols="12">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>

    <v-col cols="12" md="8" class="ma-0 pa-0">
      <v-row>
        <v-col cols="12" v-for="(ticket, i) in tickets" :key="i" class="pointer" @click="goTo(ticket.id)">
          <v-card>
            <v-card-text class="mb-1">
              <v-row>
                <v-col cols="10" md="11">
                  <p class="ma-0 hc__blue-text"># {{ ticket.id }} - {{ ticket.category }}</p>
                  <p>Creado: {{ ticket.created_at }}</p>
                </v-col>
                <v-col cols="2" md="1">
                  <p :class="`ma-0 ${statusColor(ticket.status)}`">
                    <v-icon :class="statusColor(ticket.status)">{{ statusIcon(ticket.status) }}</v-icon>
                    {{ ticket.status }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="3" :class="paddingCardInfo()">
      <CardInfoTicketB />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import CardInfoTicketB from '@/components/helpcenter/CardInfoB'

export default {
  components: {
    Breadcrumbs,
    CardInfoTicketB
  },
  data: () => ({
    breadcrumbs: [
      { to: "/", text: "Inicio", disabled: false, exact: true },
      { to: "", text: "Mis casos", disabled: true }
    ],
    tickets: []
  }),
  methods: {
    ...mapActions("helpcenter", ["fetchTickets"]),
    async getTickets() {
      const res = await this.fetchTickets()
      this.tickets = res
    },
    goTo(id) {
      this.$router.push(`/centro-de-ayuda/mis-casos/${id}`)
    },
    statusIcon(status) {
      if (status === "Abierto") return "history"
      else if (status === "Atendido") return "cached"
      else return "done_all"
    },
    statusColor(status) {
      if (status === "Abierto") return "hc__color-open"
      else if (status === "Atendido") return "hc__color-attended"
      else return "hc__color-close"
    },
    paddingCardInfo() {
      return this.$vuetify.breakpoint.smAndDown ? 'pt-3' : 'pl-2'
    }
  },
  created() {
    this.getTickets()
  },
  mounted(){
    window.scrollTo(0, 0);
  },
}
</script>
<style lang="css">
.hc__blue-text {
  color: #1B0088
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