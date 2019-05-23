import Store from '@/store/index'
import * as Run from '@/api/Run'

describe('index', () => {

  describe('state', () => {
    it('has api state', () => {
      expect(Store.state.api).toBeDefined()
    })

    it('has a list of printers', () => {
      expect(Store.state.printers).toBeDefined()
    })

    it('has a label template id', () => {
      expect(Store.state.labelTemplateId).toBeDefined()
    })

    describe('api', () => {
      it('contains multiple resources', () => {
        expect(Store.state.api.sequencescape).toBeDefined()
        expect(Store.state.api.traction).toBeDefined()
        expect(Store.state.api.printMyBarcode).toBeDefined()
      })
    })
  })

  describe('getters', () => {
    it('api', () => {
      expect(Store.getters.api).toBeDefined()
    })

    it('printers', () => {
      expect(Store.getters.printers).toBeDefined()
    })

    it('labelTemplateId', () => {
      expect(Store.getters.labelTemplateId).toBeDefined()
    })

  })

  describe('runs', () => {

    let run

    it('has a getter', () => {
      expect(Store.getters.runs).toBeDefined()
    })

  })

})
