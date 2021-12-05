<template>
  <div class="formContainer">
    <q-card class="formCard">
      <h1 class="formHeading">Register and adopt a pet</h1>

      <q-input
        class="formInput"
        v-model="formData.firstName"
        label="First name"
        type="text"
      />
      <q-input
        class="formInput"
        v-model="formData.lastName"
        label="Last name"
        type="text"
      />
      <q-input
        class="formInput"
        label="Email"
        v-model="formData.email"
        type="email"
      />
      <q-input
        class="formInput"
        label="Age"
        v-model="formData.age"
        type="number"
      />
      <q-input
        class="formInput"
        label="Password"
        v-model="formData.password"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        class="formInput"
        label="Confirm password"
        v-model="formData.confirmPassword"
        :type="isPwdConfirm ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdConfirm = !isPwdConfirm"
          />
        </template>
      </q-input>

      <q-btn @click="submitRegister" class="registerBtn" label="Register" />
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import cogoToast from "cogo-toast";
import { regex_email, regex_name } from "../utils/validations";
import axios from "axios";
export default {
  name: "RegisterFormComponent",
  setup() {
    return {
      isPwd: ref(true),
      isPwdConfirm: ref(true),
    };
  },
  data() {
    return {
      formData: {
        email: ref(""),
        firstName: ref(""),
        lastName: ref(""),
        age: ref(""),
        password: ref(""),
        confirmPassword: ref(""),
      },
    };
  },
  methods: {
    validateFormData: function () {
      let isValid = false;
      if (
        this.formData.firstName === "" ||
        this.formData.lastName === "" ||
        this.formData.password === "" ||
        this.formData.email === "" ||
        this.formData.age === "" ||
        this.formData.confirmPassword === ""
      ) {
        cogoToast.error("Please complete all fields");
      } else if (!this.formData.email.match(regex_email)) {
        cogoToast.error("Email should have a proper format");
      } else if (!this.formData.firstName.match(regex_name)) {
        cogoToast.error(
          "First name should contain only letters and start with a capital letter"
        );
      } else if (!this.formData.lastName.match(regex_name)) {
        cogoToast.error(
          "Last name should contain only letters and start with a capital letter"
        );
      } else if (this.formData.password !== this.formData.confirmPassword) {
        cogoToast.error("Passwords don't match");
      } else {
        isValid = true;
      }
      return isValid;
    },
    submitRegister: function () {
      if (this.validateFormData()) {
        let userData = { ...this.formData };
        delete userData.confirmPassword;
        axios
          .post("http://localhost:5050" + "/auth/register", userData)
          .then((res) => {
            if (res.data.status == 409) {
              cogoToast.error("This user already exists");
            } else {
              cogoToast.success(
                "You can now log in and adopt your new friend!"
              );
              this.$router.push("/auth/login");
            }
          })
          .catch((err) => {
            cogoToast("Error! " + err.message);
          });
      }
    },
  },
};
</script>

<style>
.formContainer {
  display: flex;
  justify-content: center;
  padding: 2%;
  background-color: rgb(248, 248, 237) !important;
}

.formHeading {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1px;
}
.registerBtn {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #64686b;
}
.formCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  object-fit: contain;
}

.registerBtn {
  width: 30%;
  color: white;
}

.registerBtn:hover {
  cursor: pointer;
  transform: scale(1.1);
  background-color: wheat;
}
</style>
