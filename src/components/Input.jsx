import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function Input({ value, onChange, type, label, placeholder }) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-purple-50"
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
      />
    </Box>
  );
}
