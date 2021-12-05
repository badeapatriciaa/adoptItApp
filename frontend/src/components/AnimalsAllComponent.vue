<template>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Type</th>
        <th>Breed</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="animal in animals" :key="animal.id">
        <td>{{ animal.animalType }}</td>
        <td>{{ animal.animalBreed }}</td>
        <td>{{ animal.animalName }}</td>
        <td>{{ animal.animalGender }}</td>
        <td>{{ animal.animalDescription }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "AnimalsAllComponent",
  data() {
    return {
      animals: [],
      showModal: false,
    };
  },
  beforeMount() {
    try {
      axios
        .get("http://localhost:5050/animals" + "/getAllAnimals")
        .then((res) => {
          this.animals = res.data.animals;
        });
    } catch (err) {
      console.log(
        "Error during retrieving animals from database: " + err.message
      );
    }
  },
};
</script>

<style>
.formContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #64686b;
  padding: 2%;
  min-height: 100vh;
}

.formHeading {
  font-size: 28px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  color: #64686b;
}
.registerBtn {
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #64686b;
}
.formCard {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.formContainer .formCard .formInput {
  width: 50%;
  padding: 10px 10px 35px 10px !important;
}
</style>
