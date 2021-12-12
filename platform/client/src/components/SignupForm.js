import { Card, CardContent, Grid, makeStyles, TextField } from "@mui/material";
import Box from "@mui/material/Box";

// const useStyles = makeStyles((theme) => {
//   mainContainer: {
//     width: "100%";
//   }
// });

const SignupForm = () => {
  return (
    <Grid
      container
      justify="center"
      align="center"
      spacing={1}
      style={{
        width: "100%",
        backgroundColor: "red",
        justifyContent: "center",
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
                    variant="outlined"
                    style={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="password"
                    label="password"
                    name="password"
                    variant="outlined"
                  />
                </Grid>
                {/* add repeated password */}
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="firstName"
                    label="first name"
                    name="firstName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="lastName"
                    label="last name"
                    name="lastName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="company-name"
                    label="Company name"
                    name="company-name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField id="" label="" name="" variant="outlined" />
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
