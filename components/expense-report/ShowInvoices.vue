<template>
  <v-data-table :headers="headers" :items="invoices" item-key="id">
    <template v-slot:item="{ item, index }">
      <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ item.description }}</td>
        <td>{{ getCategoryName(item.category_id) }}</td>
        <td>${{ item.total }}</td>
        <td>
          <a
            v-if="item.files_url && item.files_url[0]"
            :href="item.files_url[0].url"
            download
            target="_blank"
          >
            <v-btn color="primary" small>
              Descargar archivo
            </v-btn>
          </a>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    invoices: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Descripción", value: "description" },
        { text: "Categoría", value: "category_id" },
        { text: "Total", value: "total" },
        { text: "Archivos", value: "" }
      ],
      categories: []
    };
  },
  methods: {
    ...mapActions("expense-report", ["fetchCategoriesRequest"]),
    async getCategories() {
      const res = await this.fetchCategoriesRequest();
      this.categories = res;
    },
    getCategoryName(categoryId){
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : '';
    }
  },
  mounted() {
    this.getCategories()
  }

};
</script>
