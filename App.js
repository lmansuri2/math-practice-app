import React from "react";
import Redirect from "./components/Redirect";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Redirect />
    </SafeAreaView>
  );
}
