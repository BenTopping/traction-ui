import ScanBarcodes from '@/views/ScanBarcodes'
import { mount, localVue } from '../testHelper'
import TubesJson from '../../data/tubes'
import Response from '@/api/Response'

describe('Scan Barcodes', () => {

  let wrapper, scan, barcodes

  beforeEach(() => {
    wrapper = mount(ScanBarcodes, { localVue } )
    scan = wrapper.vm
  })

  describe('scanning in barcodes', () => {
    it('single barcode', () => {
      barcodes = 'TRAC-1\n'
      const input = wrapper.find('textarea')
      input.setValue(barcodes)
      expect(scan.barcodes).toEqual(barcodes)
      expect(scan.queryString).toEqual('TRAC-1')
    })

    it('multiple barcodes', () => {
      barcodes = 'TRAC-1\nTRAC-2\nTRAC-3\nTRAC-4\nTRAC-5'
      const input = wrapper.find('textarea')
      input.setValue(barcodes)
      expect(scan.barcodes).toEqual(barcodes)
      expect(scan.queryString).toEqual('TRAC-1,TRAC-2,TRAC-3,TRAC-4,TRAC-5')
    })

    it('will build a request', () => {
      scan.barcodes = 'TRAC-1\nTRAC-2\nTRAC-3\nTRAC-4\nTRAC-5'
      let request = scan.tubeRequest
      expect(request.filters).toEqual({barcode: scan.queryString})
    })
  })

  it('will allow tubes to be found', async () => {
    scan.barcodes = 'TRAC-1\nTRAC-2\nTRAC-3\nTRAC-4\nTRAC-5'
    scan.tubeRequest.execute = jest.fn()
    scan.tubeRequest.execute.mockResolvedValue(TubesJson)

    let response = await scan.findTubes()
    expect(response).toEqual(new Response(TubesJson).deserialize.tubes)
  })

  it('will allow scanning in of barcodes and will return the relevant tube', () => {
    const input = wrapper.find('textarea')
    input.setValue(barcodes)
    let button = wrapper.find('#findTubes')
    button.trigger('click')
  })

})