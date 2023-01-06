import type { FC } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage: FC = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }
    return (
      <div id="error-page">
        <h1>Oops! {error.status}</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {error.data != null && (
          <p>
            <i>{error.data}</i>
          </p>
        )}
      </div>
    )
  }
  return null
}

export default ErrorPage
