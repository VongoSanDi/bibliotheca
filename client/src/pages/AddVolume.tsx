import Carousel from "../components/Carousel";
import VolumeDetails from "../components/VolumeDetails";
import { CarouselItem } from "../types/components/Carousel";
import { Volume } from "../types/components/VolumeDetails";

const items: CarouselItem[] = [
  {
    imageUrl: "/api/placeholder/800/600",
    title: "Premier slide",
    description: "Description du premier slide"
  },
  {
    imageUrl: "/api/placeholder/800/600",
    title: "Deuxième slide",
    description: "Description du deuxième slide"
  },
  {
    imageUrl: "/api/placeholder/800/600",
    title: "Troisième slide",
    description: "Description du troisième slide"
  }
];

const volumeDetails: Volume = {
  title: "title",
  release_date: new Date(),
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  serie: "serie",
  author: "author",
  edition: 'edition',
  publisher: "publisher",
  page_count: 100,
  book_number: 16,
  release_price: 10.99
}

const AddVolume = () => {
  return (
    <div className="w-full h-full relative flex px-2">
      <Carousel items={items} />
      <VolumeDetails details={volumeDetails} />
    </div>
  )
}
export default AddVolume;
