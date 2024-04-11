<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>
    <!-- <v-col cols="12">
      <CardInfo/> 
    </v-col> -->
    <v-col cols="12" md="12" class="py-0">
      <ExpenseReport :ticket="ticket" @submitForm="submitForm" />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import ExpenseReport from '~/components/expense-report/ExpenseReport.vue'
// import CardInfo from '~/components/helpcenter/CardInfo.vue'

export default {
  layout: 'default',
  components: {
    Breadcrumbs,
    ExpenseReport,
    // CardInfo
  },
  data: () => ({
    breadcrumbs: [
      { to: "/", text: "Inicio", disabled: false, exact: true },
      { to: "", text: "Crear Rendición de Gastos", disabled: true }
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
        this.$router.push("/mis-rendiciones")
      }
    },
    swalAlert() {
      return this.$swal({
        title: "Rendicion creada correctamente",
        text: "Te confirmaremos por correo cuando tu rendición sea revisado",
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