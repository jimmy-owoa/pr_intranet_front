<template>
  <DynamicForm>
    <v-alert
      v-if="request.message == 'request'"
      :value="alert"
      color="success"
      dark
      border="top"
      icon="mdi-home"
      transition="scale-transition"
    >
      Has respondido a la rendición n° {{ request.request.id }}
    </v-alert>

    <v-card
      class="mx-auto"
      color="#FAFAFA"
      max-width="800"
      style="padding: 20px;"
      v-if="request.message == 'request' && alert != true"
    >
      <v-card-title class="responsive-title">
        <v-icon large left> mdi-checkbox-marked-circle</v-icon>
        <span class="text-h6 font-weight-light tt"
          >Rendición de Gastos n°{{ request.request.id }}</span
        >
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <p>Usuario: {{ request.user.name + " " + request.user.last_name }}</p>
            <p>Codigo: {{ request.user.legal_number }}</p>
          </v-col>
          <v-col cols="6">
            <p>Email: {{ request.user.email }}</p>
            <p>Monto Total: {{request.request.divisa_id}} {{ request.request.total }} </p>
          </v-col>
        </v-row>
        <p class="caption">Caso creado el {{ request.request_date }}</p>
        <p class="text-center text-h6" font>
          <strong>Descripción</strong>
        </p>
        <div class="description-box">
          <p>{{ request.request.description }}</p>
        </div>
      </v-card-text>

        <p class="text-center text-h6" font>
          <strong>Documentación de respaldo</strong>
        </p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                N°
              </th>
              <th class="text-left">
                Subcategoría
              </th>
              <th class="text-left">
                Descripción
              </th>
              <th class="text-left">
                Total
              </th>
              <th class="text-left">
                Archivos
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in request.invoices" :key="invoice.id">
              <td>{{ index + 1 }}</td>
              <td>{{ invoice.category }}</td>
              <td>{{ invoice.invoice.description }}</td>
              <td>{{ invoice.invoice.total }}</td>
              <td>
                <div v-for="file in invoice.files" :key="file.id">
                  <v-btn small v-bind:href="file" style="margin: 1px">
                    Descargar archivo
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div v-if="request.files.length" >
        <p class="text-center text-h6 pt-5" font>
          <strong style="margin-top: 20px;">Comprobante tarjeta de crédito</strong>
        </p>
        <div class="d-flex" style="display:block; overflow:auto;">
          <div v-for="file in (request.files)" :key="file.id">
            <v-btn small v-bind:href="file.url" style="margin: 1px">
              {{file.id + ') Descargar archivo'}}
            </v-btn>
          </div>
        </div>
      </div>
      <div class="t-center">
        <v-btn small color="success" @click="responseRequest(true)">
          Aceptar
        </v-btn>
        <v-btn small @click="responseRequest(false)"> Rechazar </v-btn>
      </div>
    </v-card>

    <!-- Skeleton progress circular -->

    <v-card
      class="mx-auto"
      width="600"
      v-if="request.message != 'request' && alert == true"
    >
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-card>
  </DynamicForm>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      request: {},
      show: false,
      response: null,
      response_data: {},
      alert: false
    };
  },
  methods: {
    ...mapActions("expense-report", ["fetchRequestState"]),
    ...mapActions("expense-report", ["fetchResponseRequest"]),
    async reviwTicket() {
      const res = await this.fetchRequestState(this.$route.params.token);
      console.log(res)
      this.request = res;
    },
    async responseRequest(r) {
      this.alert = true;
      let params = [r, this.request.request.id];
      const res = await this.fetchResponseRequest(params);
      this.response = res;
    }
  },
  mounted() {
    this.reviwTicket();
  }
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
.t-center {
  text-align: center;
  margin-top: 20px;
}
</style>
