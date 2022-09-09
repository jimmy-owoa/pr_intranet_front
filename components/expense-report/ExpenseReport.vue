<template>
  <form @submit.prevent="handleSubmitForm" multipart="true">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            color="#BB3D4D"
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
                ¿Quién es el titular de la rendición de gastos?
              </p>
              <div class="flex-center">
                <v-radio-group v-model="response_user_request" row>
                  <v-radio
                    label="Rindo gastos propios"
                    color="#BB3D4D"
                    value="Yo"
                    id="yo"
                    name="response_user_request"
                  ></v-radio>
                  <v-radio
                    label="Rindo gastos de un tercero"
                    color="#BB3D4D"
                    value="Otro"
                    id="otro"
                    name="response_user_request"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-container>
          </v-card>
          <v-card class="mb-5 h-card" v-if="n == 2">
            <RequestUser
              :descriptionDraft="description"
              :societiesDraft="societies"
              v-on:selectUser="setUser"
              v-if="response_user_request == 'Yo'"
              @getValues="setValues"
            />
            <RequestSearchUser
              :descriptionDraft="description"
              :societiesDraft="societies"
              v-on:selectUser="setUser"
              v-if="response_user_request == 'Otro'"
              @getValues="setValues"
            />
          </v-card>
          <!-- card paso 3  -->
          <v-card class="mb-5 h-card" v-if="n == 3">
            <RequestStepThree
              :isLocalDraft="is_local"
              :divisasDraft="divisas"
              @getValues="setCurrency"
            />
          </v-card>

          <v-card class="mb-5" v-if="n == 4">
            <v-alert border="top" colored-border type="info" elevation="1">
              Ingresar en forma separada cada documento.
            </v-alert>
            <v-flex d-flex justify-space-between>
              <div style="display:flex">
                <v-btn
                  class="mb-5"
                  depresse
                  color="#E8114b"
                  dark
                  @click="addNewInvoiceForm"
                >
                  Agregar Item
                </v-btn>
              </div>
              <!-- </v-file-input> -->
            </v-flex>
            <!-- empieza el item el item -->
            <v-container>
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="8">
                  <div class="panel panel-default" style="margin-bottom: 13px;">
                    <div
                      class="panel-body"
                      v-for="(request, index) in requests"
                      :key="request.id"
                    >
                      <h4>Ítem n° {{ index + 1 }}</h4>
                      <v-card
                        dense
                        outlined
                        type="error"
                        style="margin: 5px; padding: 20px"
                      >
                        <v-row>
                          <v-col cols="11">
                            <v-row style="padding-left: 10px !important;">
                              <v-col cols="12" md="4" class="py-0">
                                <v-autocomplete
                                  v-model="request.categories"
                                  :items="categories"
                                  label="Categoría"
                                  item-text="name"
                                  item-value="id"
                                  required
                                  persistent-hint
                                >
                                  <template v-slot:append>
                                    <v-tooltip top>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-btn icon v-bind="attrs" v-on="on">
                                          <v-icon color="#BB3D4D">
                                            mdi-help
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                      <span
                                        >Clasificar el ítem de la rendición por
                                        categorías.</span
                                      >
                                    </v-tooltip>
                                  </template>
                                </v-autocomplete>
                              </v-col>
                              <v-col cols="12" md="3" class="py-0">
                                <v-text-field
                                  v-model="request.subtotal"
                                  class="p-10"
                                  label="Monto"
                                  step="0.01"
                                  type="string"
                                  required
                                  v-on:change="updateTotal(request)"
                                >
                                  <template v-slot:append>
                                    <v-tooltip top>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-btn icon v-bind="attrs" v-on="on">
                                          <v-icon color="#BB3D4D">
                                            mdi-help
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                      <span
                                        >Insertar monto en la moneda a
                                        reembolsar. Por ejemplo, si las boletas
                                        <br />
                                        están en Euros pero el pago en la
                                        tarjeta de crédito fue en dólares,
                                        cargar monto en dólares.</span
                                      >
                                    </v-tooltip>
                                  </template>
                                </v-text-field>
                              </v-col>

                              <v-col
                                cols="12"
                                md="4"
                                style="margin: 1px 0px"
                                class="py-0"
                              >
                                <v-file-input
                                  v-model="request.file"
                                  truncate-length="15"
                                  novalidate
                                  name="files"
                                  multiple
                                  label="Subir documentos"
                                >
                                </v-file-input>
                                <template>
                                  <v-row style="justify-content: flex-end;">
                                    <v-dialog
                                      v-model="dialog"
                                      :retain-focus="false"
                                      persistent
                                      max-width="290"
                                    >
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <div
                                          v-if="request_id"
                                          style="text-align-last: end; margin-top: -10px;"
                                        >
                                          <v-chip
                                            x-small
                                            chip
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="
                                              SetFilesDialog(request.files_url)
                                            "
                                          >
                                            Ver documentos guardados
                                          </v-chip>
                                        </div>
                                      </template>
                                      <v-card>
                                        <CardFiles
                                          v-if="dialog == true"
                                          :files="files_url_dialog"
                                          @getValues="setDialog"
                                        />
                                      </v-card>
                                    </v-dialog>
                                  </v-row>
                                </template>
                              </v-col>
                              <v-col cols="12" md="12" class="py-0">
                                <v-text-field
                                  v-model="request.description"
                                  class="p-10"
                                  label="Descripción"
                                >
                                  <template v-slot:append>
                                    <v-tooltip top>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-btn icon v-bind="attrs" v-on="on">
                                          <v-icon color="#BB3D4D">
                                            mdi-help
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                      <span
                                        >Descripción del ítem de la rendición.
                                        Incorporar todo el detalle
                                        posible.</span
                                      >
                                    </v-tooltip>
                                  </template>
                                </v-text-field>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="1" md="1" class="py-0 centerr">
                            <v-row justify="center">
                              <v-col cols="12" md="12" class="btn-close">
                                <v-btn
                                  @click="deleteRequestForm(index, request.id)"
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  color="#E8114b"
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
                </v-col>
                <v-col
                  cols="6"
                  md="4"
                  style="text-align: center; margin-top: 30px"
                >
                  <v-btn class="mb-5" depresse color="success"
                    >Total Rendición:{{ totalComputed }}</v-btn
                  >
                  <div
                    v-if="is_local == false"
                    style="width:300px; margin:auto; margin-top:15px"
                    class="py-0"
                  >
                    <h4 class="font-weight-regular" style="margin-bottom:15px">
                      Adjuntar comprobante tarjeta de credito
                    </h4>
                    <v-file-input
                      v-model="files"
                      style="padding:0px; margin: auto"
                      novalidate
                      class="m-auto"
                      name="files"
                      truncate-length="14"
                      multiple
                      label="Subir documentos"
                    >
                      <template v-slot:append>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon color="#BB3D4D">
                                mdi-help
                              </v-icon>
                            </v-btn>
                          </template>
                          <span
                            >En caso de que el pago se haya realizado en una
                            moneda diferente a los soportes (boletas) <br />
                            adjuntar Estado de Cuenta/Movimientos Tarjeta de
                            crédito detallando los montos cobrados en la moneda
                            de pago. <br />
                            Por ejemplo, si las boletas están en Euros pero el
                            pago en la tarjeta de crédito fue en dólares,
                            adjuntar <br />
                            movimiento detallando el pago en dólar.
                          </span>
                        </v-tooltip>
                      </template>
                    </v-file-input>
                    <template>
                      <v-row style="justify-content: flex-end;">
                        <v-dialog
                          v-model="dialog"
                          :retain-focus="false"
                          persistent
                          max-width="290"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <div
                              v-if="request_id"
                              style="text-align-last: end; margin-top: -10px;"
                            >
                              <v-chip
                                x-small
                                chip
                                v-bind="attrs"
                                v-on="on"
                                @click="SetFilesDialog(filesDraft)"
                              >
                                Ver documentos guardados
                              </v-chip>
                            </div>
                          </template>
                          <v-card>
                            <CardFiles
                              v-if="dialog == true"
                              :files="files_url_dialog"
                              @getValues="setDialog"
                            />
                          </v-card>
                        </v-dialog>
                      </v-row>
                    </template>
                  </div>
                </v-col>
              </v-row>
            </v-container>

            <!-- termina el item -->
          </v-card>

          <!-- Paso 5 -->
          <v-card class="mb-5 h-card" v-if="n == 5">
            <RequestStepFive
              :selectedAccountsDraft="selectedAccounts"
              :country="country"
              :bankAccountDetailsDraft="bank_account_details"
              @getValues="setCountry"
            />
          </v-card>

          <v-btn
            color="#E8114b"
            style="color: white"
            @click="nextStep(n)"
            v-if="n != '5'"
            :disabled="
              (n == 2 && description == null) ||
                description == '' ||
                (n == 3 && divisas == null)
            "
          >
            Continuar
          </v-btn>
          <v-btn color="#E8114b" dark type="submit" v-if="n == '5'">
            Enviar
          </v-btn>
          <v-btn
            color="#E8114b"
            style="color: white"
            @click="saveDraft()"
            v-if="n == '4' || n == '5'"
          >
            Guardar Borrador
          </v-btn>
          <v-btn color="#E8114b" dark @click="downStep(n)" v-if="n != '1'">
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
import RequestStepThree from "~/components/expense-report/RequestStepThree.vue";
import RequestStepFive from "~/components/expense-report/RequestStepFive.vue";
import CardFiles from "~/components/expense-report/CardFiles.vue";

