<template>
  <div>
    <v-col cols="12" class="pt-0">
      <Breadcrumbs :items="breadcrumbs" />
    </v-col>

    <v-card class="mb-4">
      <v-card-title>{{ oferta.requested_position_title }}</v-card-title>
      <v-card-text>
        <p><strong>Fecha de creación:</strong> {{ oferta.created_at }}</p>
        <p>
          <strong>Años de experiencia requeridos:</strong>
          {{ oferta.years_of_experience }}
        </p>
        <p>
          <strong>Educación requerida:</strong> {{ oferta.required_education }}
        </p>
        <p><strong>Turno:</strong> {{ oferta.shift }}</p>
        <p>
          <strong>Titulo solicitado:</strong>
          {{ oferta.requested_position_title }}
        </p>
        <p><strong>Carrera(s):</strong> {{ oferta.careers }}</p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        Información del postulante
      </v-card-title>

      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="postulante.nombreCompleto"
                label="Nombre completo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="postulante.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="postulante.telefono"
                label="Número de teléfono"
                type="tel"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <h2>Sube tu currículum</h2>
          <input type="file" @change="onFileSelected" />
        </v-form>
      </v-card-text>
      <v-btn @click="submitApplication" class="my-5 mx-5 primary"
        >Enviar Postulación</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/helpcenter/Breadcrumbs"
export default {
  data() {
    return {
      breadcrumbs: [
        { to: "/", text: "Inicio", disabled: false, exact: true },
        { to: "", text: "Oferta", disabled: true }
      ],
      oferta: null,
      file: null,
      postulante: {
        nombreCompleto: "",
        email: "",
        telefono: ""
      }
    };
  },
  components: {
      Breadcrumbs,
    },
  async asyncData({ params, $axios }) {
    // Obtener los detalles de la oferta laboral usando params.id
    const oferta = await $axios.$get(`/hc_tickets/ofertas?id=${params.id}`);
    console.log(oferta);
    return { oferta };
  },
  methods: {
    onFileSelected(event) {
      this.file = event.target.files[0];
    },
    async submitApplication() {
      if (!this.file) {
        alert("Por favor, selecciona un archivo.");
        return;
      }

      if (!this.postulante.nombreCompleto || !this.postulante.email || !this.postulante.telefono) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      const formData = new FormData();
      
      formData.append("file", this.file);
      formData.append("applicant_name", this.postulante.nombreCompleto);
      formData.append("email", this.postulante.email);
      formData.append("phone", this.postulante.telefono);
      formData.append("ofertaId", this.oferta.id);
      // Suponiendo que tienes un endpoint para subir el currículum y aplicar
      try {
        await this.$axios.$post(`/hc_tickets/${this.oferta.id}/create_postulacion`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert("Postulación enviada con éxito.");
        // Aquí podrías redirigir al usuario o dar alguna otra indicación de éxito
      } catch (error) {
        console.error("Error al enviar la postulación:", error);
        alert("Hubo un error al enviar tu postulación. Por favor, inténtalo de nuevo.");
      }

      alert("Postulación enviada con éxito.");
      // Aquí podrías redirigir al usuario o dar alguna otra indicación de éxito
    },
  }
};
</script>
