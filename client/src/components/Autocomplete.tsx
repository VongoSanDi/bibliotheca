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
  sx: Style[]
}

const CustomAutocomplete = ({ options, label = '', sx }: CustomAutocompleteProps) => {
  return (
    <Autocomplete
      id="custom-autocomplete"
      freeSolo
      options={options}
      sx={sx}
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
