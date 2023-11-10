import {
    StyleSheet,
    Text,
    View,
    Pressable,
    KeyboardAvoidingView,
    TextInput,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { FONTS, SIZES, COLORS } from "../../constant";
  import CustomButton from "../../components/auth/CustomButton";
  
  const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");

  
    const handleLogin = () => {
      navigation.navigate("Login")
      const user = {
        email: email,
      };
    };
    return (
      <SafeAreaView style={styles.container}>
        
        <KeyboardAvoidingView>
        <Text style={styles.header}>{"Forget\nPassword?"}</Text>
        <Text style={styles.subheading}>{"Enter the email address you used when you joined and we’ll send you instructions to reset your password."}</Text>
          <View style={{ marginTop: SIZES.base3 }}>
            <Text style={styles.inputheading}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                ...FONTS.body3,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                marginVertical: SIZES.thickness,
                width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
              placeholder="Enter your Email"
            />
          </View>
  
         
    
  
          <View style={{ marginTop: SIZES.base6, height:SIZES.hp(35), alignItems:"center" }}/>
          
          <CustomButton text={"Send Reset Instruction"} onPress={handleLogin} fill={true}/>
          
  
          
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default ForgetPassword;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: SIZES.base3,
      paddingHorizontal: SIZES.base3,
    },
    subheading: {
        color: COLORS.tertiary,
        ...FONTS.h4,
        marginTop: SIZES.base,
        lineHeight: SIZES.base2,
      },
    header: {
      ...FONTS.header,
      color: COLORS.secondary,
    },
    inputheading: {
      color: COLORS.tertiary,
      ...FONTS.body4,
      marginTop: SIZES.base,
      lineHeight: SIZES.base2,
    },
  });
  