import { Form } from 'react-router-dom'

interface Props {
  favorite?: boolean
}

const Favorite = ({ favorite }: Props): JSX.Element => (
  // yes, this is a `let` for later
  <Form method="post">
    <button
      type="button"
      name="favorite"
      value={favorite === true ? 'false' : 'true'}
      aria-label={favorite === true ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorite === true ? '★' : '☆'}
    </button>
  </Form>
)

export default Favorite
