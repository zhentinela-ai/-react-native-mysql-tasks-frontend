import { Text, FlatList } from "react-native";
import React from "react";

import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  const renderItem = ({ item }) => {
    return <TaskItem task={item} />;
  };

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderItem}
    />
  );
};

export default TaskList;
