const getCollection = async (id: number): Promise<any> => {
  const response = await fetch(`http://localhost:3000/${id}/library`)
}
