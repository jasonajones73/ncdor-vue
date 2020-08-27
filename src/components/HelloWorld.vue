<template>
  <v-container>
    <v-data-table
      :items="collectionsRefunds"
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
    ...mapState(["collectionsRefunds"])
  },
  data() {
    return {
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
