"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [filterProp, setFilterProp] = React.useState("");

  const sortType = ["Newest", "Price: Low to High", "Price: High to High"];

  const handleChange = (event) => {
    setFilterProp(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterProp}
          label="filter"
          onChange={handleChange}
        >
          {sortType.map((sort, index) => {
            return (
              <MenuItem value={sort} key={index}>
                {sort}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
