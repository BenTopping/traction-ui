
<template>
  <b-list-group-item
    draggable="true" 
    v-on:dragstart="drag(name, $event)" 
    v-bind:class="{active: isActive}" 
    v-on:mouseover="isActive = true" 
    v-on:mouseleave="isActive = false"
  >
    <b-img left src="/tube.png" height="30" draggable="false" />
    <div class="name" :id="name">
      {{ name }}
    </div>
  </b-list-group-item>
</template>

<script>

const img = new Image()
img.src = '/tube.png'

export default {
  name: 'OntTube',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    drag (name, event) {
      event.dataTransfer.setDragImage(img, 80, 0)
      event.dataTransfer.setData('libraryName', name)
      event.dataTransfer.setData('sourceType', 'LIBRARY_LIST')
    }
  },
}
</script>

<style scoped lang="scss">

  .active {
    background-color: gray;
    border: gray;
  }
</style>
