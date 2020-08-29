import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/LandingPage.vue";
import About from "../views/About.vue";
import Explore from "../views/Explore.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Landing
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
