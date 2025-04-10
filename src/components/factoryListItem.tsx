import { View, Text, StyleSheet, Modal, Button, TextInput, ToastAndroid } from 'react-native';
import { Link } from 'expo-router';
import Factories from '../model/Factories';
import { withObservables } from '@nozbe/watermelondb/react';
import { Ionicons } from '@expo/vector-icons';
import database from '../db';
import { useState } from 'react';


type FactoryListItem = {
  factory: Factories;
};

function FactoryListItem({ factory }: FactoryListItem) {
  const [showModel, setShowModel] = useState(false);
  const [name, setName] = useState(factory.name);
  const [gstin, setGstin] = useState(factory.gstin);
  const [ phone, setPhone ] = useState(factory.phone);
  const [ email, setEmail ] = useState(factory.email);
  const [ address, setAddress ] = useState(factory.address);

  const onDelete = async () => {
    await database.write(async () => {
      await factory.markAsDeleted();
    });
  };

  const saveFactory = async () => {
    if (name != '' && gstin != '') {
      await database.write(async () => {
        await factory.update(() => {
          factory.name = name;
          factory.gstin = gstin;
          factory.phone = phone;
          factory.email = email;
          factory.address = address;
        });
      });
    } else {
      ToastAndroid.show(
        'Please Enter Customer Name and GST No to Save!',
        ToastAndroid.SHORT
      );
    }
    setShowModel(false);
  }

  const resetAllFields = () => {
    setName(factory.name);
    setGstin(factory.gstin);
    setPhone(factory.phone);
    setEmail(factory.email);
    setAddress(factory.address);
  }

  const onEdit = () => {
    setShowModel(true);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModel}
        onRequestClose={() => {
          setShowModel(!showModel);
        }}>
        <View style={styles.centredView}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Edit Factory Info</Text>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Factory Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Aadhavan Super Market"
                style={styles.input}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Factory GST No</Text>
              <TextInput
                value={gstin}
                onChangeText={setGstin}
                placeholder="07ABCDE1234F2Z5"
                style={styles.input}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Factory Phone</Text>
              <TextInput
                value={phone}
                keyboardType='number-pad'
                maxLength={10}
                onChangeText={setPhone}
                placeholder="1234567890"
                style={styles.input}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Factory Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="email@domain.com"
                style={styles.input}
              />
            </View>
            <View style={styles.inputRowLong}>
              <Text style={styles.label}>Factory Address</Text>
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
              <View style={styles.modalButtons}>
                <Button color="#959292" title="Reset" onPress={resetAllFields} />
              </View>
              <View style={styles.modalButtons}>
                <Button title="Save" onPress={saveFactory} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Text style={styles.name}>{factory.name}</Text>
        <View>
          <Text style={styles.others}>{factory.gstin}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.othersText}>Phone:</Text>
          <Text style={styles.others}>{factory.phone}</Text>
        </View>
        {factory.email &&
        <View style={styles.details}>
          <Text style={styles.othersText}>Email:</Text>
          <Text style={styles.others}>{factory.email}</Text> 
        </View>
        }
        {factory.address &&
        <View style={styles.details}>
          <Text style={styles.othersText}>Address:</Text>
          <Text style={styles.others}>{factory.address}</Text>
        </View>
        }
      </View>
      <View style={styles.buttons}>
        <View style={styles.deleteIcon}>
          <Ionicons name="trash-bin-sharp" size={18} color="red" onPress={onDelete} />
        </View>
        <View style={styles.editIcon}>
          <Ionicons name="pencil-sharp" size={18} color="pink" onPress={onEdit}/>
        </View>
      </View>
    </View>
  );
}

const enhance = withObservables(
  ['factory'],
  ({ factory }: FactoryListItem) => ({
    factory,
  })
);


export default enhance(FactoryListItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 5,
  },
  centredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    flex: 1,
  },
  others: {
    flex: 1,
    fontSize: 16,
  },
  othersText: {
    width: 70,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttons: {
    flexDirection: 'row'
  },
  deleteIcon: {
    margin: 5,
  },
  editIcon: {
    margin: 5,
    paddingLeft: 250,
  },
  text: {
    color: 'black',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginBottom: 6,
    minWidth: '98%',
    elevation: 6,
  },
  inputRow: {
    flexDirection: 'column',
    width: '100%',
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
    height: '25%',
    paddingBottom: 10
  },
  rightButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  modalButtons: {
    margin: 10
  }
});
