import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { getTask, saveTasks, updateTask } from "../api";

const TaskFormScreen = ({ navigation, route }) => {
  const [disabled, setDisabled] = useState(true);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveTasks(task);
      } else {
        await updateTask(route.params.id, task)
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      navigation.setOptions({ headerTitle: "Updating a Task" });
      setEditing(true);
      
      (async () => {
        const task = await getTask(route.params.id);
        setTask({ title: task.title, description: task.description });
      })();
    }
  }, []);

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder="Write a Title"
        placeholderTextColor="#576574"
        onChangeText={(text) => {
          handleChange("title", text);
          if (text.length !== 0) {
            return setDisabled(false);
          } else {
            return setDisabled(true);
          }
        }}
        value={task.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Write a Description"
        placeholderTextColor="#576574"
        onChangeText={(text) => handleChange("description", text)}
        value={task.description}
      />

      {
        !editing ? (
          <TouchableOpacity
        style={styles.buttonSave}
        disabled={disabled}
        onPress={handleSubmit}
      >
        <Text style={styles.butttonText}>Save Task</Text>
      </TouchableOpacity>
        ) : (
          <TouchableOpacity
        style={styles.buttonUpdate}
        disabled={disabled}
        onPress={handleSubmit}
      >
        <Text style={styles.butttonText}>Update Task</Text>
      </TouchableOpacity>
        )
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    textAlign: "center",
    padding: 7,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 35,
    color: "white",
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  butttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  buttonUpdate: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#e58e26",
    width: "90%"
  }
});

export default TaskFormScreen;
