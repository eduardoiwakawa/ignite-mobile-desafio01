import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskProps = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return;
    const existingTask = tasks.find((t) => t.title === newTaskTitle);
    if (existingTask) {
      Alert.alert(
        "Task já cadastrada",
        " Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((item) => [...item, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map((task) => ({ ...task }));
    const taskByid = updatedTask.find((task) => task.id === id);
    if (taskByid) {
      taskByid.done = !taskByid.done;
      setTasks(updatedTask);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
          },
        },
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
    const updatedTask = tasks.map((task) => ({ ...task }));
    const taskByid = updatedTask.find((task) => task.id === taskId);

    if (taskByid) {
      taskByid.title = taskNewTitle;
      setTasks(updatedTask);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
