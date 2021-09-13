<template>
  <div>
    <SearchHelpcenter />

    <v-row>
      <v-col cols="12">
        <p class="title ma-0 mt-2 hc__blue-text">Preguntas frecuentes</p>
      </v-col>
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" md="12">
            <ListImportantQuestions :questions="questions" />
          </v-col>
          <v-col cols="12" md="12" mt-4>
            <p class="ma-0 title hc__blue-text">
              Elige la categoría para la que necesitas resolver dudas
            </p>
          </v-col>

          <v-col cols="12">
            <CategoryList :categories="categories" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="3">
        <div class="mb-2">
          <CardInfoA />
        </div>
        <div>
          <CardInfoB />
        </div>
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
.hc__rounded-card{
  border-radius: 0.5rem
}

.hc__blue-text {
  color: #1B0088
}

.hc__color-2 {
  color:#E8114b !important
}
</style>