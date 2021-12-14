import React from "react";
import {
  Grid,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
  TextField,
  Box,
  Divider,
} from "@mui/material";

const options = [
  { label: "Computer Programmer", value: "Computer_programmer" },
  { label: "Web Developer", value: "web_developer" },
  { label: "User Experience Designer", value: "user_experience_designer" },
  { label: "Systems Analyst", value: "systems_analyst" },
  { label: "Quality Assurance Tester", value: "quality_assurance_tester" },
];

const Payment = () => {
  return (
    <Grid
      container
      justify="center"
      align="center"
      spacing={1}
      style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        backgroudColor: "red",
      }}
    >
      <Grid item md={6}>
        <Card style={{ justifyContent: "center", alignItems: "center" }}>
          <CardHeader title="REGISTER FORM"></CardHeader>
          <Divider />

          <form>
            <CardContent>
              <Grid item container spacing={1} justify="center">
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Name on Card"
                    variant="outlined"
                    fullWidth
                    placeholder="John M. Doe"
                    name="nameOnCard"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    placeholder="john@example.com"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    placeholder="542 W. 15th Street"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Zip"
                    variant="outlined"
                    fullWidth
                    name="zip"
                    placeholder="75000"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Credit card number "
                    variant="outlined"
                    fullWidth
                    name="address"
                    placeholder="1111-2222-3333-4444"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Zip"
                    variant="outlined"
                    fullWidth
                    name="zip"
                    placeholder="75000"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions justify="center" style={{ justifyContent: "center" }}>
              <Button variant="contained" color="primary" type="Submit">
                Confirm Payment
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Payment;
