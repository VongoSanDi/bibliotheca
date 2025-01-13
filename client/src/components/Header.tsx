import { LocalLibraryRounded } from '@mui/icons-material';
import { useState } from 'react';
import { getBooks } from '../services/api/book.service';
import { AutocompleteOptions } from '../types/components/Autocomplete';
import { Volume } from '../types/components/VolumeDetails';
import CustomAutocomplete from './Autocomplete';
import VolumeDetails from './VolumeDetails';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { SerieTitleTranslation } from '../types/dtos/serie-title-translation.dto';
const Header = () => {

  const [optionsAutocomplete, setOptionsAutocomplete] = useState<AutocompleteOptions[]>([])
  const [valueRadioButton, setValueRadioButton] = useState<string>("serie")
  const [selectBook, setSelectBook] = useState<Volume | null>(null)
  const [selectSerieTitleTranslation, setSelectSerieTitleTranslation] = useState<SerieTitleTranslation | null>(null)

  const handleChangeRadioButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadioButton((event.target as HTMLInputElement).value);
  };

  const handleSearch = async (value: string) => {
    if (!value) return;

    const series = await getSeriesTitleTranslation({})

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
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueRadioButton}
                onChange={handleChangeRadioButton}
              >
                <FormControlLabel value="serie" control={<Radio />} label="Serie" />
                <FormControlLabel value="livre" control={<Radio />} label="Livre" />
              </RadioGroup>
            </FormControl>
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
