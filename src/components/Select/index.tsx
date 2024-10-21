import { FormControl, InputLabel, Select as BasicSelect, MenuItem, SelectChangeEvent } from "@mui/material";

type SelectProps<T extends string> = {
  value: T;
  setValue: (value: T) => void;
  items: T[];
  label: string;
}

export default function Select<T extends string>({ label, value, setValue, items } : SelectProps<T>) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as T);
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
