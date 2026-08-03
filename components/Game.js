import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Menu from "./Menu";
import CountDown from "react-native-countdown-fixed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Game({ userCurrScore }) {
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
      alert("Correct!");
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
      return (
        <View style={{ flex: 1 }}>
          <Menu score={score} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Menu score={userCurrScore} />
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <CountDown
          until={10}
          onFinish={() => setGameFinished(true)}
          size={20}
        />
        <Text size={20}> Score: {score}</Text>
      </View>
      <View style={styles.mathContainer}>
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
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#eeeeee",
  },
  mathContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 300,
  },
  mathText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000000",
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
    height: 40,
    width: "auto",
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
