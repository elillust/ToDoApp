import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight, 
  TouchableWithoutFeedback,
  Pressable,
  TextInput
} from 'react-native';
import { theme } from './color';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setTodos] = useState({});
  const travel = () => setWorking(false); 
  const work = () => setWorking(true); 
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if(text===""){
      return
    }
    const newToDos = Object.assign(
      {}, 
      toDos, 
      {[Date.now()]: {text, work:working}}
    ); 
    setTodos(newToDos); 
    setText(""); 
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work} activeOpacity={0.5}>
          <Text style={{...styles.bunText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            travel() 
            console.log(working)
          }
          }>
          <Text style={{...styles.bunText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        // keyboardType='number-pad'
        placeholder={working ? "Add a To do" : "Where do you want go?"}
        placeholderTextColor='#ddd'
        style={styles.inputs}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 100,
  },
  bunText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white", 
  },
  inputs: {
    backgroundColor: theme.grey800,
    borderRadius: 30,
    color: "black",
    paddingHorizontal: 20,
    paddingVertical:15,
    marginTop:20,
    fontSize: 18,
  }
});
