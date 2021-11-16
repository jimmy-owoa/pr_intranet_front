<template>
  <div>
    <v-row class="mt-3">
      <v-col cols="12">
        <h1 class="uk-overtitle my-3">Bienvenido al centro de ayuda</h1>

        <h2 class="uk-heading-title my-5">¿Cómo podemos ayudarte?</h2>
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA 
          title="Rendición de gastos" 
          icon="ChartHistogramIcon"
          url="/crear-caso?category=rendicion-de-gastos"
        />
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA 
          title="Requerimientos Servicios Generales" 
          icon="InteractiveIcon"
          url="/crear-caso?category=requerimientos-servicios-generales"
        />
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA 
          title="Requerimientos GDT" 
          icon="InteractiveIcon"
          url="/crear-caso?category=requerimientos-gdt"
        />
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA 
          title="Ver mis casos" 
          icon="ListCheckIcon"
          url="/mis-casos"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="ma-0 mt-2 hc__blue-text uk-title-h2">Preguntas Frecuentes</h2>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="12">
            <ListImportantQuestions :questions="questions" />
          </v-col>
          <v-col cols="12" md="12" mt-4>
            <h2 class="ma-0 mt-2 hc__blue-text uk-title-h2">
              Elige la categoría para la que necesitas resolver dudas
            </h2>
          </v-col>

          <v-col cols="12">
            <CategoryList :categories="categories" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ListImportantQuestions from '@/components/helpcenter/ListImportantQuestions.vue'
import CategoryList from '@/components/helpcenter/CategoryList.vue'
import CardInfoA from '@/components/helpcenter/CardInfoA'
import CardInfoB from '@/components/helpcenter/CardInfoB'

export default {
  middleware: ['auth'],
  components: {
    CategoryList,
    ListImportantQuestions,
    CardInfoA,
    CardInfoB,
  },
  data() {
    return {
      questions: [],
      categories: []
    }
  },
  methods: {
    ...mapActions("helpcenter", ["fetchCategories", "fetchQuestionsImportant"]),
    async getImportantQuestions() {
      const res = await this.fetchQuestionsImportant()
      this.questions = res
    },
    async getCategories() {
      const res = await this.fetchCategories()
      this.categories = res
    },
    goTo() {
      this.$router.push({name: 'crear-caso', params: { category: "hola"}})
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  created() {
    this.getImportantQuestions()
    this.getCategories()
  },
  mounted(){
    window.scrollTo(0, 0);
  },
}
</script>
<style lang="css">
.uk-title-h2 {
  font-size: 2.6rem;
  line-height: 1.3;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 800;
  text-transform: none;
  letter-spacing: 2px;
}
</style>