import { useState, useEffect } from 'react';
import { Stack, router, useNavigation } from 'expo-router';
import { View, Text, StyleSheet, ToastAndroid, TextInput, Button } from 'react-native';

import database, { products } from '../../../db';

export default function CreateProductScreen() {
  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const clearAllFields = () => {
    setName('');
    setPrice('');
  }

  const saveProduct = async () => {
    if (name != '' && price != '') {
      const cost = Number.parseInt(price);
      await database.write(async () => {
        await products.create((product: { name: string; price: number; }) => {
          product.name = name;
          product.price = cost;
        });
      });
      clearAllFields();
      router.back();
    } else {
      ToastAndroid.show(
        'Please Enter Product Name and Price to Save!',
        ToastAndroid.SHORT
      );
    }
    
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'New Product' }} />

      <View style={styles.inputRow}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="White Chalk Box small"
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Product Cost</Text>
        <TextInput
          value={price}
          onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ''))}
          placeholder={'150'}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.rightButtons}>
        <View style={styles.buttons}>
          <Button color="#959292" title="Reset" onPress={clearAllFields} />
        </View>
        <View style={styles.buttons}>
          <Button color="orange" title="Save" onPress={saveProduct} />
        </View>
      </View>
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
  label: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    marginBottom: 6,
    minWidth: '92%',
  },
  inputRow: {
    flexDirection: 'column',
    width: '92%',
    height: '10%'
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    height: '10%',
    flex: 1,
  },
  inputRowLong: {
    flexDirection: 'column',
    width: 'auto',
    height: '15%',
    paddingBottom: 10
  },
  buttons: {
    margin: 10,
  },
  rightButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 10
  }
});