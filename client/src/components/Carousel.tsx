import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, PlayArrow, Pause } from '@mui/icons-material'
import { CarouselItem } from "../types/components/Carousel"

interface CarouselProps {
  items: CarouselItem[]
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const itemsLength = items.length - 1

  useEffect(() => {
    let interval: number | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((current) => current === itemsLength ? 0 : current + 1)
      }, 5000)
    }
    return () => { if (interval) clearInterval(interval) }
  }, [isAutoPlaying, itemsLength])

  const nextSlide = () => {
    setCurrentIndex((current) => current === itemsLength ? 0 : current + 1)
  }

  const previousSlide = () => {
    setCurrentIndex((current) => current === 0 ? items.length - 1 : current - 1)
  }

  return (
    <div className="relative w-2/3 md:w-2/3 mx-auto">
      <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
        {items.map((item, index) => (
          <div key={index} className={`absolute w-full h-full transition-transform duration-1000 ease-in-out`} style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}>
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3><p className="text-sm">{item.description}</p></div>
          </div>
        ))}
        <button onClick={previousSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all" aria-label="Previous slide">
          <ChevronLeft className="w-6 h-6 text-grey-800" />
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all" aria-label="Next slide">
          <ChevronRight className="w-6 h-6 text-grey-800" />
        </button>
        <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="absolute top-2 right-2 bg-white/85 hover:bg-white p-1 rounded-full text-xs font-medium">
          {isAutoPlaying ? <Pause /> : <PlayArrow />}
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div >
  )
}

export default Carousel
