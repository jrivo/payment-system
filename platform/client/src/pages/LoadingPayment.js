import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const LoadingPayment = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: "20px" }}>Processing payment ...</div>
      <CircularProgress />
    </Box>
  );
};

export default LoadingPayment;
