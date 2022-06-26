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
          <v-card class="mb-5 h-card" v-if="n == 1">
            <v-container fluid class="center-text">
              <p class="text-center pt-4">
                ¿Quien es el titular de la rendción de gastos?
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
                  <label for="yo" class="p-radio">Yo</label>
                </div>

                <div class="center-checkout">
                  <input
                    type="radio"
                    value="Otro"
                    id="otro"
                    v-model="response_user_request"
                    name="response_user_request"
                  />
                  <label for="otro">Otro</label>
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
            />
          </v-card>
          <v-card class="mb-5" v-if="n == 3">
            <v-btn class="mb-5" depressed color="primary" @click="duplicateEl">
              Agregar rendición
            </v-btn>

            <DynamicForm
              v-on:selectDynamicForm="setDynamicForm"
              class="m-2"
              v-for="count in totalCount"
              :key="`component-${count}`"
              style="padding: 5px !important"

            />
          </v-card>
          <v-btn color="primary" @click="nextStep(n)" v-if="n != '3'">
            Continuar
          </v-btn>
          <v-btn color="primary" type="submit" v-if="n == '3'">
            Enviar
          </v-btn>
          <v-btn color="primary" v-if="n != '1'">
            Volver
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
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
    data: []
  }),
  created() {
    if (this.user == null) {
      this.user = this.$nuxt.$auth.user;
    }
  },
  methods: {
    ...mapActions("expense-report", ["createRequest"]),
    setFormData() {
      const formData = new FormData();
      formData.append("request[user_id]", this.user.id);
      formData.append("request[subcategories_id]", this.subcategories.id);
      formData.append("request[description]", this.request.description);
      console.log(formData)
      return formData;
    },
    handleSubmitForm() {
      // this.$v.$touch();
      // if (this.$v.$invalid) return;
      const formData = this.setFormData();
      this.submitForm(formData)
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
      console.log(this.user)
    },
    setDynamicForm(data) {
      console.log("Se actualizo el form");
      this.data = data;
      console.log(this.data)
    },
    async submitForm(request) {
      const res = await this.createRequest(request)
      if (res.success) {
        this.swalAlert()
        this.$router.push("/")
      }
    },
      swalAlert() {
      return this.$swal({
        title: "Rendición de gastos creada correctamente",
        text: "Te confirmaremos por correo cuando tu rendición sea revisado",
        icon: "success"
      })
    },
  }
};
</script>
<style lang="css">
.flex-center {
  text-align: center;
}
.h-card {
  height: 400px !important;
}
.center-text {
  padding-top: 80px;
}
</style>
