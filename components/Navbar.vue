<template>
  <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky" class="uk-sticky uk-sticky-fixed uk-sticky-below" style="position: fixed; top: 0px; width: 1905px;">
    <nav class="uk-navbar-container uk-margin uk-light uk-navbar-sticky">
        <div class="uk-container">
          <v-row>
            <v-col cols="8" class="pb-0">
              <form @submit.prevent="">
                <v-text-field
                  v-model="search"
                  label="¿En qué te ayudamos?"
                  required
                  dark
                  @keyup="searchTimeOut()"
                ></v-text-field>
              </form>
            </v-col>
          </v-row>
            <!-- <div data-uk-navbar="" class="uk-navbar">
                <div class="uk-navbar-left">
                    <a class="uk-navbar-item uk-logo uk-text-small" href="index.html">MINIMAL</a>
                </div>
                <div class="uk-navbar-center uk-visible@m">

                </div>
                <div class="uk-navbar-right">
                    <a class="uk-navbar-toggle uk-search-icon uk-icon" href="#search" data-uk-search-icon="" data-uk-toggle=""><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"></circle><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"></path></svg></a>
                </div>
            </div> -->
        </div>
    </nav>
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

.uk-light, .uk-section-primary:not(.uk-preserve-color), .uk-section-secondary:not(.uk-preserve-color), .uk-tile-primary:not(.uk-preserve-color), .uk-tile-secondary:not(.uk-preserve-color), .uk-card-primary.uk-card-body, .uk-card-primary > :not([class*='uk-card-media']), .uk-card-secondary.uk-card-body, .uk-card-secondary > :not([class*='uk-card-media']), .uk-overlay-primary, .uk-offcanvas-bar {
    color: rgba(255, 255, 255, 0.8);
}

.uk-margin {
    margin-bottom: 20px;
}

nav {
    display: block;
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



.uk-light .uk-logo, .uk-section-primary:not(.uk-preserve-color) .uk-logo, .uk-section-secondary:not(.uk-preserve-color) .uk-logo, .uk-tile-primary:not(.uk-preserve-color) .uk-logo, .uk-tile-secondary:not(.uk-preserve-color) .uk-logo, .uk-card-primary.uk-card-body .uk-logo, .uk-card-primary > :not([class*='uk-card-media']) .uk-logo, .uk-card-secondary.uk-card-body .uk-logo, .uk-card-secondary > :not([class*='uk-card-media']) .uk-logo, .uk-overlay-primary .uk-logo, .uk-offcanvas-bar .uk-logo {
    color: #fff;
}

.uk-navbar-center:not(:only-child) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 990;
}

.uk-navbar-left, .uk-navbar-right, .uk-navbar-center, .uk-navbar-center-left > *, .uk-navbar-center-right > * {
    display: flex;
    align-items: center;
}

.uk-navbar-container > .uk-container .uk-navbar-right {
    margin-right: -15px;
}

.uk-navbar-left, .uk-navbar-right, .uk-navbar-center:only-child {
    flex-wrap: wrap;
}
.uk-navbar-right {
    margin-left: auto;
}
.uk-navbar-left, .uk-navbar-right, .uk-navbar-center, .uk-navbar-center-left > *, .uk-navbar-center-right > * {
    display: flex;
    align-items: center;
}
.uk-navbar-nav {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
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

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

.uk-light .uk-navbar-toggle {
    color: rgba(255, 255, 255, 0.7);
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

a, .uk-link {
    color: #2196F3;
    text-decoration: none;
    cursor: pointer;
}

.uk-navbar-left, .uk-navbar-right, .uk-navbar-center, .uk-navbar-center-left > *, .uk-navbar-center-right > * {
    display: flex;
    align-items: center;
}
</style>