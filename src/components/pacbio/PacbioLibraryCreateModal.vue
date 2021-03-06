<template>
  <div>
    <b-btn id="pacbioLibraryCreateModal"
           :disabled="disabled"
           v-b-modal.pacbioLibraryModal
           variant="success"
           @click="show">
      Create Library
    </b-btn>
    <b-modal id="pacbioLibraryModal"
             size="lg"
             title="Create Library"
             ref="modal"
             :static="isStatic"
             scrollable
             >
      <alert ref='alert'></alert>
      
      <b-form id="libraryCreateModal">
        <p>
          The following samples are used to create this library:
          <ul>
            <template v-for="sample in selectedSamples">
              <li :key="sample.id">{{sample.sample_name}} ({{ sample.barcode}})</li>

            </template>
          </ul>
        </p>

        <b-form-group id="tag-select-input"
                          label="Tag:"
                          label-for="tag-input">
          <b-form-select 
            id="tag-input" 
            v-model="library.tag.group_id" 
            :options="tagOptions" class="mb-3"
          />
        </b-form-group>

        <b-form-group id="input-group-1"
                      label="Volume:"
                      label-for="input-1">
          <b-form-input id="input-1"
                        v-model="library.volume"
                        type="number"
                        required
                        placeholder="1.0">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2"
                      label="Concentration:"
                      label-for="input-2">
          <b-form-input id="input-2"
                        v-model="library.concentration"
                        type="number"
                        required
                        placeholder="1.0">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2"
                      label="Template prep kit box barcode:"
                      label-for="input-3">
          <b-form-input id="input-3"
                        v-model="library.templatePrepKitBoxBarcode"
                        type="text"
                        required
                        placeholder="ABC">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2"
                      label="Fragment size"
                      label-for="input-4">
          <b-form-input id="input-4"
                        v-model="library.fragmentSize"
                        type="number"
                        required
                        placeholder="100">
          </b-form-input>
        </b-form-group>

      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="cancel()">
          Cancel
        </b-button>

        <b-button variant="success" @click="createLibrary()">
          Create
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Api from '@/mixins/Api'
import Alert from '@/components/Alert'
import Helper from '@/mixins/Helper'
import ModalHelper from '@/mixins/ModalHelper'
import * as consts from '@/consts/consts'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PacbioLibraryCreateModal',
  mixins: [Api, Helper, ModalHelper],
  data () {
    return {
      library: { tag: {}},
      tagOptions: []
    }
  },
  components: {
    Alert
  },
  props: {
    disabled: Boolean,
    isStatic: Boolean,
    selectedSamples: Array
  },
  methods: {
    async provider() {
      try {
        await this.setTags()
        this.tagOptions = this.tractionTags.map(tag => tag.group_id)
      } catch (error) {
        this.showAlert(consts.MESSAGE_ERROR_FIND_TAGS_FAILED + error.message, 'danger')
      }
    },
    ...mapActions('traction/pacbio/libraries', [
      'createLibraryInTraction',
    ]),
    ...mapActions('traction', [
      'setTags',
    ]),
    async createLibrary () {
      if (!this.library.tag.group_id){
        this.showAlert(consts.MESSAGE_ERROR_CREATE_LIBRARY_FAILED + 'Please select a tag', 'danger')
        return
      }

      this.library.samples = this.selectedSamples
      let payload = { library: this.library }
      let response = await this.createLibraryInTraction(payload)
      
      if (response.successful) {
        let barcodes = response.deserialize.libraries.map(l => l.barcode)
        this.hide()
        this.$emit('alert', 'Created library with barcode ' + barcodes[0], 'success')
      } else {
        this.showAlert(consts.MESSAGE_ERROR_CREATE_LIBRARY_FAILED + response.errors.message, 'danger')
      }
    },
    show() {
      this.library= { tag: {}};
    }
  },
  computed: {
    ...mapGetters('traction', [
      'tractionTags'
    ])
  },
  created() {
    this.provider()
  },
}
</script>
