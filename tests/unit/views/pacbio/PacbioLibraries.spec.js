import Libraries from '@/views/pacbio/PacbioLibraries'
import { mount, localVue, Vuex, Data } from '../../testHelper'
import Alert from '@/components/Alert'
import PrinterModal from '@/components/PrinterModal'
import * as consts from '@/consts/consts'
import VueRouter from 'vue-router'
import Response from '@/api/Response'

describe('Libraries.vue', () => {
  let wrapper, libraries, mockLibraries

  beforeEach(() => {
    mockLibraries =  [
      { id: 1, barcode: 'TRAC-8', material: {id: 6, type: 'libraries', state: 'pending', sample_names: 'sample_d,sample_e', volume: 1.0, concentration: 1.0, library_kit_barcode: 'LK12345', fragment_size: 100, created_at: '03/12/2019 11:49' }},
      { id: 2, barcode: 'TRAC-8', material: {id: 6, type: 'libraries', state: 'pending', sample_name: 'sample_d,sample_e', volume: 1.0, concentration: 1.0, library_kit_barcode: 'LK12345', fragment_size: 100, created_at: '03/12/2019 11:49' }}
    ]

    const router = new VueRouter({
      routes: [{
        path: '/pacbio/libraries',
        name: 'PacbioLibraries',
        component: Libraries,
        props: true
      }]
    })

    let store = new Vuex.Store({
      modules: {
        traction: {
          namespaced: true,
          modules: {
            pacbio: {
              namespaced: true,
                modules: {
                  tubes: {
                    namespaced: true,
                    state: {
                      tractionTubes: mockLibraries
                    },
                    getters: {
                      tractionTubesWithInfo: state => state.tractionTubes.map(i => Object.assign(i.material, {barcode: i.barcode}))
                    }
                  }
                }
            }
          }
        }
      }
    })

    wrapper = mount(Libraries, {
      store,
      router,
      localVue,
      stubs: {
        Alert: Alert,
        PrinterModal: true
      },
      methods: {
        provider () { return }
      }
    })
    libraries = wrapper.vm
  })

  describe('building the table', () => {
    it('contains the correct fields', () => {
      let headers = wrapper.findAll('th')
      for (let field of libraries.fields) {
        expect(headers.filter(header => header.text() === field.label)).toBeDefined()
      }
    })

    it('contains the correct data', async () => {
      let mockLibraries = new Response(Data.TractionPacbioLibraries).deserialize.libraries
      wrapper.setData({ items: mockLibraries })
      expect(wrapper.find('tbody').findAll('tr').length).toEqual(6)
    })
  })

  describe('perPage', () => {
    it('states how many rows the table should contain', () => {
      let mockLibraries = new Response(Data.TractionPacbioLibraries).deserialize.libraries
      wrapper.setData({ items: mockLibraries, perPage: 1 })
      expect(wrapper.find('tbody').findAll('tr').length).toEqual(1)
    })
  })

  describe('#handleLibraryDelete', () => {
    beforeEach(() => {
      libraries.deleteLibraries = jest.fn()
      libraries.showAlert = jest.fn()
      wrapper.setData({ selected: mockLibraries })
    })

    it('calls the correct functions', async () => {
      libraries.deleteLibraries.mockReturnValue([new Response(Data.TractionPacbioLibraries)])
      await libraries.handleLibraryDelete()

      expect(libraries.deleteLibraries).toBeCalledWith(mockLibraries.map(s => s.id))
      expect(libraries.showAlert).toBeCalledWith('Libraries 1, 2 successfully deleted', 'success')
    })

    it('calls showAlert when there is an error', async () => {
      let failedResponse = { status: 422, statusText: 'Unprocessable Entity', data: { data: { errors: { it: ['did not work'] }} } }
      libraries.deleteLibraries.mockReturnValue([new Response(failedResponse)])

      await libraries.handleLibraryDelete()

      expect(libraries.deleteLibraries).toBeCalled()

      expect(libraries.showAlert).toBeCalledWith(consts.MESSAGE_ERROR_DELETION_FAILED, 'danger')
    })

  })

  describe('#showAlert', () => {
    it('passes the message to function on emit event', () => {
      libraries.showAlert('show this message', 'danger')
      expect(wrapper.find(Alert).html()).toMatch('show this message')
    })
  })

  describe('printerModal', () => {
    beforeEach(() => {
      libraries.handlePrintLabel = jest.fn()
    })

    it('passes selected printer to function on emit event', () => {
      libraries.selected = [{id: 1}]
      let modal = wrapper.find(PrinterModal)
      modal.vm.$emit('selectPrinter', 'printer1')

      expect(libraries.handlePrintLabel).toBeCalledWith('printer1')
    })
  })

  describe('alert', () => {
    it('has a alert', () => {
      expect(wrapper.contains(Alert)).toBe(true)
    })
  })
})
