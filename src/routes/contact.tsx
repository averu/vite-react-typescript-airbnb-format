import type { FC } from 'react'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { Form, useLoaderData } from 'react-router-dom'

import Favorite from '../components/favorite'
import NameArea from '../components/nameArea'
import { getContact } from '../contacts'

import type { ProfileType } from '../types'

export const loader = async ({
  params
}: LoaderFunctionArgs): Promise<ProfileType> => {
  const contactId = params.contactId ?? ''
  return await getContact(contactId)
}

const Contact: FC = () => {
  const contact = useLoaderData() as ProfileType
  return (
    <div id="contact">
      <div>
        <img alt="" key={contact.avatar} src={contact.avatar} />
      </div>
      <div>
        <h1>
          <>
            <NameArea contact={contact} />
            <Favorite contact={contact} />
          </>
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  'Please confirm you want to delete this record.'
                )
              ) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Contact
