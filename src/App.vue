<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title
        ><v-btn text rounded href="/ncdor-vue/#/"
          >NC Sales Tax Data</v-btn
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn
        v-if="!mainDrawer"
        dark
        fab
        small
        color="white"
        @click.stop="mainDrawer = !mainDrawer"
      >
        <v-icon color="primary">mdi-dots-vertical</v-icon>
      </v-btn>

      <v-btn
        v-if="mainDrawer"
        dark
        fab
        small
        color="white"
        @click.stop="mainDrawer = !mainDrawer"
      >
        <v-icon color="primary">mdi-dots-horizontal</v-icon>
      </v-btn>

      <v-divider class="mx-2" vertical></v-divider>

      <v-btn
        href="https://github.com/jasonajones73/ncdor"
        target="_blank"
        fab
        small
        color="white"
      >
        <v-icon color="primary" large>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-navigation-drawer v-model="mainDrawer" fixed temporary>
      <v-list>
        <v-list-item
          ><v-btn rounded width="100%" href="/ncdor-vue/#/" text
            >Home</v-btn
          ></v-list-item
        >
        <v-divider></v-divider>
        <v-list-item>
          <v-btn rounded width="100%" href="/ncdor-vue/#/explore" text
            >Explore</v-btn
          ></v-list-item
        >
        <v-divider></v-divider>
        <v-list-item
          ><v-btn rounded width="100%" href="/ncdor-vue/#/about" text
            >About</v-btn
          ></v-list-item
        >
        <v-divider></v-divider>
        <v-list-item
          ><v-btn
            rounded
            width="100%"
            href="https://github.com/jasonajones73/ncdor"
            target="_blank"
            text
            ><v-icon class="mr-1">mdi-github</v-icon>GitHub Repo</v-btn
          ></v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <v-footer color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-col class="primary py-4 text-center white--text" cols="12">
          Created by Jason Jones with much &#9829; for all of the open source
          projects that make this site possible:
          <br />
          <a href="https://vuejs.org/" target="_blank" style="color: white;"
            >Vue.js</a
          >,
          <a
            href="https://echarts.apache.org/en/index.html"
            target="_blank"
            style="color: white;"
            >Apache ECharts</a
          >, and
          <a href="https://vuetifyjs.com/" target="_blank" style="color: white;"
            >Vuetify</a
          >.
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
    mainDrawer: null
  }),
  methods: {
    ...mapActions(["fetchCollectionsRefunds"])
  }
};
</script>
