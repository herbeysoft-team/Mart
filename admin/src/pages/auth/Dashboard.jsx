import styled from "@emotion/styled";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState,useEffect, useMemo } from "react";
import CardItem from "../../components/CardItem";
import PeopleIcon from "@mui/icons-material/People";
import PagesIcon from "@mui/icons-material/Pages";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import RedoIcon from "@mui/icons-material/Redo";
// import IosShareIcon from "@mui/icons-material/IosShare";
import SkeletonDashboard from "../../components/SkeletonDashboard";
// import { allcountfordashboard } from "../context/features/userSlice";
// import { useSelector, useDispatch } from "react-redux";
// import SkeletonDashboard from "../component/SkeletonDashboard";

// import PieMemo from "../component/PieMemo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const Wrapper = styled(Box)(({ theme }) => ({
  height: "100vh",
  //padding: theme.spacing(1),
  top: 0,
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(2),
  },
}));

const Dashboard = () => {
    const [loadingadmincount, setLoadingAdminCount] = useState(false)
  //   const { allcount, loadingadmincount } = useSelector((state) => ({
  //     ...state.user,
  //   }));

  //   const memoizedCount = useMemo(() => allcount, [allcount]);

  //   const dispatch = useDispatch();
  //   //const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     dispatch(allcountfordashboard());
  //   }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyItems: "center",
      }}
    >
      <Typography
        component="h4"
        color="primary.dark"
        variant="h4"
        textAlign="center"
        sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
      >
        Dashboard
      </Typography>
      <Wrapper>
        {loadingadmincount ? (
          <SkeletonDashboard />
        ) : (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} className="grid">
                <Item>
                  <CardItem
                    name="ADMIN"
                    icon={<PeopleIcon />}
                    number={1}
                    bgavatar="#006E99"
                    numberColor="#006E99"
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={4} className="grid">
                <Item>
                  <CardItem
                    name="LISTING"
                    icon={<PagesIcon />}
                    number={12}
                    bgavatar="#006E99"
                    numberColor="#006E99"
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={4} className="grid">
                <Item>
                  <CardItem
                    name="ORDER"
                    icon={<MoveToInboxIcon />}
                    number={14}
                    bgavatar="#006E99"
                    numberColor="#006E99"
                  />
                </Item>
              </Grid>
            </Grid>
            <Box mt={2}></Box>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} className="grid">
                <Item>
                  <CardItem
                    name="USER"
                    icon={<PeopleIcon />}
                    number={11}
                    bgavatar="#006E99"
                    numberColor="#006E99"
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={4} className="grid">
                <Item>
                  <CardItem
                    name="LISTING"
                    icon={<PagesIcon />}
                    number={12}
                    bgavatar="#006E99"
                    numberColor="#006E99"
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={4} className="grid">
                <Item>
                  <CardItem
                    name="ORDER"
                    icon={<MoveToInboxIcon />}
                    number={14}
                    bgavatar="#006E99"
                    numberColor="#006E99"
                  />
                </Item>
              </Grid>
            </Grid>
            <Box mt={2}></Box>
            <Box
              sx={{ p: 2, gridColumn: "1/3", boxShadow: 1 }}
              className="grid"
            >
              {/* <PieMemo /> */}
            </Box>
          </>
        )}
      </Wrapper>
    </Box>
  );
};

export default Dashboard;
