import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const SkeletonDashboard = () => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
      </Grid>
      <Box mt={2}></Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
      </Grid>
      <Box mt={2}></Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
        <Grid item xs={12} md={4} className="grid">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="150px"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkeletonDashboard;
