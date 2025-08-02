"use client";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 280,
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      padding: "4px 0",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    },
  },
};
const sortType = ["Newest", "Price: Low to High", "Price: High to Low"];

export default function MultipleSelectCheckmarks() {
  const [filterProps, setFilterProps] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterProps(typeof value === "string" ? value.split(",") : value);
    handleSortChange(value);
  };

  const handleSortChange = (value) => {
    console.log("Selected sort option:", value);

    // Example logic: call a sort function or update some state
    // sortItems(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={filterProps}
          onChange={handleChange}
          input={<OutlinedInput label="Filter" />}
          MenuProps={MenuProps}
        >
          {sortType.map((sort) => (
            <MenuItem key={sort} value={sort}>
              <Checkbox checked={filterProps.includes(sort)} />
              <ListItemText primary={sort} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
