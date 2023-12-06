import React from "react";
import { Typography, Card, Avatar } from "@mui/material";
import { Stack } from "@mui/system";

function CardItem({ name, icon, number, bgavatar, numberColor }) {
  return (
    <Card sx={{ boxShadow:0 }}>
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ color: "gray", fontFamily:"Poppins" }}
        >
          {name}
        </Typography>
        <Avatar sx={{ bgcolor: bgavatar }} variant="circle">
          {icon}
        </Avatar>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "colomn" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent={{ xs: "start", sm: "space-between" }}
        alignItems={{ xs: "flex-start", sm: "flex-start" }}
      >
        <Typography variant="h3" sx={{ color: numberColor, fontFamily:"Poppins" }} fontWeight="bold">
          {number}
        </Typography>
        <Typography variant="subtitle1" color="gray" sx={{fontFamily:"Poppins"}}>
          Number of {name}
        </Typography>
      </Stack>
    </Card>
  );
}

export default CardItem;
