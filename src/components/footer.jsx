import { Stack, Typography, Box } from "@mui/material";
import {
  AddIcCall,
  Email,
  Facebook,
  LinkedIn,
  Place,
  X,
  YouTube,
} from "@mui/icons-material";

function Footer() {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          width="100%"
          display="flex"
          flexWrap="wrap"
          bgcolor="gray"
          pb="5vh"
          paddingInline="3vw"
        >
          <Box sx={{ color: "white", padding: 3 }} flexBasis="600px">
            <Typography variant="h5" fontWeight={700}>
              Movie App
            </Typography>
            <Typography variant="p" lineHeight={1.5}>
              Discover, explore, and dive into a world of cinematic wonders with
              our app. Surf through an extensive collection of movies, read
              insightful reviews, and find your next favorite film effortlessly.
            </Typography>
          </Box>
          <Stack
            direction="row"
            flex={1}
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            <Box p={3} color="white">
              <Typography fontSize={20} fontWeight={700}>
                Contact Us
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Place />
                <p>Kathmandu, Nepal</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <AddIcCall />
                <p>+977 01-123456</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Email />
                <p>info@movieapp.com</p>
              </div>
            </Box>
            <Box p={3} color="white">
              <Typography fontSize={20} fontWeight={700}>
                Follow Us
              </Typography>
              <p>
                Stay updated with our latest news and updates by following us on
                social media
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Facebook />
                <X />
                <YouTube />
                <LinkedIn />
              </div>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
