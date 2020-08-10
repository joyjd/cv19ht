import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import "./../Header/Header.style.scss";

export const Header = () => {
  return (
    <AppBar position='static' className='Header'>
      <Container maxWidth='md'>
        <div id='back-to-top-anchor'>
          <Typography variant='h6' gutterBottom>
            <span className='logoHolderText2 '>COVID19</span>
            <span className='logoHolderText'>HospitalTracker</span>
          </Typography>
        </div>
      </Container>
    </AppBar>
  );
};
