<template>
    <v-row>
      <v-col cols="12" class="pt-0">
        <Breadcrumbs :items="breadcrumbs" />
      </v-col>

    <v-col cols="12" md="8" class="ma-0 py-0">
      <v-row>
        <v-col cols="12" v-if="requests.length === 0">
          <p class="">No tienes rendiciones por aprobar.</p>
        </v-col>
        <v-col
          cols="12"
          v-for="(request, i) in requests"
          :key="i"
          class="cursor-pointer"
          @click="goTo(request.url)"
        >
          <v-card rounded="lg">
            <v-card-text class="mb-1">
              <v-row>
                <v-col cols="9" md="10">
                  <p class="ma-0 hc__blue-text">
                   Rendición # {{ request.id }}
                  </p>
                  <p>Creado: {{ request.created_at }}</p>
                </v-col>
                <v-col cols="3" md="2">
                  <p :class="`ma-0 ${statusColor(request.status)}`">
                    <v-icon :class="statusColor(request.status)">
                      {{ statusIcon(request.status) }}
                    </v-icon>
                    {{ request.status }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="3" >
      <v-row>
        <v-col cols="12" md="12" :class="paddingCardInfo()" style="margin: 3px">
          <CardInfoA title="Crear Rendicion" icon="InteractiveIcon" url="/rendicion-gastos" />
        </v-col>
      </v-row>
    </v-col>
    </v-row>
  </template>
  
  <script>
import { mapActions } from "vuex"
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import CardInfoA from "@/components/helpcenter/CardInfoA"

export default {
  middleware: ["auth"],
  components: {
    Breadcrumbs,
    CardInfoA,
  },
  data: () => ({
    breadcrumbs: [
      { to: "/", text: "Inicio", disabled: false, exact: true },
      { to: "/mis-rendiciones", text: "Mis Rendiciones", disabled: false, exact: true },
      { to: "", text: "Pendientes", disabled: true },
    ],
    requests: [],
  }),
  methods: {
    ...mapActions("expense-report", ["fetchPendingRequests"]),
    async getRequests() {
      const res = await this.fetchPendingRequests();
      this.requests = res;
      console.log(res)
    },
    goTo(link) {
      window.open(link, "_blank");
    },
    statusIcon(status) {
      if (status === "aprobado" || status === "enviado" ) return "mdi-history";
      else if (status === "atendiendo" || status === 'borrador') return "mdi-cached";
      else return "mdi-check-all";
    },
    statusColor(status) {
      if (status === "aprobado" || status === "enviado") return "hc__color-open";
      else if (status === "atendiendo" || status === 'borrador') return "hc__color-attended";
      else return "hc__color-close";
    },
    paddingCardInfo() {
      return this.$vuetify.breakpoint.smAndDown ? "pt-3" : "py-0";
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getRequests();
  },
};
</script>
<style lang="css">
.hc__color-open {
  color: #e8114b !important;
}

.hc__color-attended {
  color: #2196f3 !important;
}

.hc__color-close {
  color: #4caf50 !important;
}
</style>