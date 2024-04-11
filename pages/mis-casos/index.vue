<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>

    <v-col cols="12" md="8" class="ma-0 py-0">
      <v-row>
        <v-col cols="12" v-if="tickets.length === 0">
          <p class="text-center">No tienes postulaciones.</p>
        </v-col>
        <v-col
          cols="12"
          v-for="(ticket, i) in tickets"
          :key="i"
          class="cursor-pointer"
          @click="goTo(ticket.id)"
        >
          <v-card rounded="lg">
            <v-card-text class="mb-1">
              <v-row>
                <v-col cols="9" md="10">
                  <p class="ma-0 hc__blue-text">
                    # {{ ticket.id }} - {{ ticket.requested_position_title}}
                  </p>
                  <p>Creado: {{ ticket.created_at }}</p>
                </v-col>
                <v-col cols="2" md="2">
                  <span> {{ ticket.application_status }}</span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <!-- <v-col cols="12" md="3" :class="paddingCardInfo()">
      <CardInfoA title="Crear caso" icon="InteractiveIcon" url="/crear-caso" />
    </v-col> -->
  </v-row>
</template>
<script>
import { mapActions } from "vuex"
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import CardInfoA from "@/components/helpcenter/CardInfoA"

export default {
  components: {
    Breadcrumbs,
    CardInfoA,
  },
  data: () => ({
    breadcrumbs: [
      { to: "/", text: "Inicio", disabled: false, exact: true },
      { to: "", text: "Mis postulaciones", disabled: true },
    ],
    tickets: [],
  }),
  methods: {
    ...mapActions("helpcenter", ["fetchApplications"]),
    async getTickets() {
      const res = await this.fetchApplications();
      this.tickets = res;
      console.log(this.tickets)
    },
    goTo(id) {
      this.$router.push(`/mis-casos/${id}`);
    },
    paddingCardInfo() {
      return this.$vuetify.breakpoint.smAndDown ? "pt-3" : "py-0";
    },
  },
  created() {
    this.getTickets();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
<style lang="css">
.hc__color-open {
  color: red !important;
}

.hc__color-attended {
  color: #2196f3 !important;
}

.hc__color-close {
  color: #4caf50 !important;
}
</style>