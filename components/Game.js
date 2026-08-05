import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Menu from "./Menu";
import MenuGuest from "./MenuGuest";
import CountDown from "react-native-countdown-fixed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Login.js";
import { supabase } from "./supabase";

export default function Game({ user, userCurrScore }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [symbol, setSymbol] = useState(null);
  const [score, setScore] = useState(0);
  let i = 0;
  const [userAnswer, setUserAnswer] = useState(0);

  const [gameFinished, setGameFinished] = useState(false);

  const generateQuestions = () => {
    const op = ["+", "-", "×", "÷"];
    const randNum = Math.floor(Math.random() * 4);
    // op[randNum];
    setSymbol(op[randNum]);

    const number1 = Math.floor(Math.random() * 10) + 1;
    let number2 = 1;
    if (op[randNum] == "-") {
      number2 = Math.floor(Math.random() * number1);
    } else if (op[randNum] == "÷") {
      let factors = [];
      for (i = 0; i <= number1; i++) {
        if (number1 % i == 0) {
          factors.push(i);
        }
      }
      const randNum = Math.floor(Math.random() * (factors.length - 1));
      number2 = factors[randNum];
    } else {
      number2 = Math.floor(Math.random() * 10);
    }

    setNum1(number1);
    setNum2(number2);
  };

  const checkAnswer = () => {
    const ops = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "×": (a, b) => a * b,
      "÷": (a, b) => a / b,
    };

    const result = ops[symbol] ? ops[symbol](num1, num2) : 0;
    if (userAnswer == result) {
      generateQuestions();
      setUserAnswer(0);
      setScore((i) => i + 1);
    } else {
      alert("Not quite.. Try again!");
    }
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  if (gameFinished) {
    if (score > userCurrScore) {
      const updateBestScore = async () => {
        if (!user?.id) return; // Safely check if it exists

        await supabase
          .from("profiles")
          .update({ score: score })
          .eq("id", user.id);
      };
      updateBestScore();
      return (
        <View style={{ flex: 1 }}>
          <Menu score={score} />
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <Text style={styles.topLeft}> Score: {score}</Text>
        <CountDown
          style={styles.topCenter}
          until={30}
          onFinish={() => setGameFinished(true)}
          digitStyle={{ backgroundColor: "#eeeeee", width: 50, height: 50 }}
          digitTxtStyle={{
            color: "#FFF",
            fontSize: 40,
            fontWeight: "bold",
          }}
          timeToShow={["S"]}
          timeLabels={{ s: "" }}
        />
        <View style={styles.topRight} />
      </View>
      <View style={styles.mathContainer}>
        <View style={{ marginBottom: 100 }}>
          <Text style={styles.mathText}>
            {num1} {symbol} {num2} = ?
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userAnswer}
              onChangeText={setUserAnswer}
              keyboardType="numeric"
              placeholder="         "
            ></TextInput>
            <TouchableOpacity style={styles.button} onPress={checkAnswer}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
  },
  topCenter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  topLeft: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#FFF",
  },
  topRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mathContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mathText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000000",
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    borderColor: "#e0e0e0",
    fontSize: 42,
    height: 50, // Increased slightly to fix text clipping
    width: 120, // Replaced "auto" with a fixed width for stability
    borderRadius: 8,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  button: {
    height: 50,
    width: "auto",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
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
