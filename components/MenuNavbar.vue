<template lang="">
<div id="tff_menu_section"> 
  <div class="tff-container-menu" id="header_navbar_menu">
    <div class="tff-hidden-sm-and-down">
      <div class="tff-layout tff-header">
        <div class="tff-flex tff-row-header">
          <div class="tff-layout tff-align-end tff-fill-height" onmouseover="closeMenu()">
            <div class="tff-flex text-md-left tff-inline sm2">
              <a href="<%= host %>#/" style="padding-left: 0">
                <img src='https://assets-intranet-security.s3.us-east-2.amazonaws.com/logo-compass.jpg', style='height: 40px; cursor: pointer; margin-top: 8px;', class="tff-image-correction">
              </a>
            </div>
            <div class="tff-flex sm4 subheading tff-top-info tff-text-md-right">

            </div>
            <div class="tff-flex sm2 tff-top-info">

            </div>
            <div class="tff-flex sm2 subheading tff-pointer tff-text-md-center tff-top-info">

            </div>
            <div class="tff-flex sm2 subheading tff-top-info tff-text-md-right tff-pl-1">
              <a href="#" id="title_favorite_name" class="tff-profile-name">
                Usuario
              </a>
              <div class="tff-avatar" style="height: 42px; width: 42px;">
                <div aria-label="Avatar" class="tff-inline tffv-image">
                  <a href="#">
  
                      <img 
                        src="https://assets-intranet-security.s3.us-east-2.amazonaws.com/default_avatar.png"
                        style="<%= "height: 42px; width: 42px; object-fit: cover; border: 1px solid #{user.get_color}" %>"
                      >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MENU START -->
  <nav class="tff-navbar-menu tff-nav" id="ul_menu" fixed style="background-color: #FFF;" onmouseleave="closeMenu()">

  </nav>
  <!-- MENU END -->
