import { View, Alert } from "react-native";
import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Icon, Text, TextInput } from "react-native-paper";

const Phone = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  async function getOTP() {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });
    console.log("phone data >>", data);

    if (error) Alert.alert(error.message);
    console.log(error);
  }

  async function verifyOTP() {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone: "+959769706139",
      token: otp,
      type: "sms",
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 24, flex: 1 }}>
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

        <TextInput
          style={{ marginTop: 100, backgroundColor: "#fff", fontSize: 14.5 }}
          mode="outlined"
          label="+95"
          placeholder="+95"
          left={<TextInput.Icon icon={"phone"} />}
          placeholderTextColor={"#bbb"}
          activeOutlineColor="teal"
          outlineStyle={{ borderWidth: 1.2 }}
          value={phone}
          onChangeText={(val) => setPhone(val)}
        />

        <TextInput
          style={{ marginTop: 20, backgroundColor: "#fff", fontSize: 14.5 }}
          mode="outlined"
          label="OTP"
          placeholder="***"
          placeholderTextColor={"#bbb"}
          activeOutlineColor="teal"
          outlineStyle={{ borderWidth: 1.2 }}
          value={otp}
          onChangeText={(val) => setOtp(val)}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 80,
          }}
        >
          <Button
            contentStyle={{ paddingVertical: 1.5, backgroundColor: "teal" }}
            mode="contained"
            onPress={getOTP}
          >
            Request OTP
          </Button>

          <Button
            contentStyle={{ paddingVertical: 1.5, backgroundColor: "teal" }}
            mode="contained"
            onPress={verifyOTP}
          >
            Verify OTP
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Phone;
