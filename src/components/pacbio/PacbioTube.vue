
<template>
  <b-list-group-item draggable="true" v-on:dragstart="drag(barcode, $event)" v-bind:class="{active: isActive}" v-on:mouseover="isActive = true" v-on:mouseleave="isActive = false">
    <b-img left src="/tube.png" height="70" />
    <div class="info">
      <div class="barcode">
        {{ barcode }}
      </div>
       <div class="sample_names">
        {{ sample_names }}
      </div>
       <div class="tag_group_ids">
        {{ tag_group_ids }}
      </div>
    </div>
 </b-list-group-item>
</template>

<script>

const img = new Image()
img.src = '/tube.png'

export default {
  name: 'Tube',
  props: {
    barcode: {
      type: String,
      required: true
    },
    sample_names: {
      type: String,
      required: true
    },
    tag_group_ids: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  // TODO: need to add a a test for drag
  methods: {
    drag (barcode, event) {
      event.dataTransfer.setDragImage(img,120,50)
      event.dataTransfer.setData('barcode', barcode)
    }
  }
}
</script>

<style scoped lang="scss">
  svg {
    float: left;
    width: 82px;
    height: 64px;
  }
  image {
    width: 82px;
    height: 64px;
  }
  div {
    text-align: left;
  }
  .active {
    background-color: gray;
    filter: none;
  }
</style>
