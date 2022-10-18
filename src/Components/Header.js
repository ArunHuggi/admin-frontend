import React from 'react';
import Box from '@mui/material/Box';
import { Stack } from "@mui/system";
import './Header.css'

export default function Header() {
  return (
    <Box className="header">
      <Stack className="admin">Admin</Stack>
      <Stack className="ui">UI</Stack>
    </Box>
  );
}