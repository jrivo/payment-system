import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Last Transaction</Title>
      <Typography component="p" variant="h4">
        $1,105.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 November, 2021
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View transactions
        </Link>
      </div>
    </React.Fragment>
  );
}
