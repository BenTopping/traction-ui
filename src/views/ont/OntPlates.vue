<template>
  <div class="ont-plates">
    <alert ref='alert'></alert>

    <b-table 
      id="plates-table"
      hover 
      bordered
      responsive
      :items="getPlates"
      :fields="fields"
      sticky-header
      show-empty
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" variant="outline-primary" :id="'details-btn-'+row.item.id">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Plate
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <OntPlate v-bind:plate="row.item" @alert="alert" ref='ontPlate'></OntPlate>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage">
    </b-pagination>

    <span class="font-weight-bold">Total records: {{ totalRows }}</span>

  </div>
</template>

<script>

import Alert from '@/components/Alert'
import Helper from '@/mixins/Helper'
import OntPlate from '@/components/ont/OntPlate'
import PLATES_ALL_QUERY from '@/graphql/queries/PlatesAll.query.gql'

export default {
  name: 'OntPlates',
  data () {
    return { 
      fields: [ 'id','barcode','createdAt','show_details'],
      perPage: 5,
      currentPage: 1,
      totalRows: 0
    }
  },
  components: {
    OntPlate,
    Alert
  },
  mixins: [Helper],
  methods: {
    alert(message, type) {
      this.showAlert(message, type)
    },
    getPlates(ctx, callback) {
      this.$apollo.query({
        query: PLATES_ALL_QUERY,
        variables: {
          pageNum: ctx.currentPage,
          pageSize: ctx.perPage
        },
        fetchPolicy: 'no-cache'
      })
      .then(data => {
        this.totalRows = data.data.plates.pageInfo.entitiesCount
        callback(data.data.plates.nodes)
      })
      .catch(() => {
        callback([])
      })
      return null
    }
  },
}
</script>


