<template>
  <div class="formContainer">
    <q-card class="formCard">
      <h1 class="formHeading">Add your animal</h1>
      <q-input
        class="formInput"
        label="Type"
        v-model="formData.animalType"
        type="text"
      />
      <q-input
        class="formInput"
        label="Breed"
        v-model="formData.animalBreed"
        type="text"
      />
      <q-input
        class="formInput"
        label="Name"
        v-model="formData.animalName"
        type="text"
      />
      <q-input
        class="formInput"
        label="Gender"
        v-model="formData.animalGender"
        type="text"
      />
      <q-input
        class="formInput"
        label="Description"
        v-model="formData.animalDescription"
        type="text"
      />
      <q-btn
        @click="createAnimal"
        class="registerBtn"
        style="width: 30%"
        text-color="white"
        label="Create Animal"
      />
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import cogoToast from "cogo-toast";
import axios from "axios";
export default {
  name: "AnimalCreationComponent",
  data() {
    return {
      formData: {
        animalType: ref(""),
        animalBreed: ref(""),
        animalName: ref(""),
        animalGender: ref(""),
        animalDescription: ref(""),
      },
    };
  },
  methods: {
    validateFormData: function () {
      let isValid = false;
      if (
        this.formData.animalType === "" ||
        this.formData.animalBreed === "" ||
        this.formData.animalName === "" ||
        this.formData.animalGender === "" ||
        this.formData.animalDescription === ""
      ) {
        cogoToast.error("All fields should be filled in.");
      } else {
        isValid = true;
      }
      return isValid;
    },

    createAnimal: function () {
      if (this.validateFormData()) {
        let userLoggedIn = localStorage.getItem("userId");
        if (userLoggedIn === null) {
          cogoToast.error("Session expired! Please login again!");
          return;
        }
        let animalData = { ...this.formData };
        console.log(
          "token is " + `Bearer ${localStorage.getItem("userToken")}`
        );
        axios
          .post(
            "http://localhost:5050" + "/animals/create/" + userLoggedIn,
            animalData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
            }
          )
          .then(() => {
            cogoToast.success("Success!");
            this.$router.push("/home");
          })
          .catch(() => {
            cogoToast("Something went wrong!");
          });
      }
    },
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
