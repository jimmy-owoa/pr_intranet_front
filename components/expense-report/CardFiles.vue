<template>
  <v-card>
      <v-card-title class="text-h5">
        Documentación <br> Guardada  {{id}}
      </v-card-title>
        <v-card-text v-if="files.length > 0">
          <div v-for="(file, index) in files" :key="file.id">
              <v-chip
                class="ma-1"
                close
                color="#007356"
                label
                v-bind:href="file.url" 
                outlined
                @click:close="deleteFile(file.id, index)">
                  Descargar archivo
              </v-chip>
          </div> 
        </v-card-text>
        <v-card-tex v-else>
          <p style="padding-left:24px">No se han cargado archivos</p>
        </v-card-tex>
      <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn
          color="#007356"
          text
          @click=sendData
        >
          Salir
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
  import { mapActions } from "vuex";
  
  export default {
    props: ['files', 'id'],
    data: () => ({
    }),
    created() {
    },
    methods: {
      deleteFile(id, index){
      if(confirm("Esta seguro/a que quiere eliminar este archivo")){
       this.$axios.delete('/expense_report_requests/destroy_file?id='+id)
          .then(resp => {
            this.files.splice(index, 1)
          })
          .catch(error => {
            console.log(error);
          })
        }
      },
      sendData() {
      this.$emit("getValues", {
        
      });
    }
    }
  };
  </script>
  <style scoped>
  </style>
  