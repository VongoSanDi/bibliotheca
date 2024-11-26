import { Autocomplete, TextField } from "@mui/material";

type Options = {
  id: number,
  label: string
}

type Style = {
  minWidth: number;
}

interface CustomAutocompleteProps {
  options: Options[];
  label: string,
  sx: Style[],
  onSearch: (searchText: string) => void
}

const CustomAutocomplete = ({ options, label = '', sx, onSearch }: CustomAutocompleteProps) => {
  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    onSearch(value)
  }
  return (
    <Autocomplete
      id="custom-autocomplete"
      freeSolo
      options={options}
      sx={sx}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
        />
      )}
    />
  )
}

export default CustomAutocomplete;
