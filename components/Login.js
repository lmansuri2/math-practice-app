import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { supabase } from "./supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else if (data && data.session) {
      alert("Account created and logged in instantly!");
    } else {
      alert("Account created! Please try to sign in now.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mental Maths</Text>
      <View style={{ marginBottom: 24 }}>
        {/* ROW 1: USERNAME */}
        <View style={styles.horizontalRow}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Enter your email address"
            autoCapitalize="none"
          />
        </View>

        {/* ROW 2: PASSWORD */}
        <View style={styles.horizontalRow}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        {/* ROW 3: BUTTONS */}
        <Button title="Sign in" onPress={signIn} />
        <Button title="Sign up" onPress={signUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 40,
  },
  horizontalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    width: 90,
  },
  input: {
    backgroundColor: "#eeeeee",
    borderColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
});
