<template>
  <div>
    <v-card dense outlined type="error" style="margin: 5px">
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field class="p-10" label="Sociedad"></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field class="p-10" label="Divisa" required></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field class="p-10" label="Subtotal" required></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-file-input class="p-10" show-size label="Adjunto"></v-file-input>
        </v-col>
        <v-col cols="12" md="2" class="btn-close">
          <v-btn class="mx-2" fab dark small color="error">
            <v-icon dark>
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({})
};
</script>
<style>
.btn-close {
  text-align: center;
  padding-top: 25px;
}
.p-10 {
  padding: 10px;
}
</style>
