<template lang="html">
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 mx-auto" max-width="500">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>
              Iniciar Sesión
            </v-toolbar-title>
          </v-toolbar>
          
          <LoginForm
            :userInfo="userInfo"
            :validator="$v.userInfo"
            :submitForm="login"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import LoginForm from "~/components/LoginForm";

export default {
  middleware: "auth-login",
  components: {
    LoginForm,
  },
  data() {
    return {
      userInfo: {
        email: "rNkb3k8mgvD99GRZL7CwpPnBVuuAdukLHj0nT0FWGsE%3D",
      },
      alertSuccess: false,
      alertError: false,
    };
  },
  methods: {
    login() {
      this.$v.$touch()

      console.log(this.$v);
      if (this.$v.$invalid) return

      this.loginUser(this.userInfo.email)
    },
    async loginUser(email) {
      const response = await this.$auth.login({
        data: { user: { user_code: email } },
      })
      
      if (response.data.success) {
        this.$router.push("/")
      } else {
        this.alertError = true;
      }
    },
  },
  created() {
    let user_code = this.$route.query.code || ""
    this.loginUser(user_code)
  },
  // Validaciones
  mixins: [validationMixin],
  validations: {
    userInfo: {
      email: { required }
    },
  },
};
</script>
