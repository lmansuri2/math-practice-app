import { AsyncStorage } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { supabase } from "./supabase";
import Game from "./Game.js";

export default function Menu({ score }) {
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
    const loadBestScore = async () => {
      try {
        const savedScore = await AsyncStorage.getItem("bestScore");

        if (savedScore !== null) {
          setBestScore(parseInt(savedScore));
        }
      } catch (error) {
        console.warn("Loading score error:", error);
      }
    };
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.log("Error:", error.message);
      else setUser(data.user);
    };
    loadBestScore();
    getUser();
  }, []);

  useEffect(() => {
    if (score != undefined && score > bestScore) {
      setBestScore(score);

      const saveScore = async () => {
        try {
          await AsyncStorage.setItem("best_score", score.toString());
        } catch (error) {
          console.warn("Error saving score:", error);
        }
      };
      saveScore();
    }
  }, [score, bestScore]);

  if (isPlaying) {
    return (
      <View style={{ flex: 1 }}>
        <Game userCurrScore={bestScore} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Best score: {bestScore}</Text>
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
