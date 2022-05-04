<template>
  <div>
    <v-row class="mt-3" justify="center">
      <v-col cols="12">
        <h1 class="uk-heading-title-m my-3">Bienvenido al centro de ayuda</h1>

        <h2 class="uk-overtitle-l my-5">Ingresa aquí tus requerimientos</h2>
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA
          title="Rendición de gastos"
          icon="ChartHistogramIcon"
          url="/rendicion-gastos"
        />
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA
          title="Requerimientos Servicios Generales"
          icon="InteractiveIcon"
          url="/crear-caso?category=requerimientos-servicios-generales"
        />
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA
          title="Requerimientos GDT"
          icon="InteractiveIcon"
          url="/crear-caso?category=requerimientos-gdt"
        />
      </v-col>
    </v-row>
    <v-row class="mt-3" justify="center">
      <v-col cols="12">
        <h2 class="uk-overtitle-l my-5">Haz seguimiento a tus casos</h2>
      </v-col>
      <v-col cols="12" md="3">
        <CardInfoA
          title="Ver mis casos"
          icon="ListCheckIcon"
          url="/mis-casos"
        />
      </v-col>
    </v-row>

    <!-- nuevo -->
    <v-row>
      <v-col cols="12">
        <h2 class="uk-overtitle-l my-5">¿En qué te podemos ayudar?</h2>
      </v-col>
      <v-col cols="12" class="text-left">
        <h2 class="uk-overtitle-sub my-5">Rendición de Gastos</h2>
        <h2 class="uk-overtitle-left my-5">
          Realiza tu rendición de gastos a través de este módulo. Como
          requisitos debes ingresar los siguientes datos como mínimo:
        </h2>
        <ul class="text-left uk-parrafo">
          <li>Ingresar la moneda de pago</li>
          <li>Ingresar el subtotal de la/las rendiciones cargadas</li>
          <li>Adjuntar todos los comprobantes de pago</li>
        </ul>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-left">
        <h2 class="uk-overtitle-sub my-5">
          ¿Qué requerimientos puedo solicitar a Servicios Generales?
        </h2>
        <ul class="text-left uk-parrafo">
          <li>Sacar firmas (externos y apoderados)</li>
          <li>Retiro / Envío de documentos</li>
          <li>Transacciones Bancarias: Depósitos / Retiros de cheques</li>
          <li>Reparaciones</li>
          <li>
            Solicitud de insumos, materiales de escritorio, abarrotes, etc.
          </li>
          <li>Retiros en bodega</li>
        </ul>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-left">
        <h2 class="uk-overtitle-sub my-5">
          ¿Qué requerimientos puedo solicitar a GDT?
        </h2>
        <ul class="text-left uk-parrafo">
          <li>Solicitud de certificados de antigüedad, renta, otros</li>
          <li>Dudas con mi liquidación de sueldo</li>
          <li>
            Saldos de vacaciones, dudas de períodos tomadas, feriado progresivo,
            etc.
          </li>
          <li>
            Convenio Entel (compras de equipos, planes, portabilidad, cambios en
            general)
          </li>
          <li>
            Seguro Complementario (inscripción 7 eliminación de cargas, cobros,
            coberturas, deducible, cómo funciona, problemas en reembolsos, etc.)
          </li>
          <li>Dauda provisional y cobranzas</li>
          <li>Capacitación en general</li>
          <li>
            Lonchera (solicitud /recuperación de clave, bloqueos, cobros
            erróneos, otros)
          </li>
          <li>
            Estacionamiento (asignación, cobro, solicitudes para clientes)
          </li>
          <li>
            Remuneraciones (cambios de cargo, centro de costo, renta, empresa,
            dudas)
          </li>
          <li>Reclutamiento en general y sus procesos</li>
        </ul>
      </v-col>
    </v-row>
    <!-- nuevo -->
    <!-- 
    <v-row>
      <v-col cols="12">
        <h2 class="ma-0 mt-2 hc__blue-text uk-title-h2">
          Preguntas Frecuentes
        </h2>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="12">
            <ListImportantQuestions :questions="questions" />
          </v-col>
          <v-col cols="12" md="12" mt-4>
            <h2 class="ma-0 mt-2 hc__blue-text uk-title-h2">
              Elige la categoría para la que necesitas resolver dudas
            </h2>
          </v-col>

          <v-col cols="12">
            <CategoryList :categories="categories" />
          </v-col>
        </v-row>
      </v-col>
    </v-row> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ListImportantQuestions from "@/components/helpcenter/ListImportantQuestions.vue";
import CategoryList from "@/components/helpcenter/CategoryList.vue";
import CardInfoA from "@/components/helpcenter/CardInfoA";
import CardInfoB from "@/components/helpcenter/CardInfoB";

export default {
  middleware: ["auth"],
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
  letter-spacing: 2px;
}
.uk-heading-title-m {
  font-size: 3.2rem;
  line-height: 1;
  text-align: center;
  color: #BB3D4D;
  letter-spacing: 2px;
}
.uk-overtitle-left{
  font-weight: 400;
  font-size: 1rem;
  text-transform: uppercase !important;
  text-align: start;
  color: #BB3D4D;
  letter-spacing: 3px;
}
.uk-overtitle-l {
  font-weight: 300;
  font-size: 2rem;
  text-transform: uppercase !important;
  text-align: center;
  letter-spacing: 3px;
}
.uk-overtitle-sub {
  font-weight: 400;
  font-size: 1.5rem;
  text-transform: uppercase !important;
  text-align: start;
  letter-spacing: 3px;
}
.uk-parrafo {
 
  text-align: start;
  color: #bb3d4d;
  letter-spacing: 3px;
}
</style>
