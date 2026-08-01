import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { supabase } from "./supabase";
import Game from "./Game.js";

export default function Menu() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  function startGame() {
    setIsPlaying(true);
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.log("Error:", error.message);
      else setUser(data.user);
    };
    getUser();
  }, []);

  if (isPlaying) {
    return (
      <View style={{ flex: 1 }}>
        <Game />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* {user ? <Text>Welcome {user.email}</Text> : <Text>Loading user...</Text>} */}
      <Button title="Start" onPress={startGame} />
      <Button title="Settings" />
      <Button title="Log out" onPress={signOut} />
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
});
