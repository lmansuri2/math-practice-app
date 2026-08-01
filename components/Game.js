import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Menu from "./Menu";
export default function Game({ user }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [symbol, setSymbol] = useState(null);

  const [score, setScore] = useState(0);
  let i = 0;
  const [userAnswer, setUserAnswer] = useState(0);

  const generateQuestions = () => {
    const op = ["+", "-", "×", "÷"];
    const randNum = Math.floor(Math.random() * 4);

    setSymbol(op[randNum]);

    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;

    // if (symbol == "-") {
    //   while (number2 > number1) {
    //     number2 = Math.floor(Math.random() * 10) + 1;
    //   }
    // } else if (symbol == "÷") {
    //   while (number2 > number1 || number1 % number2 != 0) {
    //     number2 = Math.floor(Math.random() * 10) + 1;
    //   }
    // }

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

  return (
    <View style={styles.mathContainer}>
      <Text style={styles.mathText}> Score: {score}</Text>
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
  );
}

const styles = StyleSheet.create({
  mathContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mathText: {
    fontSize: 42,
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
