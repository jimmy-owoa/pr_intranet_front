<template>
  <form @submit.prevent="handleSubmitForm" multipart="true">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
            Paso {{ n }}
          </v-stepper-step>

          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items style="padding: 5px !important;">
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card class="mb-5" v-if="n == 1">
            <v-container fluid class="center-text">
              <p class="text-center pt-4">
                ¿Quien es el titular de la rendición de gastos?
              </p>
              <div class="flex-center">
                <div class="center-checkout">
                  <input
                    type="radio"
                    value="Yo"
                    id="yo"
                    v-model="response_user_request"
                    name="response_user_request"
                    checked
                  />
                  <label for="yo" class="p-radio">Rindo gastos propios</label>
                </div>

                <div class="center-checkout">
                  <input
                    type="radio"
                    value="Otro"
                    id="otro"
                    v-model="response_user_request"
                    name="response_user_request"
                  />
                  <label for="otro">Rindo gastos de un tercero</label>
                </div>
              </div>
            </v-container>
          </v-card>
          <v-card class="mb-5 h-card" v-if="n == 2">
            <RequestUser
              v-on:selectUser="setUser"
              v-if="response_user_request == 'Yo'"
              @getValues="setValues"
            />
            <RequestSearchUser
              v-on:selectUser="setUser"
              v-if="response_user_request == 'Otro'"
              @getValues="setValues"
            />
          </v-card>
          <v-card class="mb-5" v-if="n == 3">
            <v-alert outlined type="info" text>
              Ingresar en forma separada cada documento.
            </v-alert>
            <v-flex d-flex justify-space-between>

              <v-btn
                class="mb-5"
                depresse
                color="primary"
                @click="addNewInvoiceForm"
              >
                Agregar rendición
              </v-btn>
              <v-btn class="mb-5" depresse color="success">Subtotal Rendición: {{ total }}</v-btn>
            </v-flex>

            <div class="panel panel-default" style="margin-bottom: 13px;">
              <div class="panel-body" v-for="(request, index) in requests">
                <h4>Rendición n° {{ index + 1 }}</h4>
                <v-card dense outlined type="error" style="margin: 5px; padding: 20px" >
                  <v-row>
                    <v-col cols="10">
                      <v-row style="padding-left: 10px !important;">
                        <v-col cols="12" md="3" class="py-0">
                          <v-autocomplete
                            v-model="request.subcategories.name"
                            :items="requests.subcategories"
                            label="Subcategoría"
                            item-text="name"
                            item-value="id"
                            persistent-hint
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3" class="py-0">
                          <v-text-field
                            v-model="request.subtotal"
                            class="p-10"
                            label="Monto"
                            required
                            type="number"
                            v-on:change="updateTotal"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" style="margin: auto" class="py-0">
                          <h2 class="subheading"></h2>
                          <input
                            type="file"
                            required
                            name="myfile"
                            @change="selectFiles(request, $event.target.files)"
                          />
                        </v-col>
                        <v-col cols="12" md="12" class="py-0">
                          <v-text-field
                            v-model="request.description"
                            class="p-10"
                            label="Descripción"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="2" class="py-0 centerr">
                      <v-row justify="center" >
                        <v-col cols="12"  md="12" class="btn-close">
                          <v-btn 
                            @click="deleteRequestForm(index)"
                            class="mx-2"
                            fab
                            dark
                            small
                            color="error"
                          >
                            <v-icon dark>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>
          </v-card>
          <v-btn color="primary" @click="nextStep(n)" v-if="n != '3'">
            Continuar
          </v-btn>
          <v-btn color="primary" type="submit" v-if="n == '3'">
            Enviar
          </v-btn>
          <v-btn color="primary" @click="downStep(n)" v-if="n != '1'">
            Volver
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import RequestUser from "~/components/expense-report/RequestUser.vue";
import RequestSearchUser from "~/components/expense-report/RequestSearchUser.vue";
import DynamicForm from "~/components/expense-report/DynamicForm.vue";

export default {
  components: {
    RequestUser,
    RequestSearchUser,
    DynamicForm
  },
  data: () => ({
    categories: [],
    category_id: null,
    user: null,
    e1: 1,
    steps: 3,
    response_user_request: null,
    totalCount: 1,
    total: 0,
    divisas: null,
    description: null,
    societies: [],
    requests: [
      {
        subcategories: [],
        subtotal: '',
        description: null,
        file: {}
      }
    ]
  }),
  created() {
    if (this.user == null) {
      this.user = this.$nuxt.$auth.user;
    }
    this.getSocieties();
    this.getSubcategories();
  },
  methods: {
    ...mapActions("expense-report", [
      "fetchSocieties",
      "fetchSubcategories",
      "createRequest"
    ]),
    async getSocieties() {
      const res = await this.fetchSocieties();
      this.requests.societies = res;
    },
    async getSubcategories() {
      const res = await this.fetchSubcategories();
      this.requests.subcategories = res;
      console.log(this.requests.subcategories);
    },
    setFormData() {
      const formData = new FormData();
      formData.append("request[user_id]", this.user.id);
      formData.append("request[divisa_id]", this.divisas);
      formData.append("request[description]", this.description);
      formData.append("request[society_id]", this.societies);
      for (var i = 0; i < this.requests.length; i++) {
        formData.append(
          `invoice[request${i}][subcategory_id]`,this.requests[i].subcategories.name
        );
        formData.append(
          `invoice[request${i}][total]`,
          this.requests[i].subtotal
        );
        formData.append(`invoice[request${i}][description]`, this.requests[i].description);
        formData.append(`invoice[request${i}][file]`, this.requests[i].file);
      }
      return formData;
    },
    updateTotal(){
      this.total = 0
      this.requests.forEach(request => 
      this.total += parseFloat(request.subtotal));
    },
    handleSubmitForm() {
      // this.$v.$touch();
      // if (this.$v.$invalid) return;
      const formData = this.setFormData();
      this.submitForm(formData);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    downStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n - 1;
      }
    },
    duplicateEl() {
      this.totalCount++;
    },
    setUser(user) {
      console.log("Se actualizo el usuario");
      this.user = user;
    },
    async submitForm(request) {
      const res = await this.createRequest(request);
      if (res.success) {
        this.swalAlert();
        this.$router.push("/");
      }
    },
    swalAlert() {
      return this.$swal({
        title: "Rendición de gastos creada correctamente",
        text: "Te confirmaremos por correo cuando tu rendición sea revisado",
        icon: "success"
      });
    },
    addNewInvoiceForm() {
      this.requests.push({
        subcategories: [],
        subtotal: 0,
        description: null,
        file: []
      });
    },
    deleteRequestForm(index) {
      this.requests.splice(index, 1);
      this.updateTotal()
    },
    setValues(data) {
      this.divisas = data.divisa;
      this.description = data.description;
      this.societies = data.society;
    },
    selectFiles(request, fileList) {
      if (!fileList.length) return;
      request.file = fileList[0];
    }
  }
};
</script>
<style lang="css">
.flex-center {
  text-align: center;
}
.h-card {
  height: 500px !important;
}
.center-text {
  padding-top: 10px;
}
.select-divisas {
  border-bottom: 1px solid black;
  margin-top: 20px;
  width: 200px;
}
.py-0{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.centerr{
  align-self: center !important;
}
</style>
