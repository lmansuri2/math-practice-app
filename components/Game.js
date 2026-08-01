import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import Menu from "./Menu";
export default function Game({ user }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const [symbol, setSymbol] = useState(null);

  const generateQuestions = () => {
    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;

    setNum1(number1);
    setNum2(number2);

    const symbols = ["+", "-", "×", "÷"];
    const randNum = Math.floor(Math.random() * 4);

    setSymbol(symbols[randNum]);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  return (
    <View style={styles.mathContainer}>
      <Text style={styles.mathText}>
        {num1} {symbol} {num2} =
      </Text>
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
});
