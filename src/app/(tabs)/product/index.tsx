import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link, Stack, useNavigation, Href } from 'expo-router';
import ProductsList from '../../../components/productsList';

const NEW_PRODUCT = "/product/createProduct" as Href

export default function ProductsScreen() {
  // const [customers, setCustomers] = useState
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ProductsList />
      <Link href={NEW_PRODUCT} asChild>
        <Text style={styles.button}>New Product</Text>
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
    backgroundColor: 'orange',
    color: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
