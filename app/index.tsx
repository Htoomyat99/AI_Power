import { StyleSheet, Text, View } from "react-native";
import Register from "./register";
import Login from "./login";
import Phone from "./phone";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? (
        <Dashboard key={session.user.id} session={session} />
      ) : (
        // <Phone />
        <Register />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
