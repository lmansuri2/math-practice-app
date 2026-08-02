import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { supabase } from "./supabase";
import Game from "./Game";

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
        <View style={styles.horizontalRow}>
          <View style={styles.buttonContainer}>
            {/* SIGN IN BUTTON */}
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            {/* SIGN UP BUTTON */}
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    width: "100%",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 50,
    width: "auto",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 30,
    backgroundColor: "#02bfe7",
  },
  buttonText: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "500",
    color: "#000000",
  },
});
