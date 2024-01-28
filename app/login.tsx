import { Alert, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";

//utils
import { supabase } from "@/utils/supabase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const goRegister = () => {
    router.push("/register");
  };

  const signInWithEmailAction = async () => {
    setLoading(true);
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(session);
    router.back();
    setLoading(false);

    if (error) Alert.alert(error.message);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 24 }}>
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
          Sing In
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

        <Button
          loading={loading}
          style={{ marginTop: 50 }}
          contentStyle={{ paddingVertical: 1.5, backgroundColor: "teal" }}
          mode="contained"
          onPress={signInWithEmailAction}
        >
          Sign In
        </Button>

        <Text
          variant="bodySmall"
          style={{
            color: "teal",
            alignSelf: "flex-end",
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
          onPress={goRegister}
        >
          Don't have an account? Register
        </Text>

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
          onPress={() => console.log("Pressed")}
          textColor="#555555"
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
          onPress={() => console.log("Pressed")}
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
          onPress={() => console.log("Pressed")}
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
          onPress={() => console.log("Pressed")}
          textColor="#1877f2"
          labelStyle={{ paddingHorizontal: 20 }}
        >
          SignIn with Facebook
        </Button>
      </View>
    </ScrollView>
  );
};

export default Login;
