import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight, 
  TouchableWithoutFeedback,
  Pressable
} from 'react-native';
import { theme } from './color';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={styles.bunText}>Work</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback 
          onPress={() => console.log("pressed")}>
          <Text style={styles.bunText}>Travel</Text>
        </TouchableWithoutFeedback>
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
