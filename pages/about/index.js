import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../../src/Link";
import CubeScene from "../../src/3D/cube";
import NftLoad from "/src/components/nftLoad";
import Wallet from "/src/components/wallet/main";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Wallet />
      <NftLoad />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Collaborative NFT on Cosmos Archway!
        </Typography>
        <Container sx={{ height: 500 }}>
          <CubeScene />
        </Container>
        <Link href="/" color="secondary">
          Go to the main Minting page
        </Link>
      </Box>
    </Container>
  );
}