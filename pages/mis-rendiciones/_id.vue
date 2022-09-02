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
              <p class="title ma-0 hc__blue-text">Rendición de gastos n°{{ this.request.id}}</p>
              <p class="mt-2">Descripción: {{ this.request.description }}</p>
              <p class="">Monto total: {{ this.request.divisa_id }} {{ this.request.total }}</p>
            </v-col>
            <v-col cols="2" class="d-flex justify-content-center">
              <p :class="`ma-0 ${statusColor(this.request.status)}`">
                <v-icon :class="statusColor(this.request.status)">{{ statusIcon(this.request.status) }}</v-icon>
                {{ this.request.status }}
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

export default {
  middleware: ['auth'],
  components: {
    Breadcrumbs,
  },
  data: () => ({
    request: {},
  }),
  computed: {
    breadcrumbs() {
      let items = [
        { to: "/", text: "Inicio", disabled: false, exact: true },
        { to: "/mis-rendiciones", text: "Mis Rendiciones", disabled: false, exact: true },
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
    ...mapActions("expense-report", ["fetchRequest"]),
    async getRequest() {
      const res = await this.fetchRequest(this.$route.params.id)
      this.request = res
      console.log(this.request)
    },
    statusColor(status) {
      if (status == "aprobado" || status == "enviado") return "hc__color-open"
      else if (status === "atendiendo" || status == "borrador") return "hc__color-attended"
      else return "hc__color-close"
    },
    statusIcon(status) {
      if (status === "aprobado" || status == "enviado") return "mdi-history"
      else if (status === "atendiendo" || status == "borrador") return "mdi-cached"
      else return "mdi-check-all"
    },
  },
  created() {
    this.getRequest()
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