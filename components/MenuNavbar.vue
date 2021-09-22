<template>
  <v-row class="ma-0 pa-0" justify="center" style="background-color: #2196F3 !important;">
    <v-col cols="12" class="ma-0 pa-0">
      <v-app-bar
        fixed
        class="uk-navbar-container"
        flat
      >
        <v-row justify="center">
          <v-col cols="10" md="6" class="py-0">
            <form @submit.prevent="">
              <v-text-field
                v-model="search"
                label="¿En qué te ayudamos?"
                required
                :loading="isLoading"
                color="white"
                dark
                hide-details
                @keyup="searchTimeOut()"
              ></v-text-field>
            </form>
          </v-col>
        </v-row>

        <!-- <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
      </v-app-bar>
    </v-col>

    <v-col cols="12" md="8" class="pa-0 ma-0" style="margin-top: 30px" v-if="results.length">
      <v-list v-for="(result, i) in results" :key="i"> 
        <v-list-item
          :key="i"
          :to="`${result.url}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="result.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon color="#2196F3" size="30">mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    isLoading: false,
    search: "",
    results: [],
    timer: null
  }),
  methods: {
    ...mapActions("helpcenter", ["fetchSearch"]),
    async handleSearch() {
      if (this.search.length < 4) {
        this.results = []
        return
      }
      
      const res = await this.fetchSearch(this.search)
      this.results = res
    },
    searchTimeOut() {
      this.isLoading = true
      window.scrollTo(0, 0)

      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.handleSearch()
        this.isLoading = false
      }, 800)
    }
  },
}
</script>
<style lang="css">
.uk-navbar-container {
  /* height: 80px !important; */
  background-color: #2196F3 !important;
  border-bottom: 1px solid #349ff4 !important;
}
</style>