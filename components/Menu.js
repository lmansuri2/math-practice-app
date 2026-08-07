import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { supabase } from "./supabase";
import Game from "./Game.js";
import Settings from "./Settings.js";
import Login from "./Login.js";

export default function Menu() {
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [settingState, setSettingState] = useState(false);

  function settingStateTrue() {
    setSettingState(true);
  }

  function startGame() {
    setIsPlaying(true);
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.log("Error:", error.message);
      else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBestScore = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("score")
        .eq("id", user.id)
        .single();
      setBestScore(data.score);
    };
    fetchBestScore();
  }, [user]);

  if (settingState) {
    return (
      <View style={{ flex: 1 }}>
        <Settings />
      </View>
    );
  }

  if (isPlaying) {
    if (!user) {
      alert("user data is null");
    }
    return (
      <View style={{ flex: 1 }}>
        <Game user={user} userCurrScore={bestScore} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.menuContainer}>
        <Text style={styles.scoreContainer}> Best score: {bestScore}</Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={settingStateTrue}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreContainer: {
    alignSelf: "center",
    fontSize: 25,
    marginBottom: 150,
  },
  buttonContainer: {
    flex: 1,
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
