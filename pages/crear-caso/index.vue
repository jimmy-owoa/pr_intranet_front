<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>

    <v-col cols="12" md="7" class="py-0">
      <TicketForm :ticket="ticket" @submitForm="submitForm" />
    </v-col>

    <v-col cols="12" md="3" :class="paddingCardInfo()">
      <CardInfoA 
        title="Ir a mis casos" 
        icon="ListCheckIcon"
        url="/mis-casos"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import TicketForm from '../../components/helpcenter/TicketForm'
import CardInfoA from '~/components/helpcenter/CardInfoA'

export default {
  layout: 'default',
  middleware: ['auth'],
  components: {
    Breadcrumbs,
    TicketForm,
    CardInfoA
  },
  data: () => ({
    breadcrumbs: [
      { to: "/", text: "Inicio", disabled: false, exact: true },
      { to: "", text: "Crear Caso", disabled: true }
    ],
    ticket: {
      subcategory_id: null,
      description: "",
      files: []
    },
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    ...mapActions("helpcenter", ["createTicket"]),
    async submitForm(ticket) {
      const res = await this.createTicket(ticket)
      if (res.success) {
        this.swalAlert()
        this.$router.push("/mis-casos")
      }
    },
    swalAlert() {
      return this.$swal({
        title: "Caso creado correctamente",
        text: "Te confirmaremos por correo cuando tu caso sea revisado",
        icon: "success"
      })
    },
    paddingCardInfo() {
      return this.isMobile ? 'pt-3' : 'py-0'
    }
  },
  mounted(){
    window.scrollTo(0, 0);
  },
}
</script>
<style lang="">
  
</style>