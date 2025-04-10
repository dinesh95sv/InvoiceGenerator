import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link, Stack, useNavigation, Href } from 'expo-router';
import FactoriesList from '../../../components/factoriesList';

const NEW_FACTORY = "/factory/createFactory" as Href

export default function FactoryScreen() {
  // const [customers, setCustomers] = useState
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <FactoriesList />
      <Link href={NEW_FACTORY} asChild>
        <Text style={styles.button}>New Factoy</Text>
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
    backgroundColor: 'pink',
    color: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
