<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card hover>
          <v-card-title>Explore the Data</v-card-title>
          <v-card-text
            >Click the plus button on this card to open the county and variable
            selection drawer. You may select Net Collections, Gross Collections,
            Refunds, or Foreign Collections to display in the chart. You may
            also select one or multiple counties in NC to populate the chart and
            the data table.</v-card-text
          >
          <v-card-actions>
            <v-btn
              class="align-center"
              dark
              width="100%"
              small
              color="pink"
              @click.stop="drawer = !drawer"
            >
              <v-icon class="mr-1">mdi-chart-box-plus-outline</v-icon>Make
              Selections
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
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
            <v-select
              v-model="selectedVariable"
              :items="selectOptions"
              label="Select the variable you would like to display in the chart:"
            ></v-select>
          </v-col>
        </v-row>
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
      this.filteredData.forEach(item => data.push(item[this.selectedVariable]));
      return data;
    },
    multiSeriesData() {
      let multiData = [];
      for (let i = 0; i < this.selectedCounty.length; i++) {
        let newData = this.filteredData.filter(
          item => item.county == this.selectedCounty[i]
        );
        let chartData = [];
        newData.forEach(item => chartData.push(item[this.selectedVariable]));
        let chartSeries = {
          type: "line",
          name: `${this.selectedCounty[i]} County`,
          data: chartData,
          smooth: true,
          style: "currency"
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
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        dataZoom: [
          {
            type: "slider",
            show: true
          }
        ],
        series: this.multiSeriesData,
        tooltip: {
          show: true,
          trigger: "axis",
          triggerOn: "mousemove",
          formatter: function(params) {
            let newTooltip = params[0].name + "</br>";
            for (let i = 0; i < params.length; i++) {
              let val = params[i].value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              });
              newTooltip += `${params[i].marker} ${params[i].seriesName}: ${val} </br>`;
            }
            return newTooltip;
          }
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
      selectedVariable: "net_collections",
      drawer: null,
      headers: [
        { text: "County", value: "county" },
        { text: "Fiscal Year", value: "fiscal_year" },
        { text: "Month", value: "month" },
        { text: "Gross Collections", value: "gross_collections" },
        { text: "Foreign Collections", value: "foreign_collections" },
        { text: "Refunds", value: "refunds" },
        { text: "Net Collections", value: "net_collections" }
      ],
      selectOptions: [
        { text: "Net Collections", value: "net_collections" },
        { text: "Gross Collections", value: "gross_collections" },
        { text: "Foreign Collections", value: "foreign_collections" },
        { text: "Refunds", value: "refunds" }
      ]
    };
  }
};
</script>
