<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>
    <v-col cols="12">
      <v-card rounded="lg" style="padding: 10px;">
        <h1 class="title hc__blue-text text-center my-4">Rendición de gastos n°{{ this.request.id}}</h1>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" sm="12" class="pl-5">
              <h2 class="mb-4">Información de tu rendición</h2>
              <p class="mt-2">Descripción: {{ this.request.description }}</p>
              <p v-if="this.request.user" class="mt-2">Usuario: {{ this.request.user.full_name }}</p>
              <p class="mt-2">Supervisor: {{ this.request.supervisor }}</p>
              <p class="mt-2">Sociedad: {{ this.request.society }}</p>
              <p class="mt-2">Local: {{ this.request.is_local ? 'Sí' : 'No' }}</p>
              <p class="mt-2">Pais destino de reembolso: {{ this.request.destination_country_id? this.request.destination_country_id : 'No definido' }}</p>
              <p class="">Monto total: {{ this.request.divisa_id }} {{ this.request.total }}</p>
              <p>Fecha de pago: {{this.request.payment_date}}</p>
              <p>Metodo de pago: {{this.request.payment_method_id}}</p>
            </v-col>
            <v-col cols="12" md="6" sm="12" class="d-flex justify-content-center">
              <Status :status="this.request.status"></Status>
            </v-col>
            <v-col class="m-3">
              <h2 class="mb-4">Detalle</h2>
              <show-invoices :invoices="this.request.invoices"></show-invoices>
            </v-col>
          </v-row>
        </v-card-text>

        <v-row style="background-color: #fff8f8; margin: 20px; border-radius: 5px;" v-if="loaded && this.request.messages.length">
          <v-col md="12">
            <h2 class="title ma-0 hc__blue-text">Chat</h2>
          </v-col>
          <v-col md="12" style="max-height: 300px;overflow: auto;">
            <div class="div" v-for="message in this.request.messages" :key="message.id" >
              <v-row v-if="message.user.id != currentUser.id">
                <v-col md="4">
                  <div class="message-box">
                    <span>{{message.message}}</span>
                    <span v-if="message.files.length">
                      <v-btn icon small v-for="file in message.files" :href="file" :key="file.id" style="margin:5px">
                        <v-icon color="#007356"> mdi-file-download</v-icon>
                      </v-btn>
                    </span>
                    <br>
                    <span style="font-size: 12px;">{{message.user.name}} - {{message.created_at}}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row v-else justify="end">
                <v-col md="4">
                  <div class="message-box-end">
                    <span>{{message.message}}</span>
                      <span v-if="message.files.length">
                        <v-btn icon small v-for="file in message.files" :href="file" :key="file.id" style="margin:5px">
                          <v-icon color="white"> mdi-file-download</v-icon>
                        </v-btn>
                      </span>
                    <br>
                    <span style="font-size: 12px;">{{message.user.name}} - {{message.created_at}}</span>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col md="12" v-if="this.request.status != 'resuelto'">
            <div class="send-message-box">
            <v-form>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs11 md11>
                    <v-textarea
                      v-model="message.content"
                      label="Mensaje"
                      placeholder="Escribe tu mensaje..."
                      auto-grow
                      outline
                      rows="2"
                      color="success"
                      hide-details
                    ></v-textarea>
                  </v-flex>

                  <v-flex xs1 md1 align-self-center text-center>
                    <v-file-input
                      v-model="message.files"
                      hide-input
                      multiple
                      truncate-length="15"
                    ></v-file-input>
                  </v-flex>

                  <v-flex xs12 md12>
                    <p v-if="this.message.files.length === 1" class="my-auto">{{ this.message.files.length }} archivo adjunto </p>
                    <p v-else class="my-auto">{{ this.message.files.length }} archivos adjuntos </p>

                    <v-btn 
                      class="ml-0" 
                      color="success"
                      :disabled="!message.content.length || loading || this.request.status == 'resuelto'"
                      @click="handleCreateMessage()"
                    >
                      <v-progress-circular
                        :size="20"
                        indeterminate
                        color="success"
                        class="mr-1"
                        v-show="loading"
                      ></v-progress-circular>
                      Responder
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-form>
          </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12 text-center">
      <v-btn
        v-if="request.status == 'enviado'"
        class="ma-1"
        color="warning"
        @click.stop="$router.push(`/rendicion-gastos/${request.id}/edit`)"
        >
        <v-icon>mdi-pencil</v-icon>
        Editar
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import Status from "@/components/expense-report/Status.vue"
import ShowInvoices from "@/components/expense-report/ShowInvoices.vue"

export default {
  components: {
    Breadcrumbs,
    Status,
    ShowInvoices
  },
  data: () => ({
    request: {},
    loaded: false,
    message: {
      content: '',
      files: []
    },
    loading: false,
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
    ...mapActions("expense-report", ["fetchRequest", "createMessage"]),
    async getRequest() {
      const res = await this.fetchRequest(this.$route.params.id)
      this.request = res
      this.loaded = true; 
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
    
    async handleCreateMessage() {
      this.loading = true
      const formData = this.setFormData()
      const payload = formData
      const res = await this.createMessage(payload)

      if (res.success) {
        this.message.content = ""
        this.message.files = []
        this.getRequest()
      }
      
      this.loading = false
    },
    setFormData() {
      const formData = new FormData()
      formData.append("message[message]", this.message.content)
      formData.append("request_id", this.request.id)
      formData.append("message[user_id]", this.$nuxt.$auth.user.id)
      for (let file of this.message.files) {
        formData.append("message[files][]", file);
      }
      return formData
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
  color:red !important
}

.hc__color-attended {
  color: #2196f3 !important
}

.hc__color-close {
  color:#4caf50 !important
}
.chat-box{
  background-color: #e9e9e9;
  padding: 40px;
  margin: 10px 50px;
  border-radius: 20px;
  height: 400px;
}
.message-box{
  background-color: white;
  border-radius: 0px 15px 15px 15px;
  padding: 15px 10px;
  color:black; 
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
}
.message-box-end{
  background-color: rgb(38, 79, 123);
  border-radius: 15px 0px 15px 15px;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  padding: 15px 10px;
  color:white; 
}
.send-message-box{
  background: white;
  width: 100%;
  padding: 0px 20px;
  border-radius: 5px;
}
.container-message{
  height: 70%;
}
</style>