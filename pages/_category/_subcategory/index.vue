<template>
  <v-row>
    <v-col cols="12">
      <Breadcrumbs
        :items="$vuetify.breakpoint.smAndDown ? breadcrumbsMobile : breadcrumbs"
      />
    </v-col>

    <v-col cols="12" :class="{'ml-4': $vuetify.breakpoint.smAndUp}">
      <QuestionList 
        :key="this.$route.params.subcategory"
        @setBreadcrumbs="(value) => breadcrumbs = value"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import QuestionList from '@/components/helpcenter/QuestionList.vue'

export default {
  layout: 'helpcenter',
  middleware: ['auth'],
  components: {
    Breadcrumbs,
    QuestionList,
  },
  data() {
    return {
      breadcrumbs: [],
      breadcrumbsMobile: [
        { to: "/", text: "Inicio", disabled: false, exact: true },
        { to: "/centro-de-ayuda", text: "Centro de ayuda", disabled: false, exact: true }
      ],
    }
  },
  computed: {
    ...mapState("helpcenter", ["loading"]),
  },
  mounted(){
    window.scrollTo(0, 0);
  },
}
</script>
<style lang="">
  
</style>