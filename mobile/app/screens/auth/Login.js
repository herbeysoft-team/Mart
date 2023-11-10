import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import CustomButton from "../../components/auth/CustomButton";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.replace("Main")
    const user = {
      email: email,
      password: password,
    };

    // axios
    //   .post("http://localhost:8000/login", user)
    //   .then((response) => {
    //     console.log(response);
    //     const token = response.data.token;
    //     AsyncStorage.setItem("authToken", token);
    //     navigation.replace("Main");
    //   })
    //   .catch((error) => {
    //     Alert.alert("Login Error", "Invalid Email");
    //     console.log(error);
    //   });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <KeyboardAvoidingView>
        <Text style={styles.header}>{"Sign in to your\naccount"}</Text>
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
              // width: SIZES.wp(90),
              padding: SIZES.base2,
              borderRadius: SIZES.radius / 2,
            }}
            placeholder="Enter your Email"
          />
        </View>

        <View style={{ marginTop: SIZES.base }}>
          <Text style={styles.inputheading}>Password</Text>

          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{
              ...FONTS.body3,
              borderWidth: SIZES.thickness / 3,
              borderColor: COLORS.tertiary,
              color: COLORS.tertiary,
              marginVertical: SIZES.thickness,
              // width: SIZES.wp(90),
              padding: SIZES.base2,
              borderRadius: SIZES.radius / 2,
            }}
            placeholder="***********"
          />
        </View>

        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text></Text>
          <Pressable onPress={() => navigation.navigate("Forget-Password")}>
            <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
              Forgot Password ?
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            marginTop: SIZES.base6,
            height: SIZES.hp(25),
            alignItems: "center",
          }}
        />

        <CustomButton text={"Sign In"} onPress={handleLogin} fill={true} />

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text
            style={{ ...FONTS.h4, color: COLORS.accent, textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Text style={{ color: COLORS.primary }}>Sign Up</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base3,
    paddingHorizontal: SIZES.base3,
    justifyContent: "space-between",
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
