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
              label="Código"
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
              v-model="category_id"
              :items="categories"
              label="Categoría *"
              item-text="name"
              item-value="id"
              persistent-hint
              disabled
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="ticket.subcategory_id"
              :items="subcategories"
              label="Sub-categoría *"
              item-text="name"
              item-value="id"
              persistent-hint
              :error-messages="subcategoryErrors"
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

        <v-btn type="submit" style="color:white" color="#E8114b" :disabled="isButtonDisabled">
          Crear caso
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { fetchCategory } from '~/store/helpcenter/actions'

export default {
  validations: {
    ticket: {
      subcategory_id: { required },
      description: { required }
    }
  },
  data: () => ({
    categories: [],
    category_id: null,
    isButtonDisabled: false
  }),
  props: {
    ticket: { type: Object, required: true },
  },
  computed: {
    subcategoryErrors () {
      const errors = []
      if (!this.$v.ticket.subcategory_id.$dirty) return errors
      !this.$v.ticket.subcategory_id.required && errors.push('Campo requerido')
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
    },
    subcategories() {
      let categorySelected = this.categories.find(
        (category) => category.id === this.category_id
      )

      return categorySelected?.subcategories
    },
  },
  methods: {
    ...mapActions("helpcenter", ["fetchCategories"]),
    async getCategories() {
      const res = await this.fetchCategories()
      this.categories = res

      if (this.$route.query.category) {
        let id = this.categories.find(c => c.slug === this.$route.query.category)?.id
        this.category_id = id
      }
    },
    setFormData() {
      const formData = new FormData()
      formData.append("ticket[subcategory_id]", this.ticket.subcategory_id)
      formData.append("ticket[description]", this.ticket.description)
      formData.append("category[category_id]", this.category_id)
      for (let file of this.ticket.files) {
        formData.append("ticket[files][]", file); 
      }
      return formData
    },
    handleSubmitForm() {
      this.$v.$touch()
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      if (this.$v.$invalid) return
      const formData = this.setFormData()
      this.$emit("submitForm", formData)
    },
    setFiles() {
      this.ticket.files = this.$refs.files.files
    },
  },
  created() {
    this.getCategories()
  }
}
</script>
<style lang="css">
</style>