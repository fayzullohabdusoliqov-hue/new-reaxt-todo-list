import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-web";

export default function Todo({onLogin}) {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  async function getTodo() {
    try {
      const res = await fetch(
        "https://todo-list-fc04d-default-rtdb.firebaseio.com/todo.json"
      );

      const data = await res.json();

      const dataArray = Object.entries(data || {}).map(([key, value]) => ({
        ...value,
        firebaseKey: key,
      }));

      setTodo(dataArray);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  async function addTodo() {
    if (!inputValue.trim()) return;

    try {
      if (editIndex !== null) {
        const selectedTodo = todo[editIndex];

        await fetch(
          `https://todo-list-fc04d-default-rtdb.firebaseio.com/todo/${selectedTodo.firebaseKey}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              todo: inputValue,
            }),
          }
        );

        setEditIndex(null);
      } else {
        await fetch(
          "https://todo-list-fc04d-default-rtdb.firebaseio.com/todo.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              todo: inputValue,
            }),
          }
        );
      }

      setInputValue("");
      getTodo();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteTodo(index) {
    try {
      const selectedTodo = todo[index];

      await fetch(
        `https://todo-list-fc04d-default-rtdb.firebaseio.com/todo/${selectedTodo.firebaseKey}.json`,
        {
          method: "DELETE",
        }
      );

      getTodo();
    } catch (err) {
      console.log(err.message);
    }
  }

  function editTodo(index) {
    setInputValue(todo[index].todo);
    setEditIndex(index);
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          value={inputValue}
          placeholder="Enter todo..."
          onChangeText={(text) => setInputValue(text)}
        />

        <Button
          title={editIndex !== null ? "Save" : "Add Todo"}
          onPress={addTodo}
        />
        <Button title="login" onPress={onLogin}/>
      </View>

      <View>
        {todo.map((el, index) => (
          <View key={el.firebaseKey} style={styles.todoItem}>
            <Text>{el.todo}</Text>

            <Button
              title="Edit"
              onPress={() => editTodo(index)}
            />

            <Button
              title="Delete"
              onPress={() => deleteTodo(index)}
            />
          </View>
        ))}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  form: {
    gap: 10,
    marginBottom: 20,
  },

  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
});