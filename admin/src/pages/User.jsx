import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid} from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { allusersforadmin } from "../context/features/userSlice";
import URLBASE from "../constant/urlbase";
import moment from "moment";
import UsersActions from "../components/UserActions";
import SkeletonGrid from "../components/SkeletonGrid";

const User = () => {
  const dispatch = useDispatch();
  const { allusers, loadingalluser } = useSelector((state) => ({
    ...state.user,
  }));
  console.log(allusers)
  const memoizedUsers = useMemo(() => allusers, [allusers]);

  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(allusersforadmin());
  }, [dispatch]);

  const columns= useMemo(
    () => [
      {
        field: "profilePic",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => (
          <Avatar src={`${URLBASE.imageBaseUrl}${params.row.profile}`} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "userType", headerName: "UserType", width: 150 },
      { field: "fullname", headerName: "Name", width: 150 },
      { field: "email", headerName: "Username", width: 150 },
      { field: "phoneNumber", headerName: "Phone No.", width: 120 },
      {
        field: "verifiedEmail",
        headerName: "VE",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "profileCompleted",
        headerName: "PC",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "verifiedAccount",
        headerName: "PC",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Date Joined",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },

      { field: "address", headerName: "Location", width: 150, editable: true },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );
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
        Manage Users
      </Typography>
      {loadingalluser ? <SkeletonGrid/> : (
        <>
          {memoizedUsers ? (
            <DataGrid
              columns={columns}
              rows={memoizedUsers}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[10, 20, 30]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5,
              })}
              sx={{
                [`& .${gridClasses.row}`]: {
                  bgcolor: "white",
                },
                marginTop: 5,
              }}
              onCellEditCommit={(params) => setRowId(params._id)}
              onCellClick={(params) => setRowId(params._id)}
            />
          ) : null}
        </>
      )}
    </Box>
  );
};

export default User;
