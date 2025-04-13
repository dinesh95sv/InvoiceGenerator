import { useState, useEffect } from 'react';
import { Stack, router, useNavigation } from 'expo-router';
import { View, Text, StyleSheet, ToastAndroid, TextInput, Button } from 'react-native';

import database, { customersCollection } from '../../../db';

export default function CreateCustomerScreen() {
  const [ name, setName ] = useState('');
  const [ gstin, setGstin ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ address, setAddress ] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const clearAllFields = () => {
    setName('');
    setGstin('');
    setPhone('');
    setEmail('');
    setAddress('');
  }

  const saveCustomer = async () => {
    if (name != '' && gstin != '') {
      await database.write(async () => {
        await customersCollection.create((customer: { name: string; gstin: string; phone: string; email: string; address: string; }) => {
          customer.name = name;
          customer.gstin = gstin;
          customer.phone = phone;
          customer.email = email;
          customer.address = address;
        });
      });
      clearAllFields();
      router.back();
    } else {
      ToastAndroid.show(
        'Please Enter Customer Name and GST No to Save!',
        ToastAndroid.SHORT
      );
    }
    
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'New Customer' }} />

      <View style={styles.inputRow}>
        <Text style={styles.label}>Customer Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Aadhavan Super Market"
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Customer GST No</Text>
        <TextInput
          value={gstin}
          onChangeText={setGstin}
          placeholder="07ABCDE1234F2Z5"
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Customer Phone</Text>
        <TextInput
          value={phone}
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
          placeholder="1234567890"
          maxLength={10}
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Customer Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email@domain.com"
          style={styles.input}
        />
      </View>
      <View style={styles.inputRowLong}>
        <Text style={styles.label}>Customer Address</Text>
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={120}
          textAlignVertical='top'
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Customer Address"
          style={styles.input}
        />
      </View>

      <View style={styles.rightButtons}>
        <View style={styles.buttons}>
          <Button color="#959292" title="Reset" onPress={clearAllFields} />
        </View>
        <View style={styles.buttons}>
          <Button color="green" title="Save" onPress={saveCustomer} />
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