import {
    Box,
    Grid,
    TextField,
    Tooltip,
    Typography,
    Fab,
    Modal,
    ButtonGroup,
    Button,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import AddIcon from "@mui/icons-material/Add";
  import styled from "@emotion/styled";
  import CloseIcon from "@mui/icons-material/Close";
  import toast from "react-hot-toast";
  import { passwordChange } from "../../context/features/authSlice";
  import { getUserProfile } from "../../context/features/userSlice";
  
  const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  
  const Profile = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const { user } = useSelector((state) => ({
      ...state.auth,
    }));
    const { userProfile } = useSelector((state) => ({ ...state.user }));

    const userId = user?.others?._id;


    useEffect(() => {
      if (userId) {
        dispatch(getUserProfile(userId));
      }
    }, [userId, dispatch]);

    const onInputChange = (e) => {
      setPassword(e.target.value);
    };
    
    const onInputChangeC = (e) => {
      setCpassword(e.target.value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password && cpassword) {
        if (password !== cpassword) {
          toast.error("The password is not the same");
        } else {
          dispatch(
            passwordChange({
              formValue: {
                id: user?.others?._id,
                cpassword,
              }, toast
            })
          );
          setOpen(false);
          setPassword("")
          setCpassword("")
        }
      } else {
        toast.error("Please fill the neccessary details");
      }
    };
  
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
          Profile
        </Typography>
  
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} className="grid">
            <TextField
              margin="normal"
              fullWidth
              size="normal"
              id="fullname"
              label=""
              name="fullname"
              value={userProfile?.fullname || ""}
            />
          </Grid>
          <Grid item xs={12} md={6} className="grid">
            <TextField
              margin="normal"
              fullWidth
              size="normal"
              id="email"
              label=""
              name="email"
              value={userProfile?.email || ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} className="grid">
            <TextField
              margin="normal"
              fullWidth
              size="normal"
              id="industry"
              label=""
              name="industry"
              value={userProfile?.industry || ""}
            />
          </Grid>
          <Grid item xs={12} md={6} className="grid">
            <TextField
              margin="normal"
              fullWidth
              size="normal"
              id="userType"
              label=""
              name="userType"
              value={userProfile?.userType || ""}
            />
          </Grid>
        </Grid>
        <Tooltip
          onClick={(e) => {
            setOpen(true);
          }}
          title="Change Password"
          placement="bottom"
          sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: "calc(50% - 25px)", md: "50%" },
          }}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
        <SytledModal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={400}
            height={280}
            component="form"
            bgcolor={"background.default"}
            color={"text.primary"}
            p={3}
            noValidate
            autoComplete="off"
          >
            <Typography
              style={{ marginBottom: "20px", fontFamily: "Poppins" }}
              variant="h4"
              textAlign="left"
            >
              Change Password
            </Typography>
  
            <TextField
              sx={{ width: "100%", marginBottom: "10px" }}
              required
              type="text"
              id="password"
              name="passord"
              label="Password"
              value={password || ""}
              size="small"
              color="secondary"
              margin="dense"
              onChange={onInputChange}
            />
            <TextField
              sx={{ width: "100%", marginBottom: "10px" }}
              required
              type="text"
              id="cpassword"
              name="cpassord"
              label="Confirm Password"
              value={cpassword || ""}
              size="small"
              color="secondary"
              margin="dense"
              onChange={onInputChangeC}
            />
  
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={handleSubmit}>Change Password</Button>
              <Button
                color="secondary"
                sx={{ width: "100px" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </SytledModal>
      </Box>
    );
  };
  
  export default Profile;
  