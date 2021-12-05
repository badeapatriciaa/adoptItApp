<template>
  <q-layout id="app">
    <div class="q-pa-md">
      <q-toolbar
        style="font-family: Helvetica; letter-spacing: 1.5px; font-weight: bold"
        class="navbar bg-purple text-white shadow-2 rounded-borders"
      >
        <q-space />
        <q-tabs v-model="tab" shrink>
          <q-tab
            v-if="userId === null"
            @click="goToRegister"
            name="tab1"
            label="Register"
          />
          <q-tab
            v-if="userId === null"
            @click="goToLogin"
            name="tab2"
            label="LogIn"
          />
          <q-tab
            v-if="userId !== null"
            @click="goToSeeAllAnimals"
            name="tab3"
            label="See all animals"
          />
          <q-tab
            v-if="userId !== null"
            @click="goToSeeYourList"
            name="tab3"
            label="See your list"
          />
          <q-tab
            v-if="userId !== null"
            @click="createAnimal"
            name="tab3"
            label="Add an animal"
          />
          <q-tab
            v-if="userId !== null"
            @click="logout"
            name="tab4"
            label="Log out"
          />
        </q-tabs>
      </q-toolbar>
    </div>
    <q-page-container class="pageContainer">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  methods: {
    goToRegister: function () {
      this.$router.push("/auth/register");
    },
    goToLogin: function () {
      this.$router.push("/auth/login");
    },
    createAnimal: function () {
      this.$router.push("/createAnimal");
    },
    goToSeeAllAnimals: function () {
      this.$router.push("/home");
    },
    goToSeeYourList: function () {
      this.$router.push("/seeYourList");
    },
    logout: function () {
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");

      this.$router.push("/");
    },
  },
  data() {
    return {
      tab: ref(""),
      userId: null,
      userToken: null,
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    this.userToken = localStorage.getItem("userToken");
  },

  components: {},
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1b1c1e;
  width: 100%;
  height: 100%;
  background-color: rgb(248, 248, 237);
}

.q-pa-md .navbar {
  background-color: #4a4b4d !important;
}

.navbar span {
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 2.5px;
}

.navbar .q-tab__label {
  font-weight: 700;
}

.pageContainer {
  width: 100%;
}
</style>
