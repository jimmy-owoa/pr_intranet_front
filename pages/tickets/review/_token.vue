<template>
  <div>
    <v-row class="mt-3">
      <v-card
        class="mx-auto"
        width="600"
        v-if="ticket.message == 'Ticket approved'"
      >
        <v-card-text>
          <h2>El Caso n° {{ ticket.ticket.id }} fue aprobado</h2>
        </v-card-text>
        <v-col cols="12">
          <p><span class="font-weight-bold">Usuario:</span>{{ ticket.user }} </p>
          <p>Descripcion del caso: {{ ticket.ticket.description }}</p>
          <p class="caption">Caso creado el {{ ticket.ticket_date }}</p>
        </v-col>
      </v-card>

      <v-card
        class="mx-auto"
        width="600"
        v-if="ticket.message == 'Ticket rejected'"
      >
        <v-card-text>
          <h2>El Caso n° {{ ticket.ticket.ticket_id }} fue aprobado</h2>
        </v-card-text>
        <v-col cols="12">
          <p><span class="font-weight-bold">Usuario:</span>{{ ticket.user }} </p>
          <p>Descripcion del caso: {{ ticket.ticket.description }}</p>
          <p class="caption">Caso creado el {{ ticket.ticket_date }}</p>
        </v-col>
      </v-card>

      <v-card
        class="mx-auto"
        width="600"
        v-if="ticket.message == 'Link expired'"
      >
        <v-card-text>
          <h2>El Caso n° {{ ticket.ticket.ticket_id }} fue aprobado</h2>
        </v-card-text>
        <v-col cols="12">
          <p><span class="font-weight-bold">Usuario:</span>{{ ticket.user }} </p>
          <p>Descripcion del caso: {{ ticket.ticket.description }}</p>
          <p class="caption">Caso creado el {{ ticket.ticket_date }}</p>
        </v-col>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      ticket: {},
    };
  },
  methods: {
    ...mapActions("helpcenter", ["fetchTicketState"]),
    async reviwTicket() {
      console.log(this.$route.params.token)
      const res = await this.fetchTicketState(this.$route.params.token);
      this.ticket = res;
      
    },
  },
  created() {
    this.reviwTicket();
  },
};
</script>
