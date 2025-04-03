import { View, Text, StyleSheet } from 'react-native';

export default function CreateCustomerScreen() {
  return (
    <View style={styles.container}>
      <Text>New Customer Screen</Text>
    </View>
  )
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
});