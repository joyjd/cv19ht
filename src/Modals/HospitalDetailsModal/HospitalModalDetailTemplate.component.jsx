import React from "react";
import "./../HospitalDetailsModal/HospitalModalDetailTemplate.style.scss";
import GoogleMaps from "./../../Components/Common/MapsDisplay/google-maps.component";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import BusinessIcon from "@material-ui/icons/Business";
import AirlineSeatIndividualSuiteIcon from "@material-ui/icons/AirlineSeatIndividualSuite";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import LanguageIcon from "@material-ui/icons/Language";
import StarIcon from "@material-ui/icons/Star";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Paper from "@material-ui/core/Paper";
import HotelIcon from "@material-ui/icons/Hotel";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CommuteIcon from "@material-ui/icons/Commute";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import GmapIframe from "./RoadDirectionHospital/gmapIframe.component";

const useStyles = makeStyles((theme) => ({
  smallGreen: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: "#fff",
    backgroundColor: green[500],
  },
}));
export const HospitalModalDetailTemplate = (props) => {
  const classes = useStyles();

  return (
    <div>
      {props.data != undefined ? (
        <div className='ribbon'>
          <span>
            <StarIcon fontSize='small' />
            {props.data.rating}
          </span>
        </div>
      ) : null}
      <Paper elevation={3}>
        <div className='hosp_detailContainer'>
          <div className='covidInfoBody'>
            <div>
              <Avatar variant='rounded' className={classes.smallGreen}>
                <HotelIcon fontSize='small' />
              </Avatar>
            </div>
            <div className='displayData displayFlex'>
              <Typography>
                <span className='covidNumberLabel'>{props.c_bed}</span>
              </Typography>

              <Typography color='textSecondary'> vacant COVID-19 beds *</Typography>
            </div>
          </div>
          <Typography component='div' className='m_t_-5'>
            <Box fontStyle='italic' m={1}>
              <div className='disclaimerCovid'>*data displayed as per WB Government</div>
            </Box>
          </Typography>
          <div className='hospInfoBody'>
            {props.data != undefined ? (
              <div className='displayFlex '>
                <div>
                  <BusinessIcon fontSize='small' />
                </div>
                <div className='displayData'>{props.data.formatted_address}</div>
              </div>
            ) : null}

            {props.data != undefined ? (
              <div className='displayFlex '>
                <div>
                  <PhoneInTalkIcon fontSize='small' />
                </div>
                <div className='displayData'>
                  <a href='tel:{props.data.formatted_phone_number}'>{props.data.formatted_phone_number} </a> / <a href='tel:{props.data.international_phone_number}'> {props.data.international_phone_number}</a>
                </div>
              </div>
            ) : null}
            {props.data != undefined ? (
              <div className='displayFlex '>
                <div>
                  <LanguageIcon fontSize='small' />
                </div>
                <div className='displayData'>{props.data.website ? <a href='{props.data.website}'>{props.data.website} </a> : "Not Known"}</div>
              </div>
            ) : null}
            {props.data != undefined ? (
              <div className='mapcontainerHospital'>
                {/* <GoogleMaps draggable={false} currentLat={props.data.geometry.location.lat} currentLong={props.data.geometry.location.lng}></GoogleMaps> */}
                <GmapIframe hospitalCord={[props.data.geometry.location.lat, props.data.geometry.location.lng]} />
              </div>
            ) : null}
            {props.h_dist != "" ? (
              <div className='displayFlex m_tb_5'>
                <div className='displayFlex'>
                  <CommuteIcon />
                  <DirectionsWalkIcon fontSize='small' />
                </div>
                {/* <div className='displayData'>Tentatively {props.h_dist} Km away from you</div> */}
                <div className='displayData'>Tentative road-map shown, does not display present traffic conditions</div>
              </div>
            ) : null}
          </div>
        </div>
      </Paper>
      <div className='dividerCont'>
        <Divider />
      </div>
      {props.data != undefined && props.data.reviews != undefined ? (
        <div>
          <div className='displayFlex m_tb_10'>
            <div>
              <RateReviewIcon fontSize='small' />
            </div>
            <div className='displayData fontBold'>User Reviews</div>
          </div>
          <div className='reviewContainer'>
            {props.data.reviews.map((rv, index) => (
              <Card key={index} className='m_b_6 cardReviews'>
                <CardHeader avatar={<Avatar src={rv.profile_photo_url}></Avatar>} title={rv.author_name} subheader={rv.relative_time_description} />
                <CardContent>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {rv.text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
