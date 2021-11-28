<template>
  <v-card rounded="lg">
    <v-card-text>
      <form @submit.prevent="handleSubmitForm" multipart="true" v-if="currentUser">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.full_name"
              label="Nombre Completo"
              required
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.legal_number"
              label="R.U.T."
              required
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.email"
              label="Correo electrónico"
              required
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.country"
              label="Oficina"
              required
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="ticket.category_id"
              :items="categories"
              label="Categoría *"
              item-text="name"
              item-value="id"
              persistent-hint
              :error-messages="categoryErrors"
              disabled
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" class="mx-2">
            <h2 class="subheading">Subir documentos</h2>
            <input
              type="file" 
              ref="files" 
              multiple="true" 
              @change="setFiles()"
            />
            <br />
            <br />
          </v-col>

          <v-col cols="12" md12>
            <v-textarea
              v-model="ticket.description"
              outlined
              label="Descripción del caso *"
              :error-messages="descriptionErrors"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-btn outlined color="#E8114b" @click="$router.push('/')">
          Volver
        </v-btn>

        <v-btn type="submit" dark color="#E8114b">
          Crear caso
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    ticket: {
      category_id: { required },
      description: { required }
    }
  },
  data: () => ({
    categories: [],
  }),
  props: {
    ticket: { type: Object, required: true },
  },
  computed: {
    categoryErrors () {
      const errors = []
      if (!this.$v.ticket.category_id.$dirty) return errors
      !this.$v.ticket.category_id.required && errors.push('Campo requerido')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.ticket.description.$dirty) return errors
      !this.$v.ticket.description.required && errors.push('Campo requerido')
      return errors
    },
    currentUser() {
      return this.$nuxt.$auth.user
    }
  },
  methods: {
    ...mapActions("helpcenter", ["fetchCategories"]),
    async getCategories() {
      const res = await this.fetchCategories()
      this.categories = res

      if (this.$route.query.category) {
        let id = this.categories.find(c => c.slug === this.$route.query.category)?.id
        this.ticket.category_id = id
      }
    },
    setFormData() {
      const formData = new FormData()
      formData.append("ticket[category_id]", this.ticket.category_id)
      formData.append("ticket[description]", this.ticket.description)
      for (let file of this.ticket.files) {
        formData.append("ticket[files][]", file);
      }
      return formData
    },
    handleSubmitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      const formData = this.setFormData()
      this.$emit("submitForm", formData)
    },
    setFiles() {
      this.ticket.files = this.$refs.files.files
    }
  },
  created() {
    this.getCategories()
  }
}
</script>
<style lang="css">
</style>