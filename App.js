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
  const travel = () => setWorking(false); 
  const work = () => setWorking(true); 
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
      <View>
        
      </View>
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
  }
});
