<template>
  <v-card class="hc__rounded-card">
    <v-list v-for="(question, i) in questions" :key="i"> 
      <v-list-item
        :key="i"
        :to="`${question.url}`"
        class="comment-list"
      >
        <v-list-item-content>
          <div class="color-question-name">
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

.color-question-name {
  color: #303030
}
</style>