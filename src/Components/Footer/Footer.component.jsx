import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import "./../Footer/Footer.style.scss";
import Avatar from "@material-ui/core/Avatar";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import { makeStyles } from "@material-ui/core/styles";

import author_avatar from "./../../assets/author_avatar.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <BottomNavigation showLabels className='Footer'>
      <div className='cpDiv'>
        <div>&copy; Copyright 2020, COVID19HospitalTracker.</div>
        <div>All rights reserved.</div>
      </div>
      <div className='authorAvatar'>
        <Avatar style={{ border: "3px solid #91c2ff54" }} alt='Remy Sharp' src={author_avatar} className={classes.small} />
      </div>
    </BottomNavigation>
  );
};
