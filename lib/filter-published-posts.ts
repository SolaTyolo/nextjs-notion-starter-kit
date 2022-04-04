import { ExtendedRecordMap } from 'notion-types'

export async function filterPublishedPosts(recordMap: ExtendedRecordMap) {
  if (recordMap === undefined) return
  const blockIds = Object.keys(recordMap.block)
  const collection = Object.values(recordMap.collection)[0]?.value
  if (collection === undefined) return
  const schemas = Object.keys(collection.schema)
  const publishedProperty = schemas.filter((s) => {
    const sch = collection.schema[s]
    return sch.name === 'Published' && sch.type === 'checkbox'
  })[0]
  if (publishedProperty) {
    blockIds.forEach((b) => {
      const block = recordMap.block[b]?.value
      if (!block) {
        delete recordMap.block[b]
        return
      }
      if (block.type !== 'page' || block.parent_table !== 'collection') {
        // not Blog Posts
        return
      }
      const value = block.properties[publishedProperty]
      if (value !== undefined && value[0][0] === 'Yes') {
        return
      }
      delete recordMap.block[b]
    })
  }
}
