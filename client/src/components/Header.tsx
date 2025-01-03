import { LocalLibraryRounded } from '@mui/icons-material';
import CustomAutocomplete from './Autocomplete';
import { getBooks } from '../services/api/book';
import { useState } from 'react';
import { Volume } from '../types/components/VolumeDetails';
import { AutocompleteOptions } from '../types/components/Autocomplete';
import VolumeDetails from './VolumeDetails';
const Header = () => {

  const [optionsAutocomplete, setOptionsAutocomplete] = useState<AutocompleteOptions[]>([])
  const [selectBook, setSelectBook] = useState<Volume | null>(null)

  const handleSearch = async (value: string) => {
    if (!value) return;

    const books = await getBooks({ title: value }) //TODO Rework ça pour envoyer le champ title ou author selon le radio button
    const options = books.data.map((book: Volume) => ({
      id: book.id,
      label: book.original_title,
      book: book
    }))
    setOptionsAutocomplete(options)
  }

  const handleOptionSelect = (option: AutocompleteOptions | null) => {
    if (option) {
      setSelectBook(option.book)
    } else {
      setSelectBook(null)
    }
  }

  const sxAutocomplete = [
    {
      minWidth: 400
    }
  ]

  return (
    <>
      <div className='min-h-screen'>
        <aside className='fixed top-0 w-full flex flex-row py-3 justify-between'>
          <div className='flex-row flex gap-3'>
            <button>
              <LocalLibraryRounded />
              Bibliotheca
            </button>
            <button>
              Agenda
            </button>
            <button>
              Collection
            </button>
          </div>
          <div>
            <CustomAutocomplete options={optionsAutocomplete} label="Recherche par titre ou auteur" sx={sxAutocomplete} onSearch={handleSearch} onSelect={handleOptionSelect} />
          </div>
          <div className='right-4'>
            <button>
              Login
            </button>
          </div>
        </aside>
        {selectBook && (
          <div className="mt-20">
            <VolumeDetails details={selectBook} />
          </div>
        )}
      </div>
    </>
  )
}

export default Header;
