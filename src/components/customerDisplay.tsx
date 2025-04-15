import React , {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import { Menu, Button, Searchbar } from 'react-native-paper';

function CustomerDisplay({ customersList, selectedCustomer, setCustomerId, queryCustomerRecords }: { customersList : [], selectedCustomer : string, setCustomerId: any, queryCustomerRecords: any}) {

  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchEnable, setIsSearchEnable] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  // useEffect(() => {
  //   factories.map(data => console.log(data))
  // }, [factories]);
  const openMenu = () => { setIsVisible(true); }
  const closeMenu = () => { setIsVisible(false); }
  const handleSelectedCustomer = (id: string) => {
    setCustomerId(id);
    closeMenu();
  }

  const customerSearch = (text: string) => {
    setSearchQuery(text)
    if(searchQuery.length > 2) {
      queryCustomerRecords(text);
    }
  }

  const triggerSearch = () => {
    const value = isSearchEnable;
    setIsSearchEnable(!value);
    setIsVisible(value);
  }
  

  useEffect(() => {
    setCustomerData(customersList);
  },[customersList, selectedCustomer, setCustomerId])

  const selectCustomer = customersList.find(f => f.id === selectedCustomer);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer:</Text>
      <View style={isSearchEnable ? styles.searchOpen : styles.searchClose}>
        <Searchbar
          placeholder="Search"
          onIconPress={triggerSearch}
          onChangeText={(text: string) => customerSearch(text)}
          value={searchQuery}
        />
      </View>
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
              style={!isSearchEnable ? styles.anchorBtnOpen : styles.anchorBtnClose}
            >
              {selectCustomer ? selectCustomer.name : "Select Customer"}
            </Button>
          }
        >
          {customersList.length === 0 ? (
            <Menu.Item title="No Customer Available" />
          ):(
            customersList.map(customer => (
              <Menu.Item
                key={customer.id}
                title={customer.name}
                onPress={() => handleSelectedCustomer(customer.id)}
              />
            ))
          )}
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  anchorBtnOpen: {
    width: 220,
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
    width: 220
  },
});



export default CustomerDisplay;