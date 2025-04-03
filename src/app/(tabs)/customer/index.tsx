import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link, Stack, Href } from 'expo-router';

const NEW_CUSTOMER = "/customer/create" as Href

export default function CustomerScreen() {
  // const [customers, setCustomers] = useState
  return (
    <View style={styles.container}>
      <Link href={NEW_CUSTOMER} asChild>
        <Text style={styles.button}>New Allocation</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
