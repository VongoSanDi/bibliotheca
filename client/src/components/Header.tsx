import { LocalLibraryRounded } from '@mui/icons-material';
import CustomAutocomplete from './Autocomplete';
const Header = () => {

  const optionsAutocomplete = [
    {
      id: 1,
      label: 'One Piece Tome 1',
    },
    {
      id: 2,
      label: 'One Piece Tome 2',
    }
  ]

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
            <CustomAutocomplete options={optionsAutocomplete} label="Recherche par titre ou auteur" sx={sxAutocomplete} />
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
