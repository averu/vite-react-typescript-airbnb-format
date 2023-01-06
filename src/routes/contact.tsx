import type { FC } from 'react'
import { Form, useLoaderData } from 'react-router-dom'

import Favorite from '../components/favorite'
import nameArea from '../components/nameArea'
import { getContact } from '../contacts'

import type { ProfileType } from '../types'

export const loader = async ({ params }: any): Promise<ProfileType | null> => {
  console.log(params.contactId)
  return await getContact(params.contactId)
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
            {nameArea({ first: contact.first, last: contact.last })}
            <Favorite favorite={contact.favorite} />
          </>
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`} rel="noreferrer">
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
              if (!window.confirm('Please confirm you want to delete this record.')) {
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
