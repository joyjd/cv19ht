import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import "./../Footer/Footer.style.scss";
import Avatar from "@material-ui/core/Avatar";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import { makeStyles } from "@material-ui/core/styles";

import author_avatar from "./../../assets/author_avatar.jpg";

export const Footer = () => {
  return (
    <BottomNavigation showLabels className='Footer'>
      <div className='cpDiv'>
        <div>&copy; Copyright 2020, COVID19HospitalTracker.</div>
        <div>All rights reserved.</div>
      </div>
      <div className='authorAvatar'></div>
    </BottomNavigation>
  );
};
