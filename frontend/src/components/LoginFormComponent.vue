<template>
  <div class="formContainer">
    <q-card class="formCard">
      <h1 class="formHeading">Log In</h1>

      <q-input
        class="formInput"
        label="Email"
        v-model="formData.email"
        type="email"
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

      <q-btn
        @click="login"
        class="loginBtn"
        style="width: 30%"
        text-color="white"
        label="Log In"
      />
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import cogoToast from "cogo-toast";
import { regex_email } from "../utils/validations";
import axios from "axios";
export default {
  name: "LoginFormComponent",
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
        password: ref(""),
      },
    };
  },
  methods: {
    validateFormData: function () {
      let isValid = false;
      if (this.formData.password === "" || this.formData.email === "") {
        cogoToast.error("All fields should be filled in.");
      } else if (!this.formData.email.match(regex_email)) {
        cogoToast.error("Email should have a proper format");
      } else {
        isValid = true;
      }
      return isValid;
    },
    login: function () {
      if (this.validateFormData()) {
        let userData = { ...this.formData };
        axios
          .post("http://localhost:5050" + "/auth/login", userData)
          .then((res) => {
            console.log("acesta este res ", res.data);
            if (res.data.status == 404) {
              cogoToast.error("Could not find the specified user!");
            } else if (res.data.status == 400) {
              cogoToast.error("Wrong credentials");
            } else {
              cogoToast.success("Success!");
              localStorage.setItem("userToken", res.data.token);
              localStorage.setItem("userId", res.data.userId);
              this.$router.push("/home");
              this.$forceUpdate();
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
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f8f8ed;
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
.loginBtn {
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #64686b;
}

.loginBtn:hover {
  cursor: pointer;
  transform: scale(1.1);
  background-color: wheat;
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
