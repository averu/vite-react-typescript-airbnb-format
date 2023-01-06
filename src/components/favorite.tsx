import type { FC } from 'react'
import type { ActionFunctionArgs } from 'react-router-dom'
import { useFetcher } from 'react-router-dom'

import { updateContact } from '../contacts'

import type { ProfileType } from '../types'

export const action = async ({
  request,
  params
}: ActionFunctionArgs): Promise<ProfileType> => {
  const formData = await request.formData()
  const contactId = params.contactId ?? ''
  return await updateContact(contactId, {
    favorite: formData.get('favorite') === 'true'
  })
}

const Favorite: FC<{ contact: ProfileType }> = ({ contact }) => {
  const fetcher = useFetcher()
  let { favorite } = contact
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true'
  }
  // console.log(favorite)
  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        name="favorite"
        value={favorite === true ? 'false' : 'true'}
        aria-label={
          favorite === true ? 'Remove from favorites' : 'Add to favorites'
        }
      >
        {favorite === true ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}

export default Favorite
