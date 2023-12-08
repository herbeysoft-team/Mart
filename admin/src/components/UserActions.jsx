import { Box, CircularProgress, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
// import {
//   updateuserprofilebyadmin,
//   setSuccessUpdateUser,
// } from "../context/features/userSlice";
import toast from 'react-hot-toast'

const UsersActions = ({ params, rowId, setRowId }) => {
  const dispatch = useDispatch();
  const { successupdateuser, loadingupdateuser } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (params.id === rowId) {
      if (!loadingupdateuser) {
        setLoading(true);
        const { verified, city, id } = params.row;
        try {
        //   await dispatch(
        //     updateuserprofilebyadmin({
        //       updatedValue: {
        //         id,
        //         verified,
        //         city,
        //       }, toast
        //     })
        //   );
        //   setSuccess(true);
        } catch (error) {
          console.error("Error updating user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (rowId === params.id && success) {
      setTimeout(() => {
        setSuccess(false);
        // dispatch(setSuccessUpdateUser());
      }, 1000);
    }
  }, [rowId, success, params.id, dispatch]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success || successupdateuser ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "secondary.dark",
            "&:hover": { bgcolor: "secondary.dark" },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: "secondary",
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;
