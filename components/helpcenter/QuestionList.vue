<template>
  <v-card class="hc__rounded-card">
    <v-card-title>
      <div class="hc__box-title py-4 pl-4">
        <p>Centro de ayuda</p>
        <h1 class="hc__blue-text headline">{{ subcategory.name }}</h1>
      </div>
    </v-card-title>

    <v-list v-for="(question, i) in subcategory.questions" :key="i"> 
      <v-list-item
        :key="question.id"
        :to="`${$route.path}/${question.id}`"
        class="comment-list pl-3"
      >
        <v-list-item-content>
          <div>
            {{ question.name }}
          </div>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon color="#E8114b" size="30">mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
      
      <v-divider></v-divider>
    </v-list>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      subcategory: {}
    }
  },
  methods: {
    ...mapActions("helpcenter", ["fetchSubcategory"]),
    async getSubcategory() {
      const res = await this.fetchSubcategory(this.$route.params.subcategory)
      this.subcategory = res
      this.$emit("setBreadcrumbs", this.subcategory.breadcrumbs)
    }
  },
  created() {
    this.getSubcategory()
  },
}
</script>
<style lang="css">
.hc__rounded-card{
  border-radius: 0.5rem
}
</style>