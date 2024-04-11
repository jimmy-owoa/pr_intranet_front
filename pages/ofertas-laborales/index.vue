<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>

    <v-col cols="12" md="7" class="py-0">
      <!-- listar ofertas -->
      <div v-for="oferta in ofertas" :key="oferta.id">
        <v-card class="mb-4">
          <v-card-title>{{ oferta.requested_position_title }}</v-card-title>
          <v-card-text>
            <div><strong>ID:</strong> {{ oferta.id }}</div>
            <div><strong>Educación Requerida:</strong> {{ oferta.required_education }}</div>
            <div><strong>Sistema de turno:</strong> {{ oferta.shift }}</div>
            <div><strong>Experiencia Requerida:</strong> {{ oferta.years_of_experience }} años</div>
          </v-card-text>
          <v-card-actions>
            <nuxt-link :to="`/ofertas-laborales/${oferta.id}`">
              <v-btn color="primary">Ver</v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>

    <v-col cols="12" md="3" :class="paddingCardInfo()">
      <CardInfoA 
        title="Ir a mis postulaciones" 
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
    components: {
      Breadcrumbs,
      TicketForm,
      CardInfoA
    },
    data: () => ({
      breadcrumbs: [
        { to: "/", text: "Inicio", disabled: false, exact: true },
        { to: "", text: "Ofertas-laborales", disabled: true }
      ],
      ticket: {
        subcategory_id: null,
        description: "",
        files: []
      },
      ofertas: [],
    }),
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown
      }
    },
    methods: {
      ...mapActions("helpcenter", ["createTicket", "fetchOfertas"]),
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
      },
      async fetchOfertasLaborales() {
      try {
        const response = await this.fetchOfertas()
        this.ofertas = response;
        console.log(this.ofertas)
      } catch (error) {
        console.error("Error al buscar ofertas laborales: ", error);
        // Manejar el error adecuadamente
      }
    },
    },
    mounted(){
      window.scrollTo(0, 0);
      this.fetchOfertasLaborales();
    },
  }
  </script>
  <style lang="">
    
  </style>