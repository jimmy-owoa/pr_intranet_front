<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <Breadcrumbs 
        :items="$vuetify.breakpoint.smAndDown ? breadcrumbsMobile : category.breadcrumbs"
      />
    </v-col>

    <v-col cols="12" :class="{'ml-4': $vuetify.breakpoint.smAndUp}">
      <SubcategoryList :category="category" />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
import SubcategoryList from '@/components/helpcenter/SubcategoryList.vue';
import Breadcrumbs from '@/components/helpcenter/Breadcrumbs';

export default {
  layout: 'helpcenter',
  components: {
    Breadcrumbs,
    SubcategoryList,
  },
  data() {
    return {
      category: {},
      breadcrumbsMobile: [
        { to: "/", text: "Inicio", disabled: false, exact: true },
        { to: "/centro-de-ayuda", text: "Centro de ayuda", disabled: false, exact: true }
      ],
    }
  },
  methods: {
    ...mapActions("helpcenter", ["fetchCategory"]),
    async getCategory() {
      const res = await this.fetchCategory(this.$route.params.category)
      this.category = res
    }
  },
  created() {
    // this.getCategory()
  },
  mounted(){
    window.scrollTo(0, 0);
  }
}
</script>