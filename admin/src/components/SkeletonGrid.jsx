import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonGrid = () => {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="50px"
        sx={{mb:1, p:1, mt:5}}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="50px"
        sx={{mb:1, p:1}}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="50px"
        sx={{mb:1, p:1}}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="50px"
        sx={{mb:1, p:1}}
      /><Skeleton
      variant="rectangular"
      animation="wave"
      width="100%"
      height="50px"
      sx={{mb:1, p:1}}
    />
    <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="50px"
        sx={{mb:1, p:1}}
      /><Skeleton
      variant="rectangular"
      animation="wave"
      width="100%"
      height="50px"
      sx={{mb:1, p:1}}
    />
    <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="50px"
        sx={{mb:1, p:1}}
      /><Skeleton
      variant="rectangular"
      animation="wave"
      width="100%"
      height="50px"
      sx={{mb:1, p:1}}
    />
    </Box>
  );
};

export default SkeletonGrid;
