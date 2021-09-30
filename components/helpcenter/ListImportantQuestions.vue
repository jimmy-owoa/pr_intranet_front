<template>
  <v-card flat color="transparent">
    <v-list v-for="(question, i) in questions" :key="i" color="transparent"> 
      <v-list-item
        :key="i"
        :to="`${question.url}`"
        class="comment-list"
      >
        <v-list-item-action>
          <v-icon color="white" size="30">mdi-chevron-right</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <div class="white--text">
            {{ question.name }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    questions: { type: Array, default: () => [] }
  }
}
</script>
<style lang="css">
.comment-list > .v-list__tile {
  height: 100% !important;
  padding: 10px 10px !important;
}
</style>