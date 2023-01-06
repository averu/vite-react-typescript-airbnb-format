import type { FC } from 'react'
import type { ActionFunctionArgs } from 'react-router-dom'
import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom'

import { updateContact } from '../contacts'

import type { ProfileType } from '../types'

export const action = async ({ request, params }: ActionFunctionArgs): Promise<Response> => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const contactId = params.contactId ?? ''
  await updateContact(contactId, updates)
  return redirect(`/contacts/${contactId}`)
}

const Edit: FC = () => {
  const contact = useLoaderData() as ProfileType
  const navigate = useNavigate()

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input placeholder="First" aria-label="First name" type="text" name="first" defaultValue={contact.first} />
        <input placeholder="Last" aria-label="Last name" type="text" name="last" defaultValue={contact.last} />
      </p>
      <label htmlFor="twitter">
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack" defaultValue={contact.twitter} />
      </label>
      <label htmlFor="avator">
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label htmlFor="notes">
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  )
}

export default Edit
