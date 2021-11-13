import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "../src/Link";

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          NFText page
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go back
        </Button>
      </Box>
    </Container>
  );
}
