import type { FC } from 'react'

import type { ProfileType } from '../types'

const NameArea: FC<{ contact: ProfileType }> = ({ contact }) => {
  if (contact.first ?? contact.last) {
    return (
      <>
        {contact.first} {contact.last}
      </>
    )
  }
  return <i>No Name</i>
}

export default NameArea
