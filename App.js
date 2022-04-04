import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight, 
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView
} from 'react-native';
import { theme } from './color';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = "@toDos"; 

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setTodos] = useState({});
  const travel = () => setWorking(false); 
  const work = () => setWorking(true); 
  const onChangeText = (payload) => setText(payload);
  const addToDo = async () => {
    if(text===""){
      return
    }
    // const newToDos = Object.assign(
    //   {}, 
    //   toDos, 
    //   {[Date.now()]: {text, work:working}}
    // ); 
    const newToDos = {
      ...toDos,
      [Date.now()]: {text, working}
    };
    setTodos(newToDos); 
    await saveToDos(newToDos);
    setText(""); 
  };
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setTodos(JSON.parse(s));
  };
  useEffect(() => {
    loadToDos()
  }, []);


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
      <ScrollView>
        {
        Object.keys(toDos).map((key) => (
          toDos[key].working === working ? (
          <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View> 
          ) : null 
        ))}
      </ScrollView>
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
    color: "white",
    paddingHorizontal: 20,
    paddingVertical:15,
    marginVertical:20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  }
});
