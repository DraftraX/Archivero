import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function Username() {
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
        label="usuario"
        type="email"
        className="bg-purple-50"
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
      />
    </Box>
  );
}

export function Password() {
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
        label="contraseña"
        type="password"
        className="bg-purple-50"
      />
    </Box>
  );
}
