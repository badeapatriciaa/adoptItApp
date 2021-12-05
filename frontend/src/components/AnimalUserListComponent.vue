<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="index"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "index",
    label: "#",
    field: "index",
  },
  {
    name: "Type",
    required: true,
    label: "Type",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Breed",
    required: true,
    label: "Breed",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "Name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Gender",
    required: true,
    label: "Gender",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Description",
    required: true,
    label: "Description",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  // { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  // { name: "carbs", label: "Carbs (g)", field: "carbs" },
  // { name: "protein", label: "Protein (g)", field: "protein" },
  // { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  // {
  //   name: "calcium",
  //   label: "Calcium (%)",
  //   field: "calcium",
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // {
  //   name: "iron",
  //   label: "Iron (%)",
  //   field: "iron",
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
];

import axios from "axios";
export default {
  name: "AnimalUserListComponent",
  data() {
    return {
      animals: [],
      showModal: false,
      rows: [],
    };
  },
  beforeMount() {
    try {
      let userLoggedIn = localStorage.getItem("userId");
      axios.get("http://localhost:5050/animals/" + userLoggedIn).then((res) => {
        this.animals = res.data.animals;
        console.log(JSON.stringify(res.data));
        console.log("animale sunt " + JSON.stringify(this.animals));

        for (let i = 0; i < this.animals.length; i++) {
          this.rows = this.rows.concat(
            this.animals.map((r, j) => ({
              ...r,
              index: i * this.animals.length + j + 1,
            }))
          );
        }
      });
    } catch (err) {
      console.log(
        "Error during retrieving animals from database: " + err.message
      );
    }
  },
  setup() {
    return {
      columns,

      // this.rows,

      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
};
</script>
