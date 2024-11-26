const getUserCollection = async (id: number): Promise<any> => {
  const response = await fetch(`http://localhost:3000/collection/user/${id}/library`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  console.log("getUserCollection", response);
  return response
}
