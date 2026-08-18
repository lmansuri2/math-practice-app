import { AsyncStorage } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Game from "./Game.js";
import Login from "./Login.js";

export default function MenuGuest({ score }) {
  const [login, setLogin] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    loadBestScore();
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

  function startGame() {
    setIsPlaying(true);
  }
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

  if (isPlaying) {
    return (
      <View style={{ flex: 1 }}>
        <Game user="guest" userCurrScore={bestScore} />
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
          <TouchableOpacity style={styles.button} onPress={goToLogin}>
            <Text style={styles.buttonText}>Login</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 55,
    width: "auto",
    paddingHorizontal: 30,
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
