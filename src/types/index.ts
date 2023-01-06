export interface idType {
  id: string
  createdAt: number
}

export interface NameType {
  first?: string
  last?: string
}

export interface ContactType {
  first?: string
  last?: string
  avatar?: string
  twitter?: string
  notes?: string
  favorite?: boolean
}

export interface ProfileType extends idType, ContactType {}
