<template>
  <div class="tff-container-search">
    <v-row class="pb-2">
      <v-col cols="12" md="8" offset-md="2" class="px-1">
        <v-card rounded="lg">
          <p class="text-center hc__blue-text text-h4">Centro de ayuda</p>

          <v-card-text>
            <form @submit.prevent="">
              <v-text-field
                v-model="search"
                label="¿En qué te ayudamos?"
                required
                outlined
                color="#1B0088"
                @keyup="searchTimeOut()"
              ></v-text-field>
            </form>

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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
<style lang="css">
.tff-container-search {
  position: relative;
  width: 100%;
  padding: 2.5rem 0px 6rem;
  border-radius: 0px 0px 1.5rem 1.5rem;
  background: url(https://assets-intranet-security.s3.us-east-2.amazonaws.com/helpcenter_background.jpg) center center / cover no-repeat;
}

@media (max-width: 959px) {
  .tff-container-search {
    /* background: none; */
    padding: 0px;
  }
}
</style>