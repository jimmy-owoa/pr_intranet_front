<template>
  <v-row justify="center">
    <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky" class="uk-sticky uk-sticky-fixed uk-sticky-below" style="position: fixed; top: 0px; width: 1905px;">
      <nav class="uk-navbar-container uk-margin uk-light uk-navbar-sticky">
        <div class="uk-container">
          <v-row justify="center">
            <v-col cols="8" class="pb-0">
              <form @submit.prevent="">
                <v-text-field
                  v-model="search"
                  label="¿En qué te ayudamos?"
                  required
                  :loading="isLoading"
                  color="white"
                  dark
                  @keyup="searchTimeOut()"
                ></v-text-field>
              </form>
            </v-col>
          </v-row>
        </div>
      </nav>
    </div>

    <v-col cols="8" class="">
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
<style lang="css" scoped>
.uk-sticky-fixed {
    z-index: 980;
    box-sizing: border-box;
    margin: 0 !important;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.uk-navbar-container:not(.uk-navbar-transparent) {
  background: #2196F3;
  border-bottom: 1px solid #349ff4;
}

.uk-margin {
  margin-bottom: 20px;
}

@media (min-width: 960px) {
  .uk-container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (min-width: 640px) {
  .uk-container {
    padding-left: 30px;
    padding-right: 30px;
  }
}

.uk-container {
  box-sizing: content-box;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

.uk-container > :last-child {
  margin-bottom: 0;
}

.uk-navbar {
    display: flex;
    position: relative;
}

.uk-logo {
    font-size: 1.2rem;
    font-family: "Work Sans", sans-serif;
    color: #666;
    text-decoration: none;
    letter-spacing: 2px;
    font-family: "Nunito Sans", sans-serif;
    font-weight: 800;
}

.uk-icon {
  margin: 0;
  border: none;
  border-radius: 0;
  overflow: visible;
  font: inherit;
  color: inherit;
  text-transform: none;
  padding: 0;
  background-color: transparent;
  display: inline-block;
  fill: currentcolor;
  line-height: 0;
}

</style>