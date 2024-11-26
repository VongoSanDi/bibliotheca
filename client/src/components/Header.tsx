import { LocalLibraryRounded } from '@mui/icons-material';
import CustomAutocomplete from './Autocomplete';
import { getBooks } from '../services/api/book';
import { useState } from 'react';
const Header = () => {

  interface Book {
    original_title: string;
  }

  const [optionsAutocomplete, setOptionsAutocomplete] = useState([])

  const handleSearch = async (value: string) => {
    console.log('handleSearch', value)
    const books = await getBooks({ title: value }) //TODO Rework ça pour envoyer le champ title ou author selon le radio button
    console.log('getBooks', books)
    const options = books.data.map((book: Book) => ({
      label: book.original_title
    }))
    setOptionsAutocomplete(options)
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
            <CustomAutocomplete options={optionsAutocomplete} label="Recherche par titre ou auteur" sx={sxAutocomplete} onSearch={handleSearch} />
          </div>
          <div className='right-4'>
            <button>
              Login
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Header;
