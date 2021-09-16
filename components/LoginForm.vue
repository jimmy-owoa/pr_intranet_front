<template>
  <v-card flat>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Correo electrónico"
          v-model="userInfo.email"
          type="text"
          outlined
          dense
          color="grey darken-2"
          required
          @blur="validator.email.$touch()"
          :error-messages="emailErrors"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="py-5 mx-auto" color="primary" @click="submitForm">Ingresar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    userInfo: Object,
    submitForm: Function,
    validator: Object,
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.validator.email.$dirty) return errors;
      !this.validator.email.required && errors.push("E-mail es requerido");
      return errors;
    },
  },
  methods: {

  }
};
</script>