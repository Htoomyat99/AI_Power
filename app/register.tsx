import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";

import {
  appleLoginAction,
  faceBookSignInAction,
  googleSignInAction,
} from "@/utils/authFunction";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [phone, setPhone] = useState("+959769706139");
  const [loading, setLoading] = useState(false);

  const goSingIn = () => {
    router.push("/login");
  };

  const goPhone = () => {
    router.push("/phone");
  };

  const signUpWithEmailAction = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setLoading(false);
    if (error) Alert.alert(error.message);
    if (!session)
      // Alert.alert("Please check your inbox for email verification!");
      console.log(error);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, padding: 24 }}>
        {/* header */}
        <View
          style={{
            flexDirection: "column",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon size={80} source="robot" color="teal" />
          <Text
            variant="titleLarge"
            style={{ marginLeft: 10, fontWeight: "600", marginTop: 10 }}
          >
            AI POWER
          </Text>
        </View>

        {/* body */}

        <Text variant="titleMedium" style={{ marginTop: 40 }}>
          Create Account
        </Text>

        <TextInput
          style={{ marginTop: 20, backgroundColor: "#fff", fontSize: 14.5 }}
          mode="outlined"
          label="Email"
          placeholder="Enter email"
          outlineColor="gray"
          value={email}
          onChangeText={(val) => setEmail(val)}
          placeholderTextColor={"#bbb"}
          activeOutlineColor="teal"
          outlineStyle={{ borderWidth: 1.2 }}
        />

        <TextInput
          style={{ marginTop: 20, backgroundColor: "#fff", fontSize: 14.5 }}
          mode="outlined"
          label="Password"
          placeholder="Enter Password"
          secureTextEntry={secureText}
          right={
            <TextInput.Icon
              icon={secureText ? "eye-off" : "eye"}
              color={"#777"}
              onPress={() => setSecureText(!secureText)}
            />
          }
          outlineColor="gray"
          value={password}
          onChangeText={(val) => setPassword(val)}
          placeholderTextColor={"#bbb"}
          activeOutlineColor="teal"
          outlineStyle={{ borderWidth: 1.2 }}
        />

        <Text
          variant="bodySmall"
          style={{
            color: "teal",
            alignSelf: "flex-end",
            paddingHorizontal: 5,
            paddingVertical: 10,
          }}
          onPress={goSingIn}
        >
          Already have an account? Sign In
        </Text>

        <Button
          loading={loading}
          style={{ marginTop: 40 }}
          contentStyle={{ paddingVertical: 1.5, backgroundColor: "teal" }}
          mode="contained"
          onPress={signUpWithEmailAction}
        >
          Sign Up
        </Button>

        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <View
            style={{ height: 1.2, width: 145, backgroundColor: "#ddd" }}
          ></View>
          <Text variant="bodyLarge">Or</Text>
          <View
            style={{ height: 1.2, width: 145, backgroundColor: "#ddd" }}
          ></View>
        </View>

        <Button
          icon={"cellphone-text"}
          style={{ marginTop: 10 }}
          contentStyle={{ paddingVertical: 1.5 }}
          mode="outlined"
          onPress={goPhone}
          textColor="#000"
          labelStyle={{ paddingHorizontal: 30 }}
        >
          SignIn with Phone
        </Button>

        <Button
          loading={loading}
          icon={"apple"}
          style={{ marginTop: 20 }}
          contentStyle={{ paddingVertical: 1.5 }}
          mode="outlined"
          onPress={appleLoginAction}
          textColor="#000"
          labelStyle={{ paddingHorizontal: 20 }}
        >
          SignIn with Apple
        </Button>

        <Button
          loading={loading}
          icon={"google"}
          style={{ marginTop: 20 }}
          contentStyle={{ paddingVertical: 1.5 }}
          mode="outlined"
          onPress={googleSignInAction}
          textColor="#B22222"
          labelStyle={{ paddingHorizontal: 30 }}
        >
          SignIn with Google
        </Button>

        <Button
          loading={loading}
          icon={"facebook"}
          style={{ marginTop: 20 }}
          contentStyle={{ paddingVertical: 1.5 }}
          mode="outlined"
          onPress={faceBookSignInAction}
          textColor="#1877f2"
          labelStyle={{ paddingHorizontal: 20 }}
        >
          SignIn with Facebook
        </Button>
      </View>
    </ScrollView>
  );
};

export default Register;
