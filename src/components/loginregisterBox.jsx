import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLinks = styled(Typography)({
  variant: "h6",
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
});

const LoginRegisterBox = () => (
  <Box display="flex" gap={3}>
    <Link to={`/login`} style={{ textDecoration: "none" }}>
      <StyledLinks>SIGN IN</StyledLinks>
    </Link>
    <Link to={`/register`} style={{ textDecoration: "none" }}>
      <StyledLinks>SIGN UP</StyledLinks>
    </Link>
  </Box>
);

export default LoginRegisterBox;
