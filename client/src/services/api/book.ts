import { ApiError } from "../../common/ApiError";
import { SearchBooksParams } from "../../types/apis/book";

export const getBooks = async ({ title, author, page, limit }: SearchBooksParams = {}) => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  // TODO remove the hard written token and retrieve it from the localStorage
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjQsImlhdCI6MTczMjY2MTM4NywiZXhwIjoxNzMyNjY0OTg3fQ.J61OnWZCmdB1l1pz_7d8UvNWAwB52aprpIbfpJfz868'
  // const token = localStorage.getItem(token)

  const params = new URLSearchParams()
  if (title) params.append('title', title)
  if (author) params.append('author', author)
  if (page) params.append('page', page.toString())
  if (limit) params.append('limit', limit.toString())

  try {
    const response = await fetch(`${BASE_URL}book/search?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    if (!response.ok) {
      throw new ApiError(response.status, data.message)
    }
    return data
  } catch (e) {
    if (e instanceof ApiError) {
      throw e
    }
    throw new Error('An issue occured during the fetch of the books')
  }
}
