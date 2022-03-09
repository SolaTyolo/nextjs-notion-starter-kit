import { ExtendedRecordMap } from 'notion-types'
import {
  parsePageId,
  getPageProperty,
  normalizeTitle,
  uuidToId,
  getBlockTitle
} from 'notion-utils'

import { inversePageUrlOverrides } from './config'

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  const override = inversePageUrlOverrides[cleanPageId]
  if (override) {
    return override
  } else {
    return getCanonicalPageIdImpl(pageId, recordMap, {
      uuid
    })
  }
}

const getCanonicalPageIdImpl = (
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean }
): string | null => {
  if (!pageId || !recordMap) return null
  const block = recordMap.block[pageId]?.value
  if (block) {
    const slug = getPageProperty('Slug', block, recordMap)
    if (slug) {
      return uuid ? `${slug}-${uuidToId(pageId)}` : slug
    }
    const title = normalizeTitle(getBlockTitle(block, recordMap))
    if (title) {
      return uuid ? `${title}-${uuidToId(pageId)}` : title
    }
  }
  return uuidToId(pageId)
}
