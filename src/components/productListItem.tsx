import { View, Text, StyleSheet, Modal, Button, TextInput, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native';
import Products from '../model/Products';
import { withObservables } from '@nozbe/watermelondb/react';
import { Ionicons } from '@expo/vector-icons';
import database from '../db';
import { useState } from 'react';

const INDIAN_RUPEE = '\u20B9'

type ProductListItem = {
  product: Products;
};

function ProductListItem({ product }: ProductListItem) {
  const [showModel, setShowModel] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString(10));
  const onDelete = async () => {
    await database.write(async () => {
      await product.markAsDeleted();
    });
  };

  const saveProduct = async () => {
    if (name != '' && price != '') {
      const cost = Number.parseInt(price, 10);
      await database.write(async () => {
        await product.update(() => {
          product.name = name;
          product.price = cost;
        });
      });
    } else {
      ToastAndroid.show(
        'Please Enter Product Name and Price to Save!',
        ToastAndroid.SHORT
      );
    }
    setShowModel(false);
  }

  const resetAllFields = () => {
    setName(product.name);
    setPrice(product.price.toString(10));
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
            <Text style={styles.label}>Edit Product Info</Text>
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
                placeholder="150"
                style={styles.input}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.rightButtons}>
              <View style={styles.modalButtons}>
                <Button color="#959292" title="Reset" onPress={resetAllFields} />
              </View>
              <View style={styles.modalButtons}>
                <Button title="Save" onPress={saveProduct} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <View>
          <Text style={styles.others}>{'Price: '}{INDIAN_RUPEE}{product.price}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <View style={styles.deleteIcon}>
          <Ionicons name="trash-bin-sharp" size={18} color="red" onPress={onDelete} />
        </View>
        <View style={styles.editIcon}>
          <Ionicons name="pencil-sharp" size={18} color="orange" onPress={onEdit}/>
        </View>
      </View>
    </View>
  );
}

const enhance = withObservables(
  ['product'],
  ({ product }: ProductListItem) => ({
    product,
  })
);

export default enhance(ProductListItem);

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
  rightButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  modalButtons: {
    margin: 10
  }
});
