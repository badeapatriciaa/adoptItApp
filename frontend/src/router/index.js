import { createRouter, createWebHistory } from "vue-router";

import LandingView from "../views/LandingView.vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AnimalsAllView from "../views/AnimalsAllView.vue";
import AnimalCreationView from "../views/AnimalCreationView.vue";
import AnimalUserListView from "../views/AnimalUserListView";
const routes = [
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
    meta: { layout: BasicLayout },
  },
  {
    path: "/auth/register",
    name: "RegisterView",
    component: RegisterView,
    meta: { layout: BasicLayout },
  },
  {
    path: "/auth/login",
    name: "LoginView",
    component: LoginView,
    meta: { layout: BasicLayout },
  },
  {
    path: "/home",
    name: "AnimalsAllView",
    component: AnimalsAllView,
    meta: { layout: BasicLayout },
  },
  {
    path: "/createAnimal",
    name: "AnimalCreationView",
    component: AnimalCreationView,
    meta: { layout: BasicLayout },
  },
  {
    path: "/seeYourList",
    name: "AnimalUserListView",
    component: AnimalUserListView,
    meta: { layout: BasicLayout },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
