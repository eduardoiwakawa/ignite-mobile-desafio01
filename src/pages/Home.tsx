import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks((item) => [...item, newTask]);
    } else {
      return;
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map((task) => ({ ...task }));
    const taskByid = updatedTask.find((task) => task.id === id);
    console.log("antes", taskByid);
    if (taskByid) {
      taskByid.done = !taskByid.done;
      setTasks(updatedTask);
    }
    console.log("depois", taskByid);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
