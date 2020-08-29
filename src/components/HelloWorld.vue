<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" hover>
          <v-card-title>County selection</v-card-title>
          <v-card-text
            >Click the plus button on this card to open the county selection
            drawer. You may select one or multiple counties in NC to populate
            the chart and data table.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              fab
              right
              small
              color="pink"
              @click.stop="drawer = !drawer"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" hover>
          <chart
            :options="chartOptions"
            style="width: 100%;"
            autoresize
          ></chart>
        </v-card>
      </v-col>
    </v-row>
    <v-data-table
      :items="filteredData"
      :headers="headers"
      item-key="county"
      sort-by="county"
      class="elevation-1"
    >
      <template v-slot:item.gross_collections="{ item }">
        {{
          item.gross_collections.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })
        }}
      </template>
      <template v-slot:item.net_collections="{ item }">
        {{
          item.net_collections.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })
        }}
      </template>
      <template v-slot:item.foreign_collections="{ item }">
        {{
          item.foreign_collections.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })
        }}
      </template>
      <template v-slot:item.refunds="{ item }">
        {{
          item.refunds.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })
        }}
      </template>
    </v-data-table>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-container>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="selectedCounty"
              :items="countyChoices"
              chips
              label="Select one or more counties:"
              deletable-chips
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  computed: {
    ...mapState(["collectionsRefunds", "countyChoices"]),
    filteredData() {
      return this.collectionsRefunds.filter(item =>
        this.selectedCounty.includes(item.county)
      );
    },
    chartLabels() {
      let dates = [];
      this.filteredData.forEach(item => dates.push(item.date));
      return Array.from(new Set(dates));
    },
    chartData() {
      let data = [];
      this.filteredData.forEach(item => data.push(item.net_collections));
      return data;
    },
    multiSeriesData() {
      let multiData = [];
      for (let i = 0; i < this.selectedCounty.length; i++) {
        let newData = this.filteredData.filter(
          item => item.county == this.selectedCounty[i]
        );
        let chartData = [];
        newData.forEach(item => chartData.push(item.net_collections));
        let chartSeries = {
          type: "line",
          name: `${this.selectedCounty[i]} County`,
          data: chartData,
          smooth: true
        };
        multiData.push(chartSeries);
      }
      return multiData;
    },
    chartOptions() {
      return {
        legend: {
          type: "plain",
          show: true
        },
        xAxis: {
          data: this.chartLabels,
          show: true
        },
        yAxis: {
          type: "value",
          show: true,
          axisLabel: {
            formatter: "${value}"
          }
        },
        series: this.multiSeriesData,
        tooltip: {
          show: true,
          trigger: "axis",
          triggerOn: "mousemove"
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              title: "Save as Image"
            }
          }
        }
      };
    }
  },
  data() {
    return {
      selectedCounty: ["Wake"],
      drawer: null,
      headers: [
        { text: "County", value: "county" },
        { text: "Fiscal Year", value: "fiscal_year" },
        { text: "Month", value: "month" },
        { text: "Gross Collections", value: "gross_collections" },
        { text: "Foreign Collections", value: "foreign_collections" },
        { text: "Refunds", value: "refunds" },
        { text: "Net Collections", value: "net_collections" }
      ]
    };
  }
};
</script>
