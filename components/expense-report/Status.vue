<template>
  <div class="container" style="padding-top: 0;">
    <h2 class="mb-4">Pasos de tu rendición</h2>
    <v-row class="my-2 d-flex">
      <v-col cols="12" sm="3" md="3" class="text-center">
        <span class="mdi mdi-send-circle size-i" :class="getClass(1)"></span>
        <p>Paso 1</p>
        <p>Enviada, a la espera de la aprobación de su supervisor</p>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="text-center">
        <span class="mdi mdi-account-check size-i" :class="getClass(2)"></span>
        <p>Paso 2</p>
        <p>Aprobada, a la espera de la atención del equipo de contabilidad</p>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="text-center">
        <span class="mdi mdi-file-check size-i" :class="getClass(3)"></span>
        <p>Paso 3</p>
        <p>Atendida por el equipo de contabilidad.</p>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="text-center">
        <span class="mdi mdi-check-circle size-i" :class="getClass(4)"></span>
        <p>Paso 4</p>
        <p>Rendición finalizada</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    getClass(iconIndex) {
  let currentIconIndex = 0;
  if (this.status === 'enviado') {
    currentIconIndex = 1;
  }
  if (this.status === 'aprobado') {
    currentIconIndex = Math.max(currentIconIndex, 2);
  }
  if (this.status === 'atendiendo') {
    currentIconIndex = Math.max(currentIconIndex, 3);
  }
  if (this.status === 'resuelto') {
    currentIconIndex = Math.max(currentIconIndex, 4);
  }

  return {
    'text-success': iconIndex <= currentIconIndex,
    'text-ccc': iconIndex > currentIconIndex
  };
}

  }
};
</script>

<style lang="css">
.size-i {
  font-size: 3rem;
}

.text-success {
  color: #4caf50;
}
.text-ccc{
  color: #ccc;
}
</style>
