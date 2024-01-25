import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, Icon, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [phone, setPhone] = useState("+959769706139");

  const redirectTo = makeRedirectUri();
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    console.log("session >>>", data.session);
    return data.session;
  };
  const faceBookSignInAction = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    console.log("data >>>", data);
    console.log("error >>>", error);
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    if (res.type === "success") {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  };

  const googleSignInAction = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    console.log("data >>>", data);
    console.log("error >>>", error);
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    if (res.type === "success") {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  };

  const goSingIn = () => {
    router.push("/login");
  };

  const goPhone = () => {
    // router.push("/phone")
  };

  const signUpWithEmailAction = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
  };

  const appleLoginAction = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log("credential >>>", credential);
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });
        console.log(
          JSON.stringify({ error, user }),
          "u have to create apple developer account",
          2
        );
        if (!error) {
          //User is signed in
        }
      } else {
        throw new Error("No identity Token");
      }
    } catch (e) {
      if (e === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
        console.log(e);
      } else {
        // handle other errors
        Alert.alert("This process available in ios");
      }
    }
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
          // loading={true}
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
          // loading={true}
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
          // loading={true}
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
          // loading={true}
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
