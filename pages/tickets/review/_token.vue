<template>
  <div>
    <!-- CARD DE APROBACION -->
    <v-card
      class="mx-auto"
      color="success"
      dark
      max-width="450"
      v-if="ticket.message == 'Ticket approved'"
    >
      <v-card-title class="responsive-title">
        <v-icon large left> mdi-checkbox-marked-circle</v-icon>
        <span class="text-h6 font-weight-light tt"
          >Rendición de Gastos n°{{ ticket.ticket.id }} Aprobada</span
        >
      </v-card-title>

      <v-card-text>
        <p>Usuario: {{ ticket.user.name + " " + ticket.user.last_name }}</p>
        <p>Codigo: {{ ticket.user.legal_number }}</p>
        <p>Email: {{ ticket.user.email }}</p>
        <p class="caption">Caso creado el {{ ticket.ticket_date }}</p>
        <p class="text-center text-h6" font>
          <strong>Descripción</strong>
        </p>
        <div class="description-box">
          <p>{{ ticket.ticket.description }}</p>
        </div>
      </v-card-text>

      <v-card-actions> </v-card-actions>
    </v-card>

    <!-- CARD DE RECHAZO -->

    <v-card
      class="mx-auto"
      color="#007356"
      dark
      max-width="450"
      v-else-if="ticket.message == 'Ticket rejected'"
    >
      <v-card-title class="responsive-title">
        <v-icon large left> mdi-cancel </v-icon>
        <span class="text-h6 font-weight-light"
          >Rendición de Gastos n°{{ ticket.ticket.id }} Rechazada</span
        >
      </v-card-title>

      <v-card-text>
        <p>Usuario: {{ ticket.user.name + " " + ticket.user.last_name }}</p>
        <p>Codigo: {{ ticket.user.legal_number }}</p>
        <p>Email: {{ ticket.user.email }}</p>
        <p class="caption">Caso creado el {{ ticket.ticket_date }}</p>
        <p class="text-center text-h6" font>
          <strong>Descripción</strong>
        </p>
        <div class="description-box">
          <p>{{ ticket.ticket.description }}</p>
        </div>
      </v-card-text>

      <v-card-actions> </v-card-actions>
    </v-card>

    <!-- CARD DE EXPIRADO -->

    <v-card
      class="mx-auto"
      width="600"
      v-else-if="ticket.message == 'Link expired'"
    >
      <v-alert dense border="left" type="warning"> El Link Expiró </v-alert>
    </v-card>

    <!-- Skeleton progress circular -->

    <v-card class="mx-auto" width="600" v-else>
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      ticket: {},
      show: false,
    };
  },
  methods: {
    ...mapActions("helpcenter", ["fetchTicketState"]),
    async reviwTicket() {
      const res = await this.fetchTicketState(this.$route.params.token);
      this.ticket = res;
    },
  },
  mounted() {
    this.reviwTicket();
  },
};
</script>
<style scoped>
.v-alert__wrapper .v-icon {
  padding: 5px;
}
#p-300 {
  left: 200px;
}
.description-box {
  background-color: rgb(173 161 161 / 19%);
  border-radius: 5px;
}
.description-box p {
  margin: 0;
  padding: 10px;
}
.v-card__text p {
  margin-bottom: 4px;
}
@media screen and (max-width: 538px) {
  .responsive-title {
    justify-content: center;
  }
  .responsive-title span {
    font-size: 15px !important;
  }
}
.v-progress-circular {
  margin: 1rem;
}
</style>
