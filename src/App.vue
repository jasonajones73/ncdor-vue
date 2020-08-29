<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>NC Local Government Sales Tax Data</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="/ncdor-vue/" text>Home</v-btn>
      <v-btn href="/ncdor-vue/explore" text>Explore</v-btn>
      <v-btn href="/ncdor-vue/about" text>About</v-btn>

      <v-btn href="https://github.com/jasonajones73/ncdor" target="_blank" text>
        <span class="mr-2">GitHub Repo</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-col class="primary py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Jason Jones</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  //dispatching on create from here so it doesn't dispatch every time a component is created on load
  created() {
    this.$store.dispatch("fetchCollectionsRefunds");
  },

  components: {},

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["fetchCollectionsRefunds"])
  }
};
</script>
