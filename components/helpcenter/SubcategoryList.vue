<template>
  <v-card class="hc__rounded-card">
    <v-card-title>
      <div class="hc__box-title py-4 pl-4">
        <p>Centro de ayuda</p>
        <h1 class="hc__blue-text headline">{{ category.name }}</h1>
      </div>
    </v-card-title>

    <v-list v-for="(subcategory, i) in category.subcategories" :key="i"> 
      <v-list-item
        :key="subcategory.id"
        :to="`${$route.path}/${subcategory.slug}`"
        class="comment-list pl-3"
      >
        <v-list-item-content>
          <div>
            {{ subcategory.name }}
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
    category: { type: Object, required: true }
  }
}
</script>
<style lang="css">
.comment-list > .v-list__item {
  height: 100% !important;
  padding: 10px 10px !important;
}

.hc__box-title {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  border-radius: 8px;
  border: 1px solid rgb(225, 225, 225);
}

.hc__blue-text {
  color: #1B0088
}

.hc__rounded-card{
  border-radius: 0.5rem
}
</style>