import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { alllisting } from "../context/features/listSlice";
import URLBASE from "../constant/urlbase";
import UsersActions from "../components/UserActions";
import SkeletonGrid from "../components/SkeletonGrid";

const Listing = () => {
  const dispatch = useDispatch();
  const { alllist, loadinglist } = useSelector((state) => ({
    ...state.list,
  }));

  const memoizedListing = useMemo(() => alllist, [alllist]);

  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(alllisting());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Thumbnail",
        width: 60,
        renderCell: (params) => (
          <Avatar src={`${URLBASE.imageBaseUrl}${params.row.image[0]}`} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "type", headerName: "Type", width: 100 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "description", headerName: "Description", width: 250 },
      { field: "price", headerName: "Price", width: 100 },
      { field: "unit", headerName: "Unit", width: 100 },
      { field: "brand", headerName: "Brand", width: 100 },
      { field: "provider", headerName: "Provider", width: 100 },
      { field: "time", headerName: "Time", width: 100 },

      {
        field: "stock",
        headerName: "Qty",
        width: 50,
        renderCell: (params) => params.row.stock?.quantity,
      },

      {
        field: "location",
        headerName: "Location",
        width: 150,
        renderCell: (params) => params.row.location?.address,
      },
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
        Manage Listings
      </Typography>
      {loadinglist ? (
        <SkeletonGrid />
      ) : (
        <>
          {memoizedListing ? (
            <DataGrid
              columns={columns}
              rows={memoizedListing}
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

export default Listing;
