<template>
  <div>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>
    <v-col cols="12" md="12" class="py-0">
      <ExpenseReport v-if="request" :requestDraft="request"/>
    </v-col>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
import ExpenseReport from '~/components/expense-report/ExpenseReport.vue'
    export default {
      middleware: ['auth'],
      components: {
        Breadcrumbs,
        ExpenseReport,
      },
      data: () => ({
        request: {},
      }),
      computed: {
       breadcrumbs() {
         let items = [
           { to: "/", text: "Inicio", disabled: false, exact: true },
           { to: "/mis-rendiciones", text: "Mis Rendiciones", disabled: false, exact: true },
           { to: "", text: `${this.$route.params.id}`, disabled: true }
         ]
         if (this.$vuetify.breakpoint.smAndDown) items.splice(-1)
          
         return items
       },
        currentUser() {
          return this.$nuxt.$auth.user
        }
      },
      methods: {
        ...mapActions("expense-report", ["fetchRequestDraft"]),
        async getRequest() {
          const res = await this.fetchRequestDraft(this.$route.params.id)
          this.request = res
        },
      },
      created() {
        this.getRequest()
      },
      mounted(){
        window.scrollTo(0, 0);
      },
    }
    </script>