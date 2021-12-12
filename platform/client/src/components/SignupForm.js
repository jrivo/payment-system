import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState("euro");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  //   POST http://localhost:3000/user
  // Content-Type: application/json

  // {
  //   "email": "johny@test.com",
  //   "password": "test2",
  //   "firstName": "Johny",
  //   "lastName": "Donny"
  // }

  // POST http://localhost:3000/merchants/
  // Content-Type: application/json

  // {
  //   "companyName": "name of the company",
  //   "KBIS": "kbis value",
  //   "firstName": "john",
  //   "lastName": "max@test.fr",
  //   "email": "john@email.com",
  //   "address": "12 rue somewhere",
  //   "phone": "0788565289",
  //   "confirmationUrl": "confirmation url",
  //   "cancellationUrl": " cancelation url",
  //   "currency": "euro",
  //   "notificationUrl": "notification url"
  // }

  const handleSubmit = () => {
    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
    })
      .then((res) => {
        console.log("user res");
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log("user res json");
        console.log(res);
      });

    fetch("http://localhost:3000/merchants/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: companyName,
        KBIS: "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        phone: phone,
        confirmationUrl: "",
        cancellationUrl: "",
        currency: "euro",
        notificationUrl: "",
      }),
    })
      .then((res) => {
        console.log("merchant res");
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log("merchant res json");
        console.log(res);
      });
  };
  return (
    <Grid
      container
      justify="center"
      align="center"
      spacing={1}
      style={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item md={6}>
        <Card>
          <CardContent>
            <Box component="form" noValidate autoComplete="off">
              <Grid item container spacing={1} justify="center">
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="email"
                    label="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="password"
                    label="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>
                {/* add repeated password */}
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="firstName"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    label="first name"
                    name="firstName"
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="lastName"
                    value="lastName"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    label="last name"
                    name="lastName"
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="company-name"
                    label="Company name"
                    value={companyName}
                    onChange={(event) => {
                      setCompanyName(event.target.value);
                    }}
                    name="companyName"
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="company-name"
                    label="Address"
                    name="address"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="company-name"
                    label="Phone number"
                    name="phone"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Button variant="contained" onClick={handleSubmit}>
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignupForm;

// - Un nom de société
// - Un KBIS
// - Des informations de contact
// - Une URL de redirection pour confirmation
// - Une URL de redirection pour annulation
// - Une devise de reversement

// email: DataTypes.STRING,
// password: DataTypes.STRING,
// firstName: DataTypes.STRING,
// lastName: DataTypes.STRING,
