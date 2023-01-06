<template>
  <div v-if="requests.length > 0">
    <h3 class="text-center pa-6">Rendiciones pendientes</h3>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              N°
            </th>
            <th class="text-left">
              id
            </th>
            <th class="text-left">
              Nombre Usuario
            </th>
            <th class="text-left">
              acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in requests" :key="request.id">
            <td>{{ index + 1 }}</td>
            <td>{{ request.id }}</td>
            <td>{{ request.user_name }}</td>
            <td>
              <v-btn small v-bind:href="request.link" style="margin: 1px">
                Ver
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    requests: { type: Object, required: true }
  },
};
</script>