export default {
  components: {
    RequestUser,
    RequestSearchUser,
    DynamicForm,
    RequestStepThree,
    RequestStepFive,
    CardFiles,
  },
  props: ["requestDraft"],
  data: () => ({
    request_id: null,
    first_loading: true,
    show: false,
    categories: [],
    category_id: null,
    user: null,
    e1: 1,
    show: false,
    steps: 5,
    response_user_request: "Yo",
    totalCount: 1,
    total: 0,
    total_format: "",
    divisas: null,
    description: null,
    societies: [],
    requestH: {},
    files: null,
    filesDraft: [],
    country: null,
    is_local: true,
    selectedAccounts: "Transferencia bancaria moneda local",
    bank_account_details: null,
    files_url_dialog: [],
    requests: [
      {
        id: null,
        categories: [],
        subtotal: 0,
        description: null,
        file: [],
        files_url: []
      }
    ],
    dialog: false
  }),
  computed: {
    totalComputed() {
      this.total = 0;
      this.requests.forEach(
        request =>
          (this.total += Number(
            parseFloat(request.subtotal.toString().replace(/,/g, "")).toFixed(2)
          ))
      );
      (this.total = this.total.toString().split(".")),
        (this.total[0] = this.total[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
        (this.total = this.total.join("."));
      return this.total;
    }
  },
  watch: {
    requestDraft: {
      handler: function(val, oldVal) {
        this.requestH = val;
        this.request_id = this.$route.params.id;
        this.filesDraft = this.requestH.files;
        this.societies = this.requestH.society_id;
        this.description = this.requestH.description;
        this.divisas = this.requestH.divisa_id;
        if (this.requestH.is_local == "true") {
          this.is_local = true;
        } else {
          this.is_local = false;
        }
        if (this.$nuxt.$auth.user.id == this.requestH.user.user_id) {
          this.response_user_request = "Yo";
        } else {
          this.response_user_request = "Otro";
        }
        this.requests.shift();
        this.requestH.invoices.forEach(e =>
          this.requests.push({
            id: e.id,
            categories: e.category_id,
            subtotal: e.total,
            description: e.description,
            files_url: e.files_url,
            file: []
          })
        );
        this.selectedAccounts = this.requestH.payment_method_id;
        this.country = this.requestH.destination_country_id;
        this.bank_account_details = this.requestH.bank_account_details;
      }
    }
  },
  created() {
    if (this.user == null) {
      this.user = this.$nuxt.$auth.user;
    }
    // this.getSocieties();
    this.getCategories();
  },
  methods: {
    ...mapActions("expense-report", [
      "fetchSocieties",
      "fetchCategories",
      "createRequest",
      "createRequestDraft",
      "updateRequest"
    ]),
    async getSocieties() {
      const res = await this.fetchSocieties(this.user.id);
      this.societies = res;
    },
    async getCategories() {
      const res = await this.fetchCategories();
      this.categories = res;
    },
    setFormData(state) {
      const formData = new FormData();
      formData.append("request[request_state]", state);
      if (this.request_id) {
        formData.append("request[id]", this.request_id);
      }
      formData.append("request[user_id]", this.user.id);
      formData.append(
        "request[divisa_id]",
        this.divisas != null ? this.divisas : "N/A"
      );
      formData.append("request[description]", this.description);
      formData.append("request[society_id]", this.societies);
      formData.append("request[payment_method_id]", this.selectedAccounts);
      formData.append(
        "request[bank_account_details]",
        this.bank_account_details
      );
      if (this.files != null) {
        for (let file of this.files) {
          formData.append("request[files][]", file);
        }
      }
      formData.append(
        "request[destination_country_id]",
        this.country != null ? this.country : "NULL"
      );
      formData.append("request[is_local]", this.is_local);
      for (var i = 0; i < this.requests.length; i++) {
        if (this.requests[i].id) {
          formData.append(`invoice[request${i}][id]`, this.requests[i].id);
        }
        formData.append(
          `invoice[request${i}][category_id]`,
          this.requests[i].categories
        );
        formData.append(
          `invoice[request${i}][total]`,
          this.requests[i].subtotal
        );
        formData.append(
          `invoice[request${i}][description]`,
          this.requests[i].description
        );
        for (let file of this.requests[i].file) {
          formData.append(`invoice[request${i}][files][]`, file);
        }
      }
      return formData;
    },
    updateTotal(i) {
      this.total = 0;
      this.requests.forEach(
        request =>
          (this.total += Number(
            parseFloat(request.subtotal.toString().replace(/,/g, "")).toFixed(2)
          ))
      );
      (this.total = this.total.toString().split(".")),
        (this.total[0] = this.total[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
        (this.total = this.total.join("."));

      this.requests.forEach(object => {
        if (object == i) {
          let partesNumero = i.subtotal.toString().split(".");
          partesNumero[0] = partesNumero[0].replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
          return (object.subtotal = partesNumero.join("."));
        }
      });
    },
    handleSubmitForm() {
      // this.$v.$touch();
      // if (this.$v.$invalid) return;
      let state = "envoy";
      if(this.request_id){
        const formData = this.setFormData(state);
        this.submitFormRequest(formData);
      }else{
        const formData = this.setFormData(state);
        this.submitForm(formData);
      }
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    downStep(n) {
      this.e1 = n - 1;
    },
    saveDraft() {
      let state = "draft";
      const formData = this.setFormData(state);
      this.submitFormRequest(formData);
    },
    duplicateEl() {
      this.totalCount++;
    },
    setUser(user) {
      this.user = user;
    },
    async submitForm(request) {
      const res = await this.createRequest(request);
      if (res.success) {
        this.swalAlert();
        this.$router.push("/");
      }
    },
    async submitFormRequest(request) {
      var res;
      if (this.request_id) {
        res = await this.updateRequest({
          request: request,
          id: this.request_id
        });
      } else {
        res = await this.createRequestDraft(request);
      }
      if (res.message == 'Request updated' || res.message == 'Request created') {
        this.swalAlert();
        this.$router.push("/");
      }else{
        this.swalAlerDraft();
        this.$router.push(`/rendicion-gastos/${res}/edit`);
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      }

    },
    swalAlert() {
      return this.$swal({
        title: "Rendición de gastos creada correctamente",
        text: "Te confirmaremos por correo cuando tu rendición sea revisado",
        icon: "success"
      });
    },
    swalAlerDraft() {
      return this.$swal({
        title: "Se creo correctamente el borrador de la rendición",
        text: "Puedes modificar esta rendicion desde mis rendiciones.",
        icon: "success"
      });
    },
    addNewInvoiceForm() {
      this.requests.push({
        id: null,
        categories: [],
        subtotal: 0,
        description: null,
        file: [],
        files_url: []
      });
    },
    deleteRequestForm(index, id) {
      this.requests.splice(index, 1);
      this.updateTotal();
      if (id) {
        this.$axios
          .delete("/expense_report_requests/destroy_invoice?id=" + id)
          .then(resp => {})
          .catch(error => {
            console.log(error);
          });
      }
    },
    setValues(data) {
      this.description = data.description;
      this.societies = data.society;
    },
    setCurrency(data) {
      this.divisas = data.divisa;
      this.is_local = data.is_local;
    },
    setCountry(data) {
      this.country = data.country;
      (this.selectedAccounts = data.selectedAccounts),
        (this.bank_account_details = data.bank_account_details);
    },
    selectFiles(request, fileList) {
      if (!fileList.length) return;
      request.file = fileList[0];
    },
    setFiles(file) {
      this.files = file;
    },
    setDialog(data) {
      this.dialog = false;
    },
    SetFilesDialog(files) {
      this.files_url_dialog = files;
      this.dialog = true;
    }
  }
};
</script>
<style lang="css">
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.h-card {
  height: 400px !important;
}
.center-text {
  padding-top: 10px;
}
.select-divisas {
  border-bottom: 1px solid black;
  margin-top: 20px;
  width: 200px;
}
.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.centerr {
  align-self: center !important;
}
.btn-close {
  padding: 0px;
}
</style>
