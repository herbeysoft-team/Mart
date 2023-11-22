import toast from "react-hot-toast";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
// import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  phone_no: "",
  password: "",
};

/**FOOTER */
function Copyright(props) {
  return (
    <Typography variant="body2" color="primary" align="center" {...props}>
      {"© "}
      TROWMART {new Date().getFullYear()}
      {"."}
      All Right Reserved
    </Typography>
  );
}

export default function Login() {
  const { loading, setLoading } = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  // const { loading, error } = useSelector((state) => ({ ...state.auth }));
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   error && toast.error(error.message);
  // }, [error]);

  /**Handle Submit Function */
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;

    if (!(email && password)) {
      toast.error("Phone no & Password Required...!");
    } else if (!email) {
      toast.error("Phone no Required...!");
    } else if (!password) {
      toast.error("Password Required...!");
    } else if (email.includes(" ")) {
      toast.error("Wrong Phone Number...!");
    } else if (password.includes(" ")) {
      toast.error("Wrong Password...!");
    } else if (password.length < 6) {
      toast.error("Password must be more than 6 charateers long");
    } else if (!emailRegex.test(email)) {
      toast.error("Phone Number must be international format +23480XXX");
    } else if (!passwordRegex.test(password)) {
      toast.error("Password must be Alphanumeric");
    } else {
      //dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <Container maxWidth="xs" component="div">
      <Box
        marginTop="5rem"
        marginBottom="1rem"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="heading"
          fontFamily="DM Sans"
          alignItems="center"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* <img src={Logo} alt="logo" /> */}
          TrowMart
        </Typography>
      </Box>
      <Box
        component={Paper}
        elevation={2}
        sx={{
          marginTop: 2,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingX: 4,
          paddingY: 5,
        }}
      >
        {loading && (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="30px" /* Adjust the height as needed */
            >
              <CircularProgress size={24} color="secondary" />
            </Box>
          </>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={onInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onInputChange}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, p: 1.5, borderRadius: 2, color: "white" }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 1 }} />
    </Container>
  );
}
