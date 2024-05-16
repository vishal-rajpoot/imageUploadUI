/* eslint-disable react/jsx-key */
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { filterValues } from "./utils";
import { FilterContext } from "../App";

const AllFilters = () => {
  const {filterClass, setFilterClass} = useContext(FilterContext);

  const handleChange = (e) => {
    setFilterClass(e.target.value);
  };
  return (
    <Box sx={{ maxWidth: 300}}>
      <FormControl fullWidth>
        <InputLabel> Filter</InputLabel>
        <Select
          onChange={handleChange}
          value={filterClass}
          label="Filter"
        >
        {filterValues.map(filter => <MenuItem value={filter.class} key={filter.class}>{filter.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
};

export default AllFilters;
