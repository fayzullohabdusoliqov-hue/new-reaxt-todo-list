import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function Login({onLogin}){
    const [loginOrRegistor, setLoginOrRegistor] = useState(true)
    const [emailInputValue, setEmailInputValue] = useState("")
    const [passwordInputValue, setPasswordInputValue] = useState("")
    const [nameInputValue, setNameInputValue] = useState("")
    const [lastNameInputValue, setLastNameInputValue] = useState("")
    const [loginLoading, setLoginLoading] = useState("Login")
    const [registorLoading, setRegistorLoading] = useState("Registor")

    async function addUser(){
       if(emailInputValue !== "" && passwordInputValue !== ""){
        if(loginOrRegistor){
           loginFunction()
        }else{
           registorFunction()
        }
       }else{
        alert("Change your email and password")
       }
    }
    async function loginFunction(){
        try{
            setLoginLoading("loading...")
            const res = await fetch("https://auth-mqug.onrender.com/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailInputValue,
                    password: passwordInputValue
                })
            })
            const data = await res.json()
            onLogin()
        }catch(err){
            console.log(err.message)
        }finally{
            setloginLoading("Login")
        }
    }
    async function registorFunction(){
        try{
            setRegistorLoading("loading...")
            const res = await fetch("https://auth-mqug.onrender.com/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: nameInputValue,
                    lastName: lastNameInputValue,
                    email: emailInputValue,
                    password: passwordInputValue
                })
            })
            const data = await res.json()
            onLogin()
        }catch(err){
            console.log(err.message)
        }finally{
            setRegistorLoading("Registor")
        }
    }
    return(
        <View style={styles.container}>
           {
            loginOrRegistor ? 
              (<><TextInput
    placeholder="Change email..."
    onChangeText={setEmailInputValue}
    style={styles.input}
  />

  <TextInput
    placeholder="Change password..."
    secureTextEntry
    onChangeText={setPasswordInputValue}
    style={styles.input}
  />

  <Button title={loginLoading} onPress={addUser} />
  <small onClick={() => setLoginOrRegistor(false)}>registorga o'tish</small>
  </>) : 
  (<><TextInput
    placeholder="Change email..."
    onChangeText={setEmailInputValue}
    style={styles.input}
  />

  <TextInput
    placeholder="Change password..."
    secureTextEntry
    onChangeText={setPasswordInputValue}
    style={styles.input}
  />
  <TextInput
    placeholder="Change name..."
    onChangeText={setNameInputValue}
    style={styles.input}
  />

  <TextInput
    placeholder="Change last name..."
    secureTextEntry
    onChangeText={setLastNameInputValue}
    style={styles.input}
  />

  <Button title={registorLoading} onPress={addUser} />
  <small onClick={() => setLoginOrRegistor(true)}>loginga o'tish</small>
  </>)
           }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
}); 