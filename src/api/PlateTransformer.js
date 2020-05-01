
const transformPlates = (plates) => {
  return plates.map(plate => {
    return {barcode: plate.labware_barcode.human_barcode, wells: transformWells(plate.wells) }
  })
}

const transformWells = (wells) => {
  return wells.map(well => {
    return {position: well.position.name, samples: transformAliquots(well.aliquots) }
  })
}

const transformAliquots = (aliquots) => {
  return aliquots.map(aliquot => {
    return {externalId: aliquot.sample.uuid, name: aliquot.sample.sanger_sample_id,
            tags: [{ oligo: aliquot.tag_oligo, index: aliquot.tag_index }]}
  })
}

export default function sequencescapeToTraction (plate) {
  return transformPlates(plate)
}