import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

export default function Header({ children }) {
  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: "rgba(229,229,247, 0.4))",
    },
  }));

  const classes = useStyles();

  return <Box className={classes.header}>{children}</Box>;
}
