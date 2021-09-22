<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <v-btn
        color="#067be2"
        block
        dark
        @click="dialog = true"
      >
        Cambiar de Categoría
        <v-spacer></v-spacer>
        <v-icon color="white" size="30">mdi-chevron-down</v-icon>
      </v-btn>
    </v-col>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Categorias</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.id"
            :value="isActive(item.slug)"
            no-action
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-avatar size="20">
                  <img :src="item.image">
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list-item
              v-for="subcategory in item.subcategories"
              :key="subcategory.id"
              @click="goTo(item.slug, subcategory.slug)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ subcategory.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <!-- <v-icon>{{ subcategory.action }}</v-icon> -->
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      items: []
    }
  },
  methods: {
    ...mapActions("helpcenter", ["fetchCategories"]),
    isActive(slug) {
      return this.$route.params.category === slug
    },
    goTo(categorySlug, subcategorySlug) {
      this.$router.push(`/${categorySlug}/${subcategorySlug}`)
      this.dialog = false
    }
  },
  async created() {
    const res = await this.fetchCategories()
    this.items = res
  }
}
</script>
<style lang="">
  
</style>