import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddModal(false);
  };

  const removeGoalHandler = goalId =>{
    setCourseGoals((currentGoals)=>{
      return currentGoals.filter((goal)=>goal.id !== goalId);
    })
  }

  const cancelGoalHandler = () =>{
    setIsAddModal(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={()=> setIsAddModal(true)}/>
      <GoalInput visible={isAddModal}  onAddGoal={addGoalHandler} onCancel={cancelGoalHandler}/>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    paddingTop: 80, 
  }
});
