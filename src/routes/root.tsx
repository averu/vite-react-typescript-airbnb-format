import type { FC } from 'react'
import type { LoaderFunctionArgs } from 'react-router-dom'
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation
} from 'react-router-dom'

import NameArea from '../components/nameArea'
import { getContacts, createContact } from '../contacts'

import type { ProfileType } from '../types'

export const action = async (): Promise<Response> => {
  const contact: ProfileType = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export const loader = async ({
  request
}: LoaderFunctionArgs): Promise<ProfileType[]> => {
  const url = new URL(request.url)
  let q = url.searchParams.get('q')
  if (q == null) q = ''
  const contacts: ProfileType[] = await getContacts(q)
  return contacts
}

const Root: FC = () => {
  const contacts = useLoaderData() as ProfileType[]
  const navigation = useNavigation()
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden />
            <div className="sr-only" aria-live="polite" />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink
                  to={`contacts/${contact.id}`}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <NameArea first={contact.first} last={contact.last} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  )
}

export default Root
