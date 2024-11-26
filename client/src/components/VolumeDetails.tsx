import { Volume } from "../types/components/VolumeDetails";

interface VolumeDetailsProps {
  details: Volume
}

const VolumeDetails: React.FC<VolumeDetailsProps> = ({ details }) => {
  const currencySymbol = "$"
  return (
    <div className="w-1/3 mx-auto ml-3 text-wrap">
      <p>Titre: {details.title}</p>
      <p>Volume n°: {details.book_number}</p>
      <p>Author: {details.author}</p>
      <p>Serie: {details.serie}</p>
      <p>Release date: {details.release_date.toISOString()}</p>
      <p>Description: {details.description}</p>
      <p>Edition: {details.edition}</p>
      <p>Publisher: {details.publisher}</p>
      <p>Page count: {details.page_count}</p>
      <p>Release price: {details.release_price}{currencySymbol}</p>
    </div>
  )
}

export default VolumeDetails;
