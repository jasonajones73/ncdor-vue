<template>
  <v-container>
    <h2>Welcome</h2>
    <p>
      This site focuses on the simplified distribution of North Carolina
      Department of Revenue (NC DOR) local government sales tax data.
    </p>
    <v-list>
      <h4>In this site, you should find:</h4>
      <v-list-item>
        <v-list-item-icon
          ><v-icon color="primary"
            >mdi-subdirectory-arrow-right</v-icon
          ></v-list-item-icon
        >
        <v-list-item-content>
          <v-list-item-title
            >Links to consolidated Excel files from NC DOR that have been
            uniformly named</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon
          ><v-icon color="primary"
            >mdi-subdirectory-arrow-right</v-icon
          ></v-list-item-icon
        >
        <v-list-item-content>
          <v-list-item-title>Links to tidy data files</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon
          ><v-icon color="primary"
            >mdi-subdirectory-arrow-right</v-icon
          ></v-list-item-icon
        >
        <v-list-item-content>
          <v-list-item-title
            >An exploration page for county data</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <h3>Links to data</h3>
    <v-expansion-panels inset multiple>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Monthly Sales and Use Tax<template v-slot:actions>
            <v-btn fab small color="pink"
              ><v-icon color="white">mdi-swap-vertical</v-icon></v-btn
            >
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content
          ><ul>
            <li>
              <a
                href="https://github.com/jasonajones73/ncdor/tree/master/files/monthly_sales"
                target="_blank"
                >Consolidated Excel Files</a
              >
            </li>
            <li>
              <a
                href="https://raw.githubusercontent.com/jasonajones73/ncdor/master/data/monthly_sales.csv"
                target="_blank"
                >Single Tidy Data File</a
              >
            </li>
          </ul></v-expansion-panel-content
        >
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Sales and Use Tax County Detail<template v-slot:actions>
            <v-btn fab small color="pink"
              ><v-icon color="white">mdi-swap-vertical</v-icon></v-btn
            >
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content
          ><ul>
            <li>
              <a
                href="https://github.com/jasonajones73/ncdor/tree/master/files/sales_and_use"
                target="_blank"
                >Consolidated Excel Files</a
              >
            </li>
            <li>
              <a
                href="https://raw.githubusercontent.com/jasonajones73/ncdor/master/data/sales_and_use.csv"
                target="_blank"
                >Single Tidy Data File</a
              >
            </li>
          </ul></v-expansion-panel-content
        >
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Local Government Sales and Use Tax Distribution<template
            v-slot:actions
          >
            <v-btn fab small color="pink"
              ><v-icon color="white">mdi-swap-vertical</v-icon></v-btn
            >
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content
          ><ul>
            <li>
              <a
                href="https://github.com/jasonajones73/ncdor/tree/master/files/distributions"
                target="_blank"
                >Consolidated Excel Files</a
              >
            </li>
            <li>
              <a
                href="https://raw.githubusercontent.com/jasonajones73/ncdor/master/data/collections_refunds.csv"
                target="_blank"
                >Single Tidy Collections/Refunds Data File</a
              >
            </li>
            <li>
              <a
                href="https://raw.githubusercontent.com/jasonajones73/ncdor/master/data/article_overview.csv"
                target="_blank"
                >Single Tidy Article Overview Data File</a
              >
            </li>
            <li>
              <a
                href="https://raw.githubusercontent.com/jasonajones73/ncdor/master/data/summary.csv"
                target="_blank"
                >Single Tidy Summary Data File</a
              >
            </li>
          </ul></v-expansion-panel-content
        >
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage",
  components: {}
};
</script>
