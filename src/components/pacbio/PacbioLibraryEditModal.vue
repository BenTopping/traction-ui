<template>
  <div>
    <b-button :id="'editLibrary-'+this.lib.id" size="sm" @click="show" variant="outline-primary">Edit</b-button>

    <b-modal
      id="editLibraryModal"
      ref="modal"
      title="Edit Library"      
    >    

      <b-form id="editLibraryForm" v-on:submit.prevent>
        <b-form-group id="input-group-1"
                      label="Volume:"
                      label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="library.volume">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2"
                      label="Concentration:"
                      label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="library.concentration">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3"
                      label="Template prep kit box barcode:"
                      label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="library.template_prep_kit_box_barcode">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4"
                      label="Fragment Size:"
                      label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="library.fragment_size">
          </b-form-input>
        </b-form-group>
      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="cancel()">
          Cancel
        </b-button>

        <b-button variant="success" @click="update()">
          Update Library
        </b-button>
      </template>

    </b-modal>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import ModalHelper from '@/mixins/ModalHelper'
const { mapActions } = createNamespacedHelpers('traction/pacbio/libraries')

export default {
  name: 'PacbioLibraryEditModal',
  mixins: [ModalHelper],
  data() {
    return {
      library: {
        fragment_size: "",
        template_prep_kit_box_barcode: "",
        concentration: "",
        volume: ""
      }
    }
  },
  props: {
    lib: {
      type: [Object]
    }
  },
  methods: {
    async update() {
      try {
        await this.updateLibrary(this.library)
        this.alert('Library updated', 'success')
      } catch (err) {
        this.alert('Failed to update library. ' + err, 'danger')
      }
      this.hide()
    },
    show() {
      this.$refs['modal'].show()
      this.library = this.lib
    },
    alert (message, type) {
      this.$emit('alert', message, type)
    },
    ...mapActions([
      'updateLibrary'
    ])
  }
}

</script>
