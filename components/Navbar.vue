<template>
  <v-app-bar fixed app color="primary" dark >
    <v-row>
      <v-col cols="12" sm="3" class="py-0"></v-col>
      <v-col cols="12" sm="6" class="py-0">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="12" class="mt-6 py-0">
                <v-text-field
                  v-model="search"
                  label="¿En qué te ayudamos?"
                  required
                  outlined
                  @keyup="searchTimeOut()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-progress-linear indeterminate color="success" v-show="isLoading"></v-progress-linear>

            <v-list v-for="(result, i) in results" :key="i"> 
              <v-list-item
                :key="i"
                :to="`${result.url}`"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="result.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon color="#E8114b" size="30">mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
              
              <v-divider></v-divider>
            </v-list>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-app-bar>
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
<style lang="">
  
</style>