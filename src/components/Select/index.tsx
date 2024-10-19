import { FormControl, InputLabel, Select as BasicSelect, MenuItem, SelectChangeEvent } from "@mui/material";

type SelectProps = {
  value: string;
  setValue: (value: string) => void;
  items: string[];
  label: string;
}

export default function Select({ label, value, setValue, items } : SelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <BasicSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {items.map((item) =>
            <MenuItem key={item} value={item}>{item}</MenuItem>
          )}
        </BasicSelect>
      </FormControl>
  )
}
