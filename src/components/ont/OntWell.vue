<template>
  <ellipse v-bind:class="status" :cx="cx" :cy="cy" :rx="rx" :ry="ry" >
    <title v-if="hasMaterial" v-text="tooltip"></title>
  </ellipse>
</template>

<script>

export default {
  name: 'OntWell',
  props: ['row', 'column', 'cx', 'cy', 'rx', 'ry' ,'well_info'],
  computed: {
    hasMaterial () {
      return !!this.well_info.materials.some(m => m.name)
    },
    status () {
      return this.hasMaterial ? 'filled' : 'empty'
    },
    tooltip () {
      return this.hasMaterial ? this.well_info.materials.map(m =>  m.name).join(', ') : ''
    },
  }
}
</script>

<style scoped lang="scss">
  ellipse {
    transform: matrix(0.91863074,0,0,0.92029059,955.85411,1007.3112);
    stroke: #000000;
  }
  .filled{
    fill:green;
  }

</style>
