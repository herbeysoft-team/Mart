import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useEffect, useMemo } from "react";
  import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
  import { useDispatch, useSelector } from "react-redux";
  import { getVendorDetails } from "../../context/features/vendorSlice";
 
  
  export default function VendorHeading({ navigation, user }) {
    const dispatch = useDispatch();
    const { userLocation } = useSelector(
      (state) => state.map
    );
  
    const { loadingvendor, vendordetails } = useSelector((state) => state.vendor);
  
    const vendor = {
      id: user,
      longitude: userLocation.longitude,
      latitude: userLocation.latitude,
    };
  
    useEffect(() => {
      dispatch(getVendorDetails(vendor));
    }, []);
  
    const memoizeVendorDetails = useMemo(() => vendordetails, [vendordetails]);

    return (
      <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
            {`Vendor : ${memoizeVendorDetails.vendor?.fullname || memoizeVendorDetails.vendor?.businessName}`}
      </Text>
       
    );
  }
  
  const styles = StyleSheet.create({});
  