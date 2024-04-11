<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <Breadcrumbs 
        :items="$vuetify.breakpoint.smAndDown ? breadcrumbsMobile : question.breadcrumbs"
      />
    </v-col>

    <v-col cols="12" :class="{'ml-4': $vuetify.breakpoint.smAndUp}">
      <QuestionCard :question="question" />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import QuestionCard from '@/components/helpcenter/QuestionCard.vue'

export default {
  layout: 'helpcenter',
  components: {
    Breadcrumbs,
    QuestionCard,
  },
  data: () => ({
    question: {},
    breadcrumbsMobile: [
      { to: "/", text: "Inicio", disabled: false, exact: true },
      { to: "/centro-de-ayuda", text: "Centro de ayuda", disabled: false, exact: true }
    ],
  }),
  computed: {
    ...mapState("helpcenter", ["loading"]),
  },
  methods: {
    ...mapActions("helpcenter", ["fetchQuestion"]),
    async getQuestion() {
      const res = await this.fetchQuestion(this.$route.params.question)
      this.question = res
    }
  },
  created() {
    this.getQuestion()
  },
  mounted(){
    window.scrollTo(0, 0);
  },
}
</script>
<style lang="">
  
</style>