</div>
</template>
<script>
export default {
  
}
</script>
<style lang="css">
  @import url("https://fonts.googleapis.com/css?family=Titillium+Web&display=swap");
  @import url("https://fonts.googleapis.com/css?family=Material+Icons");
  @import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp");

  /* * {
    margin: 0;
    padding: 0;
    font-family: "Titillium Web", sans-serif;
    box-sizing: border-box;
  } */
  
  .tff-navbar-menu>ul>li>ul.megamenu::before {
    content: normal;
  }

  .tff-btn-indicators {
    align-items: center;
    display: inline-flex;
    height: 36px;
    flex: 0 0 auto;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    margin: 6px 8px;
    min-width: 88px;
    outline: 0;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
    position: relative;
    vertical-align: middle;
    user-select: none;
    background-color: white;
    border-color: white;
    border-radius: 8px;
    padding: 0px 16.5px;
    text-transform: none;
    color: #211850;
    font-weight: 700 !important;
  }
  .tff-modal-hover {
    font-family: "Titillium Web", sans-serif !important;
    font-size: 14px;
    text-decoration: none !important;
    color: #9d9d9c !important;
  }
  a.tff-modal-hover:hover {
    color: #789c4a !important;
    border-bottom: 1px solid #789c4a;
    padding-bottom: 2px;
  }
  
  .tff-show-date {
    font-family: "Titillium Web", sans-serif !important;
    font-size: 14px;
    cursor: default !important;
    text-decoration: none !important;
    color: #9d9d9c !important;
  }

  .tff-profile-name {
    font-family: 'Titillium Web', sans-serif !important; 
    font-size: 1.15rem; 
    text-decoration: none; color: #211651;
  }
  
  .tff-top-info {
    width: 17%;
    height: 71%;
    display: inline-block;
    vertical-align: middle;
  }
  .tff-inline {
    display: inline-block;
    vertical-align: middle;
  }
  /* MODAL ClASS */
  .tff-btn-close {
    color: #72933f;
    font-size: 50px;
    text-decoration: none !important;
    position: absolute;
    right: 13px;
    top: -20px;
  }
  .tff-link-darksky {
    color: #211850;
    font-size: 15px;
    text-decoration: none !important;
    position: absolute;
    right: 13px;
    bottom: 10px;
  }
  .tff-link-darksky span{
    text-decoration: underline;
  }
  .tff-btn-close:hover {
    color: #919191;
  }
  
  .tff-btn-previus {
    color: white !important;
    font-size: 60px;
    text-decoration: none !important;
    position: absolute;
    left: -7px;
    bottom: 180px;
  }
  .tff-btn-next {
    color: white !important;
    font-size: 60px;
    text-decoration: none !important;
    position: absolute;
    left: 316px;
    bottom: 180px;
  }
  .tff-modal:before {
    content: "";
    display: none;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .tff-modal:target:before {
    display: block;
  }
  .tff-modal:target .tff-modal-dialog {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
    top: 20%;
    left: 0;
    right: 0;
  }
  .tff-modal-dialog {
    background: #fefefe;
    position: fixed;
    top: -100%;
    z-index: 50;
    transform: translate(0, -500%);
    transition: transform 0.5s ease-out;
    max-width: 1300px !important;
    min-width: 960px;
    margin: auto;
  }
  .tff-modal-subheading {
    font-size: 20px;
    letter-spacing: 1px;
  }
  .tff-modal-heading {
    font-size: 49px;
    margin-top: -13px;
  }
  .tff-modal-regular {
    font-size: 17px;
  }
  .tff-modal-title {
    font-size: 36px;
  }
  /* MODAL CLASS END */
  .tff-font-weight-bold {
    font-weight: 700 !important;
  }
  .tff-white--text {
    color: #fff !important;
    caret-color: #fff !important;
  }
  .tff-primary--text {
    color: #1e184a !important;
    caret-color: #1e184a !important;
  }
  .tffv-image {
    z-index: 0;
  }
  .tff-v-text-field {
    padding-top: 12px;
    margin-top: 4px;
  }
  .tff-v-input {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    font-size: 14px;
    text-align: left;
  }
  .tff-v-input__control {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: auto;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
  }
  .tff-v-text-field > .tff-v-input__control > .tff-v-input__slot {
    cursor: text;
    -webkit-transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
  .tff-v-text-field > .tff-v-input__control > .tff-v-input__slot > .tff-v-text-field__slot {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    position: relative;
  }
  .tff-v-text-field.tff-v-text-field--solo .tff-v-text-field__slot {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .tff-v-input__slot {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 8px;
    min-height: inherit;
    position: relative;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 100%;
  }
  .tff-v-input input {
    max-height: 32px;
  }
  .tff-v-text-field input {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    line-height: 20px;
    padding: 8px 0 8px;
    max-width: 100%;
    min-width: 0px;
    width: 100%;
  }
  .tff-hidden-sm-and-down {
    display: none;
  }
  .tff-pointer {
    cursor: pointer;
  }
  .tff-pt-2 {
    padding-top: 8px !important;
  }
  .tff-pt-4 {
    padding-top: 24px !important;
  }
  .tff-avatar,
  .tff-avatar .tff-v-icon,
  .tff-avatar .tffv-image,
  .tff-avatar img {
    border-radius: 50%;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
  }
  .tff-avatar {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    text-align: center;
    vertical-align: middle;
  }
  .tff-avatar .tff-v-icon,
  .tff-avatar .tffv-image,
  .tff-avatar img {
    height: 42px;
    width: 42px;
  }
  .tffv-image {
    z-index: 0;
  }
  #back_menu {
    height: 100vh;
    width: 100vw;
    position: "relative";
    background-color: #000;
    opacity: 0.5;
    z-index: 1;
    display: none;
  }

  .tff-container-menu {
    flex: 1 1 100%;
    margin: auto;
    margin-top: -10px;
    padding: 24px;
    padding-bottom: 15px;
    max-width: 1346px !important;
    line-height: 1.5;
  }
  .tff-navbar-menu {
    position: inherit;
    width: 100%;
    background: #f2f2f2;
    font-size: 14px;
  }
  /* first stage */
  .tff-navbar-menu > ul {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 auto 5px;
    padding: 0;
    height: 50px;
    z-index: 9;
  }
  
  .tff-navbar-menu ul li {
    color: #fff;
    list-style: none;
    transition: 0.15s;
  }
  .tff-navbar-menu > ul > li > a {
    padding: 15px 25px;
  }
  .tff-navbar-menu ul > li.tff-submenu:hover > a:after {
    margin-top: 2px;
    border-top: 5px solid transparent;
    /* border-bottom: 5px solid green; */
  }
  /* second stage (the mega-menu) */
  .tff-navbar-menu ul.megamenu {
    position: absolute;
    display: none;
    flex-wrap: wrap;
    top: 100%;
    padding: 20px 10px 0;
    /* background: linear-gradient(to right, #211651 -40%, #789c4a 120%) !important; */
    text-align: left;
    max-width: 1340px;
    /* border-top: 5px solid green; */
    /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5); */
    background: transparent;
    z-index: 1;
    transition-delay: 0.15s;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, 0%);
  }

  /* third stage (child-menus in the mega-menu) */
  li.tff-submenu > ul > ul > a {
    line-height: 25px;
    padding: 0;
  }
  .tff-align-end {
    align-items: flex-end;
  }
  .tff-fill-height {
    height: 100%;
  }
  .tff-pl-1 {
    padding-left: 4px !important;
  }
  .tff-text-md-left {
    text-align: left !important;
  }
  .tff-text-md-right {
    text-align: right !important;
  }
  .tff-text-md-center {
    text-align: center !important;
  }
  .subheading {
    font-size: 16px !important;
    font-weight: 400;
  }
  .tff-flex {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    flex-grow: 1;
    flex-basis: auto;
    max-width: 100%;
  }
  .tff-flex.sm1-button-menu {
    flex-basis: 4.166666666666666%;
    flex-grow: 0;
    max-width: 4.166666666666666%;
  }
  .tff-flex.sm1-profile-menu {
    flex-basis: 6.333333333333332%;
    flex-grow: 0;
    max-width: 6.333333333333332%;
  }
  .tff-flex.sm3-logo-navbar {
    flex-basis: 23%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 23%;
  }
  .tff-flex.sm7-search-menu {
    flex-basis: 62.333333333333336%;
    flex-grow: 0;
    max-width: 62.333333333333336%;
  }
  .tff-flex.sm9-search-menu {
    flex-basis: 79.16666666666667%;
    flex-grow: 0;
    max-width: 79.16666666666667%;
  }
  .tff-flex.sm1 {
    flex-basis: 8.333333333333332%;
    flex-grow: 0;
    max-width: 8.333333333333332%;
  }
  .tff-flex.sm2 {
    -ms-flex-preferred-size: 16.666666666666664%;
    flex-basis: 16.666666666666664%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 16.666666666666664%;
  }
  .tff-flex.sm3 {
    flex-basis: 25%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 25%;
  }
  .tff-flex.sm4 {
    flex-basis: 33.33333333333333%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 33.33333333333333%;
  }
  .tff-flex.sm5 {
    flex-basis: 41.66666666666667%;
    flex-grow: 0;
    max-width: 41.66666666666667%;
  }
  .tff-flex.sm6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
  .tff-flex.sm7 {
    flex-basis: 58.333333333333336%;
    flex-grow: 0;
    max-width: 58.333333333333336%;
  }
  .tff-flex.sm8 {
    flex-basis: 66.66666666666666%;
    flex-grow: 0;
    max-width: 66.66666666666666%;
  }
  .tff-flex.sm9 {
    flex-basis: 75%;
    flex-grow: 0;
    max-width: 75%;
  }
  .tff-flex.sm10 {
    flex-basis: 83.33333333333334%;
    flex-grow: 0;
    max-width: 83.33333333333334%;
  }
  .tff-flex.sm11 {
    flex-basis: 91.66666666666666%;
    flex-grow: 0;
    max-width: 91.66666666666666%;
  }
  .tff-flex.sm12 {
    flex-basis: 100%;
    flex-grow: 0;
    max-width: 100%;
  }
  .tff-layout {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    min-width: 0;
  }
  .tff-layout.wrap {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .tff-layout.row {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .tff-font-weight-bold {
    font-weight: 700 !important;
  }
  .tff-text-md-right {
    text-align: right !important;
  }
  .tff-white--text {
    color: #fff !important;
    caret-color: #fff !important;
  }
  .tff-navbar-menu > ul > li:hover {
    /* background: red; */
    text-decoration: underline;
    text-underline-position: under;
  }
  
  @media(min-width: 1024px) and (max-width: 1365px){
    .tff-btn-next {
    color: white !important;
    font-size: 60px;
    text-decoration: none !important;
    position: absolute;
    left: 270px;
    bottom: 182px;
    }
  }

  @media(min-width: 1366px) and (max-width: 1399px){
    .tff-btn-next {
    color: white !important;
    font-size: 60px;
    text-decoration: none !important;
    position: absolute;
    left: 313px;
    bottom: 182px;
    }
  }

  @media(min-width: 1400px) and (max-width: 1599px){
    .tff-btn-next {
    color: white !important;
    font-size: 60px;
    text-decoration: none !important;
    position: absolute;
    left: 328px;
    bottom: 182px;
    }
  }

  
  @media(min-width: 1600px) and (max-width: 1919px){
    .tff-btn-next {
    color: white !important;
    font-size: 60px;
    text-decoration: none !important;
    position: absolute;
    left: 385px;
    bottom: 182px;
    }
  }
  
  @media(min-width: 1920px){
    .tff-btn-next {
    color: white !important;
    font-size: 60px;
    text-decoration: none !important;
    position: absolute;
    left: 380px;
    bottom: 182px;
    }
  }
  
  /* ################################################################## */
  @media (min-width: 600px) and (max-width: 1365px) {
    .tff-modal-dialog {
      background: #fefefe;
      position: fixed;
      top: -100%;
      z-index: 11;
      -webkit-transform: translate(0, -500%);
      -ms-transform: translate(0, -500%);
      transform: translate(0, -500%);
      -webkit-transition: -webkit-transform 0.5s ease-out;
      -moz-transition: -moz-transform 0.5s ease-out;
      -o-transition: -o-transform 0.5s ease-out;
      transition: transform 0.5s ease-out;
      max-width: 1300px !important;
      width: 80%;
      margin: auto; 
    }
  }
  
  @media(min-width: 1366px) and (max-width: 1439px){
    .tff-modal-dialog {
      background: #fefefe;
      position: fixed;
      top: -100%;
      z-index: 11;
      -webkit-transform: translate(0, -500%);
      -ms-transform: translate(0, -500%);
      transform: translate(0, -500%);
      -webkit-transition: -webkit-transform 0.5s ease-out;
      -moz-transition: -moz-transform 0.5s ease-out;
      -o-transition: -o-transform 0.5s ease-out;
      transition: transform 0.5s ease-out;
      max-width: 1300px !important;
      width: 80%;
      margin: auto;
    }
  }
  
  @media (min-width: 1440px) and (max-width: 1500px) {
    .tff-modal-dialog {
      background: #fefefe;
      position: fixed;
      top: -100%;
      z-index: 11;
      -webkit-transform: translate(0, -500%);
      -ms-transform: translate(0, -500%);
      transform: translate(0, -500%);
      -webkit-transition: -webkit-transform 0.5s ease-out;
      -moz-transition: -moz-transform 0.5s ease-out;
      -o-transition: -o-transform 0.5s ease-out;
      transition: transform 0.5s ease-out;
      max-width: 1300px !important;
      width: 80%;
      margin: auto;
    }
  }
  
  @media (min-width: 600px) {
    .tff-nav {
      font-size: 16px;
    }
    .tff-hidden-sm-and-down {
      display: flex;
    }
    .tff-head-menu {
      font-family: "Titillium Web", sans-serif;
      font-weight: 700;
      font-size: 12px;
      line-height: 18px;
      color: white !important;
    }
  }
  @media (min-width: 960px) {
    .tff-head-menu {
      font-family: "Titillium Web", sans-serif;
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      color: white !important;
    }
    .tff-nav {
      font-size: 18px;
      display: block;
    }

    .tff-navbar-menu > ul > li > a {
      padding: 15px 25px;
    }
    .tff-navbar-menu ul > li.tff-submenu:hover > a:after {
      margin-top: 2px;
      border-top: 5px solid transparent;
      /* border-bottom: 5px solid green; */
    }
    /* second stage (the mega-menu) */
    .tff-navbar-menu ul.megamenu {
      display: none;
      width: 120%;
      top: 100%;
      padding: 20px 10px 0;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    }
    .results_ul {
      background-color: white;
      border: 2px solid darkgrey;
      border-radius: 8px;
      font: inherit;
      line-height: 1.5em;
      padding: 1em 2.5em 1em 1em;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      display: none;
      z-index: 100000 !important;
      position: absolute;
    }
  }
  /* ################################################################## */
  @media (min-width: 600px) {
    .tff-nav {
      font-size: 16px;
    }
    .tff-hidden-sm-and-down {
      display: flex;
    }
    .hidden-mobile {
      display: none;
    }
  }
  @media (min-width: 960px) {
    .hidden-mobile {
      display: none;
    }
    .tff-nav {
      font-size: 14px;
      display: block;
    }
    .tff-navbar-menu ul.megamenu {
      flex: 1 1 100%;
      margin: auto;
      top: 100%;
      display: none;
      padding: 20px 10px 0;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    }
  
    .tff-image-correction {
      vertical-align: 0;
    }
  
    .theme--dark.tff-v-input input::placeholder, .theme--dark.tff-v-input textarea::placeholder {
      color: rgba(255,255,255,0.2);
    }
  
    .theme--dark.tff-v-icon {
      color: #211651;
    }
  
    .theme--dark.tff-v-input:not(.tff-v-input--is-disabled) input, .theme--dark.tff-v-input:not(.tff-v-input--is-disabled) textarea {
      color: #000;
    }
  
    .tff-v-text-field > .tff-v-input__control > .tff-v-input__slot::before, .tff-v-text-field > .tff-v-input__control > .tff-v-input__slot::after {
      bottom: -1px;
      content: '';
      left: 0;
      position: absolute;
      -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      width: 100%;
    }
  
    .theme--dark.tff-v-text-field > .tff-v-input__control > .tff-v-input__slot::before {
      border-color: #D7DBDD;
    }
  
    .tff-v-text-field > .tff-v-input__control > .tff-v-input__slot::before {
      border-style: solid;
      border-width: thin 0 0 0;
    }
  
    .theme--dark.tff-v-text-field:not(.tff-v-input--has-state) > .tff-v-input__control > .tff-v-input__slot:hover::before {
      border-color: #9d9d9c;
    }
  }

  @media (min-width: 1299px) and (max-width: 1366px) {
    .tff-navbar-menu > ul {
      height: 50px;
      flex-basis: 80%;
      flex-grow: 0;
      max-width: 80%;
    }
    
    .tff-flex.tff-sm1 {
      flex-basis: 4.333333333333332%;
      flex-grow: 0;
      max-width: 4.333333333333332%;
    }

    .tff-row-header {
      flex-basis: 80.66666666666666%;
      flex-grow: 0;
      max-width: 80.66666666666666%;
    }
  }

  @media (min-width: 1367px) {
    .tff-modal-hover {
      font-size: 16px;
    }

    .tff-show-date {
      font-size: 16px;
    }

    .tff-profile-name {
      font-size: 20px; 
    }
  }

  @media (min-width: 1367px) and (max-width: 1370px) {
    /* .tff-navbar-menu > ul {
      height: 50px;
      width: 95%;
    } */

    .tff-flex.tff-sm1 {
      flex-basis: 4.333333333333332%;
      flex-grow: 0;
      max-width: 4.333333333333332%;
    }

    .tff-row-header {
      flex-basis: 100%;
      flex-grow: 0;
      max-width: 100%;
    }
  }

  .tff-input-search {
    background-color: transparent;
    border-style: none;
    color: inherit;
    font-family: "Titillium Web", sans-serif;
  }
  
  /* ****************** ------------------------ ************* */
  
  .tff-gradient-security {
    background: linear-gradient(to bottom, #211651 -20%, #789c4a 120%) !important;
  }
  
  .tff-green-text {
    color: #638D37;
    padding: 0;
    font-weight: bold;
    font-size: 12px;
    font-family: "Titillium Web", sans-serif;
  }
  
  .tff-flex-container{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .tff-flex-menus {
    padding-top: 30px;
    width: 18%;
    justify-content: center;
    align-items: center;
  }
  
  .tff-flex-submenus {
    padding-top: 20px;
    width: 82%;
  }
  
  .tff-j-container {
    height: 530px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  
  .tff-flex-container-2 {
    width: 100%;
    display: flex;
    padding-right: 5px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .tff-cell-arrow-right {
    width: 15%;
    height: 20px;
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
  
  .tff-cell-1 {
    display: flex;
    align-items: center;
  }
  
  .tff-j-ul {
    width: 100%; 
    padding-left: 15px; 
    padding-right: 10px; 
    padding-bottom: 30px;
    display: block;
    background: #FFF !important;
  }
  
  .tff-cell-2 {
    background: transparent;
    height: 20px;
    display: flex;
    padding-left: 1.7rem;
    margin-top: 1rem;
    width: 85%;
    font-weight: bold;
  }
  
  .tff-j-link {
    display: block !important;
    color: #606060;
    text-decoration: none;
    font-size: 12px;
    padding: 0;
  }
  
  .tff-cell-selected {
    background: transparent;
    height: 20px;
    display: flex;
    padding-left: 1.4rem;
    margin-top: 1rem;
    width: 85%;
    font-weight: bold;
    border-left: 4px solid white;
  }
  
  .tff-title-submenu {
    border-bottom: 1.5px solid rgba(0,0,0, .60) !important;
    font-size: 12px;
    line-height: 12px;
    text-decoration: none;
    max-width: 200px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-family: "Titillium Web", sans-serif;
  }

  .tff-title-menu {
    font-size: 14px;
    color: #FFF;
    font-weight: bold;
    font-family: "Titillium Web", sans-serif;
  }

  /* Estilos de prueba para sombreado en exa */
  .tff-background-menu {
    z-index: 5;
    background: rgba(0,0,0,.5);
  }

  .tff-dialog-content {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 132px;
    -webkit-transition: .2s cubic-bezier(.25,.8,.25,1);
    transition: .2s cubic-bezier(.25,.8,.25,1);
    width: 100%;
    z-index: 6;
    outline: none;
  }

  .tff-submenu:hover .megamenu{
    display: block;
  }

  /* - - - - - - - - Nuevo menu - - - - - - - - - - */
  #search_toolbar::placeholder {
    color: #a5a7a8;
  }

  .tff-button-menu {
    height: 34px;
    margin-top: 0.5rem;
  }

  .tff-burger-icon {
    color: #211651;
    font-size: 24px;
    padding: 3.7px;
    padding-bottom: 4px;
    border: solid 2px #D7DBDD;
  }

  .tff-flex.sm-col-search {
    flex-basis: 58.333333333333336%;
    flex-grow: 0;
    max-width: 58.333333333333336%;
  }

  .tff-flex.sm-col-profile {
    flex-basis: 38.33333333333333%;
    flex-grow: 0;
    max-width: 38.33333333333333%;
  }

  .tff-v-input-border {
    border: solid 2px #D7DBDD;
  }

  #tff_logo_menu {
    display: none;
    padding-left: 0;
    animation: fade 1s;
    transition: visibility 0s, opacity 0.5s linear;
  }

  #header_navbar_menu {
    display: block;
    visibility: visible;
    opacity: 1;
    animation: fade 1s;
    transition: visibility 0s, opacity 0.5s linear;
  }

  #tff_menu_section {
    font-family: "Titillium Web", sans-serif !important;
    background-color: #FFF;
    padding-top: 0;
  }

  @keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
  }

  .tff-header {
    height: 53px;
    display: flex;
    justify-content: center;
  }

  .tff-container-navbar {
    flex: 1 1 100%;
    /* margin: auto; */
    padding: 0 24px;
    padding-bottom: 15px;
    max-width: 1346px !important;
    line-height: 1.5;
  }

  .tff-font-modal-gospel {
    font-size: 30px;
    margin-top: -13px;
  }

  .tff-badge {
    border-radius: 50%;
    padding-left: 6px;
    padding-right: 6px;
    color: #FFF;
    background-color: #000;
    text-align: center;
    display: inline-block;
  }

  .tff-badge-warning {
    color: #000;
    background-color: #ffc107;
  }

  .tff-badge-primary {
    color: #FFF;
    background-color: #007bff;
  }

  .tff-badge-secondary {
    color: #FFF;
    background-color: #6c757d;
  }

  .tff-badge-success {
    color: #FFF;
    background-color: #28a745;
  }

  .tff-badge-danger {
    color: #FFF;
    background-color: #dc3545;
  }

  .tff-badge-info {
    color: #FFF;
    background-color: #17a2b8;
  }

  .tff-flex-gestionar {
    display: flex;
    justify-content: space-between;
  }

  .tff-input-search:focus {
    outline: none !important;
  }

  .tff-badge-avatar {
    /* Position */
    height: 18px;
    min-width: 18px;
    top: -6px;
    right: -5px;
    
    /* Layout */
    padding: 3px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Color & Font */
    position: absolute;
    font-family: 'Open Sans', sans-serif;
  }

  .tff-hr-modal-gospel {
    width: 52%; 
    margin-left: 25%;
  }

  .tff-hr-modal-weather {
    width: 50%;
    margin-top: 12px;
    margin-left: 25%;
    margin-bottom: 12px;
  }

  .tff-hr-modal-indicators {
    width: 47%;
    margin-top: 12px;
    margin-left: 28%;
    margin-bottom: 12px;
  }

  /* Corrección estilos sólo para Internet Explorer */
  @media (min-width: 1367px) and (-ms-high-contrast:none){
    *::-ms-backdrop, .tff-modal:target .tff-modal-dialog {
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
      top: 20%;
      left: 16%;
      right: 15%;
    }
  }

  @media all and (-ms-high-contrast:none){
    .tff-hr-modal-gospel {
      width: 52%; 
      margin-left: -1%;
    }

    .tff-hr-modal-weather {
      width: 50%;
      margin-top: 12px;
      margin-left: 0;
      margin-bottom: 12px;
    }

    .tff-hr-modal-indicators {
      width: 47%;
      margin-top: 12px;
      margin-left: 0;
      margin-bottom: 12px;
    }
  }
</style>