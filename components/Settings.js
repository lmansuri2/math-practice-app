import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { supabase } from "./supabase";
import Menu from "./Menu";

export default function Settings() {
  const deleteUser = async () => {
    await supabase.rpc("delete_user");
    supabase.auth.signOut();
    alert("Account deleted successfully");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#CF6969" }]}
        onPress={deleteUser}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#02bfe7" }]}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080",
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
  },
  buttonText: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "500",
    color: "#000000",
  },
});
