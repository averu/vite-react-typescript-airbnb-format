import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import { sortBy } from 'sort-by-typescript'

import type { ProfileType } from './types'

export const getContacts = async (query?: string): Promise<ProfileType[]> => {
  if (query != null) await fakeNetwork(`getContacts:${query}`)
  let contacts: ProfileType[] | null = await localforage.getItem('contacts')
  if (contacts == null) contacts = []
  if (query != null) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  return contacts.sort(sortBy('last', 'createdAt'))
}

export const createContact = async (): Promise<ProfileType> => {
  await fakeNetwork()
  const id = Math.random().toString(36).substring(2, 9)
  const contact: ProfileType = {
    id,
    createdAt: Date.now()
  }
  const contacts: ProfileType[] = await getContacts()
  contacts.unshift(contact)
  await set(contacts)
  return contact
}

export const getContact = async (id: string): Promise<ProfileType> => {
  await fakeNetwork(`contact:${id}`)
  let contacts: ProfileType[] | null = await localforage.getItem('contacts')
  if (contacts == null) contacts = []
  const contact = contacts.find((x) => x.id === id)
  if (contact == null) throw new Error(`No contact found for ${id}`)
  return contact
}

// eslint-disable-next-line max-len
export const updateContact = async (
  id: string,
  updates: Record<string, FormDataEntryValue>
): Promise<ProfileType> => {
  await fakeNetwork()
  let contacts: ProfileType[] | null = await localforage.getItem('contacts')
  if (contacts == null) contacts = []
  const contact = contacts.find((x) => x.id === id)
  if (contact == null) throw new Error(`No contact found for ${id}`)
  Object.assign(contact, updates)
  await set(contacts)
  return contact
}

export const deleteContact = async (id: string): Promise<boolean> => {
  let contacts: ProfileType[] | null = await localforage.getItem('contacts')
  if (contacts == null) contacts = []
  const index = contacts.findIndex((x) => x.id === id)
  if (index > -1) {
    contacts.splice(index, 1)
    await set(contacts)
    return true
  }
  return false
}

export const set = async (contacts: ProfileType[]): Promise<void> => {
  await localforage.setItem('contacts', contacts)
}

// fake a cache so we don't slow down stuff we've already seen
type fakeCacheType = Record<string, boolean>
let fakeCache: fakeCacheType = {}

const fakeNetwork = async (key?: string): Promise<void> => {
  if (key == null) {
    fakeCache = {}
  } else if (fakeCache[key] == null) {
    return
  } else {
    fakeCache[key] = true
  }

  // eslint-disable-next-line consistent-return
  return await new Promise((resolve) => {
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(resolve, Math.random() * 800)
  })
}
