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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // POST http://localhost:3000/user/login
  // Content-Type: application/json

  // {
  //   "email": "johny@test.com",
  //   "password": "test2"

  // }
  const handleSubmit = async () => {
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
          {email} <br />
          {password} <br />
          <CardContent>
            <Box component="form" noValidate autoComplete="off">
              <Grid item container spacing={1} justify="center">
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="email"
                    label="email"
                    name="email"
                    variant="outlined"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    style={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="password"
                    label="password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    style={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button variant="contained" onClick={() => handleSubmit()}>
                    Login
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

export default LoginForm;

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
