<template>
  <div>
    <!-- <SearchHelpcenter /> -->

    <v-row class="mt-3">
      <v-col cols="12" md="4">
        <CardInfoA 
          title="Crear caso" 
          icon="InteractiveIcon"
          url="/crear-caso"
        />
      </v-col>
      <v-col cols="12" md="4">
        <CardInfoA 
          title="Ir a mis casos" 
          icon="ListCheckIcon"
          url="/mis-casos"
        />
      </v-col>
      <v-col cols="12" md="4">
        <CardInfoA 
          title="Crear rendición de gastos" 
          icon="ChartHistogramIcon"
          url="/rendicion-gastos"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="ma-0 mt-2 white--text uk-title-h2">Preguntas Frecuentes</h2>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="12">
            <ListImportantQuestions :questions="questions" />
          </v-col>
          <v-col cols="12" md="12" mt-4>
            <h2 class="ma-0 mt-2 white--text uk-title-h2">
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
import SearchHelpcenter from '@/components/helpcenter/SearchHelpcenter'
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
    SearchHelpcenter,
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