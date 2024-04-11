<template>
  <div>
    <v-row class="mt-3" justify="center">
      <v-col cols="12">
        <h1 class="uk-heading-title-m my-3">Parque del Recuerdo</h1>

        <h2 class="uk-overtitle-l my-5">Ofertas laborales.</h2>
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA
          title="Ver Ofertas laborales"
          icon="InteractiveIcon"
          url="/ofertas-laborales"
        />
      </v-col>
    </v-row>
    <v-row class="mt-3" justify="center">
      <v-col cols="12">
        <h2 class="uk-overtitle-l my-5">Haz seguimiento a tus postulaciones</h2>
      </v-col>

      <v-col cols="12" md="3">
        <CardInfoA
          title="Ver mis postulaciones"
          icon="ListCheckIcon"
          url="/mis-casos"
        />
      </v-col>
      <!-- <v-col cols="12" md="3">
        <CardInfoA
          title="Ver mis postulaciones"
          icon="ListCheckIcon"
          url="/mis-rendiciones/pendientes"
        />
      </v-col> -->
    </v-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ListImportantQuestions from "@/components/helpcenter/ListImportantQuestions.vue";
import CategoryList from "@/components/helpcenter/CategoryList.vue";
import CardInfoA from "@/components/helpcenter/CardInfoA";
import CardInfoB from "@/components/helpcenter/CardInfoB";

export default {
  components: {
    CategoryList,
    ListImportantQuestions,
    CardInfoA,
    CardInfoB,
  },
  data() {
    return {
      questions: [],
      categories: [],
    };
  },
  methods: {
    ...mapActions("helpcenter", ["fetchCategories", "fetchQuestionsImportant"]),
    async getImportantQuestions() {
      const res = await this.fetchQuestionsImportant();
      this.questions = res;
    },
    async getCategories() {
      const res = await this.fetchCategories();
      this.categories = res;
    },
    goTo() {
      this.$router.push({ name: "crear-caso", params: { category: "hola" } });
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  created() {
    this.getImportantQuestions();
    this.getCategories();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
<style lang="css">
.uk-title-h2 {
  font-size: 2.6rem;
  line-height: 1.3;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 800;
  text-transform: none;
}
.uk-heading-title-m {
  font-size: 3.2rem;
  line-height: 1;
  text-align: center;
  color: #007356;
}
.uk-overtitle-left{
  font-weight: 400;
  font-size: 1rem;
  text-transform: uppercase !important;
  text-align: start;
}
.uk-overtitle-l {
  font-weight: 300;
  font-size: 2rem;
  text-transform: uppercase !important;
  text-align: center;
}
.uk-overtitle-sub {
  font-weight: 600;
  font-size: 1.5rem;
  text-transform: uppercase !important;
  text-align: start;
  color: #007356;
}
.uk-parrafo {
  text-align: start;
}
</style>
