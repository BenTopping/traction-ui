<template>
  <Plate96SVG v-bind:height="'100%'" v-bind:width="'100%'">
    <well v-for="(well, key) in plateMap.wells" v-bind="well" v-bind:key="key" @alert="alert">
    </well>
  </Plate96SVG>
</template>

<script>

import Plate96SVG from '@/components/svg/Plate96SVG'
import PlateMap from '@/config/PlateMap'
import Well from '@/components/pacbio/PacbioWell'

export default {
  name: 'Plate',
  data () {
    return {
      selectedWellPosition: null
    }
  },
  computed: {
    plateMap () {
      return PlateMap
    }
  },
  components: {
    Well,
    Plate96SVG
  },
  methods: {
    alert(message, type) {
      this.$emit('alert', message, type)
    }
  }
}
</script>
