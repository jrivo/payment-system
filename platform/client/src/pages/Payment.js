import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import LoadingPayment from "./LoadingPayment";

const options = [
  { label: "Computer Programmer", value: "Computer_programmer" },
  { label: "Web Developer", value: "web_developer" },
  { label: "User Experience Designer", value: "user_experience_designer" },
  { label: "Systems Analyst", value: "systems_analyst" },
  { label: "Quality Assurance Tester", value: "quality_assurance_tester" },
];

const Payment = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [csv, setCsv] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (event) => {
    console.log("submit");
    console.log(id);
    const url = "http://localhost:3000/payment/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        card_number: cardNumber,
        expiration_date: expirationDate,
        csv: csv,
        redirection_id: id,
      }),
    })
      .then((res) => {
        console.log("sdsfds");
        res.json();
      })
      .catch((err) => console.log(err))
      .then((res) => {
        console.log(res);
        console.log("sent");
        setProcessing(true);
      })
      .catch((err) => console.log(err));
  };

  return processing === true ? (
    <LoadingPayment />
  ) : (
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
          <CardHeader title="Payment"></CardHeader>
          <Divider />

          <div>
            <CardContent>
              <Grid item container spacing={1} justify="center">
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label="Credit card number"
                    variant="outlined"
                    fullWidth
                    name="cardNumber"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    placeholder="1111-2222-3333-4444"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label="Name on Card "
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="John M. Doe"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Expiration date"
                    variant="outlined"
                    fullWidth
                    name="expirationDate"
                    onChange={(event) => setExpirationDate(event.target.value)}
                    value={expirationDate}
                    placeholder="10/23"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="CSV"
                    variant="outlined"
                    fullWidth
                    name="csv"
                    onChange={(event) => setCsv(event.target.value)}
                    value={csv}
                    placeholder="294"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions justify="center" style={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                Confirm Payment
              </Button>
            </CardActions>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Payment;
