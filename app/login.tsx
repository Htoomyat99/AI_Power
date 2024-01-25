import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
  return (
    <SafeAreaView>
      <Text>login</Text>
      <Link href={"/(tabs)/"} asChild>
        <Text style={{ backgroundColor: "teal", paddingVertical: 10 }}>
          button
        </Text>
      </Link>
    </SafeAreaView>
  );
};

export default login;
