import type { FC } from 'react'

import type { NameType } from '../types'

const NameArea: FC<NameType> = ({ first, last }) => {
  if (first ?? last) {
    return (
      <>
        {first} {last}
      </>
    )
  }
  return <i>No Name</i>
}

export default NameArea
