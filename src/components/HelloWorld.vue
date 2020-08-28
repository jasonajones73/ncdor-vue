<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedCounty"
          :items="countyChoices"
          chips
          label="Select a North Carolina county:"
          deletable-chips
          multiple
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" min-height="200" hover>
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
        title: {
          text: "North Carolina Net Collections"
        },
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
