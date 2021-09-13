<template>
  <v-card rounded="lg">
    <v-navigation-drawer
      stateless
      value="true"
      height="auto"
      width="auto"
      class="hc__sidemenu"
    >
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.id"
          :value="isActive(item.slug)"
          no-action
          class="hc__item-sidemenu"
        >
          <template v-slot:activator>
            <v-list-item :class="{'hc__border-item-sidemenu' : isActive(item.slug)}">
              <v-list-item-avatar size="20">
                <img :src="item.image">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title :class="{'font-weight-bold': isActive(item.slug)}">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item
            v-for="subcategory in item.subcategories"
            :key="subcategory.id"
            :to="`/${item.slug}/${subcategory.slug}`"
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
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    ...mapActions("helpcenter", ["fetchCategories"]),
    isActive(slug) {
      return this.$route.params.category === slug
    }
  },
  async created() {
    const res = await this.fetchCategories()
    this.items = res
  }
}
</script>
<style lang="css">
.hc__item-sidemenu > .v-list__group__header > div > .theme--light.v-icon {
  color: #E8114b;
}

.hc__border-item-sidemenu {
  border-left: 3px solid #E8114b
}

.hc__sidemenu > .theme--light.v-list .v-list__group--active:before, .theme--light.v-list .v-list__group--active:after {
  background: rgba(0,0,0,0)
}
</style>