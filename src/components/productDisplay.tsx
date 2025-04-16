import React , {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Menu, Button, Searchbar, TextInput } from 'react-native-paper';

function ProductDisplay({ productsList, saveProductSelection, queryProductRecords }: { productsList : [], saveProductSelection: any, queryProductRecords: any}) {

  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchEnable, setIsSearchEnable] = useState(false);
  const [qty, setQty] = useState('');
  const [selectedProduct, setSelectedProduct] = useState([]);

  // useEffect(() => {
  //   factories.map(data => console.log(data))
  // }, [factories]);
  const openMenu = () => { setIsVisible(true); }
  const closeMenu = () => { setIsVisible(false); }

  const handleSelectedProduct = (product: []) => {
    setSelectedProduct(product);
    closeMenu();
  }

  const triggerSearch = () => {
    const value = isSearchEnable;
    setIsSearchEnable(!value);
    setIsVisible(value);
  }

  const customerSearch = (text: string) => {
    setSearchQuery(text)
    if(searchQuery.length > 2) {
      queryProductRecords(text);
    }
  }

  const submitSelection = () => {
    const qtyNo = Number.parseInt(qty, 10)
    const data = {
      name: selectProduct.name,
      id: selectProduct.id,
      price: selectProduct.price,
      qty: qtyNo
    }
    saveProductSelection(data);
  }
  

  // useEffect(() => {
  //   setProductData(productsList);
  // },[customersList, selectedCustomer, setCustomerId])

  const selectProduct = selectedProduct;

  return (
    <View style={styles.container}>
      <View style={styles.inContainer}>
        <Text style={styles.label}>Product:</Text>
        <View style={styles.searchOpen}>
          <Searchbar
            placeholder="Search"
            onIconPress={triggerSearch}
            onChangeText={(text: string) => customerSearch(text)}
            value={searchQuery}
          />
        </View>
      </View>
      <View style={styles.inContainer}>
        <View style={styles.menu }>
          <Menu
            visible={isVisible}
            onDismiss={closeMenu}
            anchor={
              <Button
                mode={"contained"}
                onPress={openMenu}
                buttonColor={'white'}
                textColor={'black'}
                style={styles.anchorBtnOpen}
              >
                {selectProduct ? selectProduct.name : "Select Product"}
              </Button>
            }
          >
            {productsList.length === 0 ? (
              <Menu.Item title="No Customer Available" />
            ):(
              productsList.map(product => (
                <Menu.Item
                  key={product.id}
                  title={product.name}
                  onPress={() => handleSelectedProduct(product)}
                />
              ))
            )}
          </Menu>
        </View>
        <View style={styles.inputQty}>
          <TextInput
            value={qty}
            onChangeText={setQty}
            keyboardType='number-pad'
            placeholder="Qty"
          />
        </View>
      </View>
      <View style={styles.doneButton}>
        <Button
          mode={"contained"}
          onPress={submitSelection}
          disabled={qty == '' || !selectProduct}
          buttonColor={'white'}
          textColor={'black'}
        >
          Done
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  inContainer: {
    justifyContent: 'space-between',
    height: 50,
    flexDirection: 'row',
    margin: 6
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    minWidth: '15%',
  },
  button: {
    width: 260,
    marginLeft: 6
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    height: '10%',
    flex: 1,
  },
  anchorBtnOpen: {
    width: 200,
    marginLeft: 6
  },
  anchorBtnClose: {
    width: 10,
    marginLeft: 6
  },
  searchOpen: {
    marginLeft: 6,
    width: 220
  },
  searchClose: {
    marginLeft: 6,
    width: 50,
    height: 50
  },
  menu: {
    marginLeft: 6,
    width: 120
  },
  inputQty: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '25%',
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
    marginLeft: 5,
    marginRight: 5
  },
  doneButton: {
    alignItems: 'flex-end'
  }
});



export default ProductDisplay;