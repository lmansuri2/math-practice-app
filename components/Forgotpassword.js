import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { supabase } from "./supabase";
import Login from "./Login";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(false);

  const resetPassForEmail = async () => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "mathapp://changePassword",
    });

    alert("May take a second to receive request in email");
  };

  function goToLogin() {
    setLogin(true);
  }

  if (login) {
    return (
      <View style={{ flex: 1 }}>
        <Login />
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={resetPassForEmail}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToLogin}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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
  horizontalRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    width: 75,
  },
  input: {
    backgroundColor: "#eeeeee",
    borderColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: "center",
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
    marginHorizontal: 2,
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
