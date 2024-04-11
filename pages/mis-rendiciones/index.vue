<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>

    <v-col cols="12" md="12">
      <v-flex xs12 md3>
        <v-select
          v-model="statusSelected"
          :items="status"
          label="Estado"
          outline
          @change="getRequests(statusSelected)"
        ></v-select>
      </v-flex>
    </v-col>
    

    <v-col cols="12" md="8" class="ma-0 py-0">
      <v-row>
        <v-col cols="12" v-if="requests.length === 0">
          <p class="text-center white--text">No tienes rendiciones creadas.</p>
        </v-col>
        <v-col
          cols="12"
          v-for="(request, i) in requests"
          :key="i"
          class="cursor-pointer"
          @click="goTo(request)"
        >
          <v-card rounded="lg">
            <v-card-text class="mb-1">
              <v-row>
                <v-col cols="9" md="10">
                  <p class="ma-0 hc__blue-text">
                   Rendición # {{ request.id }}
                  </p>
                  <p class="m-0">Creado: {{ request.created_at }}</p>
                  <p class="red-text" v-if="request.for_other">Rendición creada para un tercero</p>
                </v-col>
                <v-col cols="3" md="2">
                  <p :class="`ma-0 ${statusColor(request.status)}`">
                    <v-icon :class="statusColor(request.status)">
                      {{ statusIcon(request.status) }}
                    </v-icon>
                    {{ request.status }}
                  </p>
                  <p class="ma-0 " v-if="request.status == 'borrador'">
                    <v-btn
                      class="ma-1 px-0"
                      color="error"
                      plain
                      small
                      @click.stop="removeRequest(request.id )"
                    >
                      Eliminar
                    </v-btn>
                  </p>
                  <p class="ma-0" v-if="request.status == 'enviado'">
                    <v-btn
                      class="ma-1 px-0"
                      color="#ffa500"
                      plain
                      small
                      @click.stop="$router.push(`/rendicion-gastos/${request.id}/edit`)"
                    >
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                      Editar
                    </v-btn>
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
  components: {
    Breadcrumbs,
    CardInfoA,
  },
  data: () => ({
    breadcrumbs: [
      { to: "/", text: "Inicio", disabled: false, exact: true },
      { to: "", text: "Mis Rendiciones", disabled: true },
    ],
    requests: [],
    statusSelected: 'Todos',
    status: ["Todos", "Enviado", "Aprobado", "Atendiendo", "Resuelto", "Borrador"]
  }),
  methods: {
    ...mapActions("expense-report", ["fetchRequests", "destroyRequest"]),
    async getRequests(status = "Todos") {
      const res = await this.fetchRequests(status);
      this.requests = res;
    },
    goTo(request) {
      if (request.status == 'borrador'){
        this.$router.push(`/rendicion-gastos/${request.id}/edit`);
      }else{
        this.$router.push(`/mis-rendiciones/${request.id}`);
      }
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
    removeRequest(id){
      this.destroyRequest(id).then(res => {
        if (res.success) {
          this.swalAlert();
          this.$router.push("/");
        }
      });
    },
    swalAlert() {
      return this.$swal({
        title: "Borrador Eliminado Correctamente",
        text: "",
        icon: "success"
      });
    },
  },
  created() {
   
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getRequests();
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
.red-text {
  color: #FF0000;
}
</style>