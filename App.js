import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-web";
import { ExpoRoot } from "expo-router";
import Todo from "./Todo";
import Login from "./Authorization";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <Todo onLogin={() => setIsLoggedIn(false)}/>
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}