import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { withDatabase, withObservables } from '@nozbe/watermelondb/react';

import database, { customersCollection, factoriesCollection, productsCollection } from '../db';
import FactoryDisplay from './factoryDisplay';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Q } from '@nozbe/watermelondb';
import CustomerDisplay from './customerDisplay';
import ProductDisplay from './productDisplay';


function CreateInvoice() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [factoriesList, setFactoriesList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [factoryInfo, setFactoryInfo] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [productSelection, setProductSelection] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState('');

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDateValue(currentDate);
  };

  useEffect(() => {
    const loadData = async () => {
      const  recFactoriesData = await database.get('factories').query().fetch();
      const  recCustomersData = await database.get('customers').query().fetch();
      const  recProductsData = await database.get('products').query().fetch();

      setFactoriesList(recFactoriesData);
      setCustomersList(recCustomersData);
      setProductsList(recProductsData);
    }
    loadData();

  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const loadData = async () => {
      const recFactoriesData = await database.get('factories').query().fetch();

      setFactoriesList(recFactoriesData)
    }
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const saveFactorySelection = (id: string) => {
    setSelectedFactory(id);
    const getFactInfo = async () => {
      const factoryInfo = await database.get('factories').find(id);
      setFactoryInfo(factoryInfo);
      const newDate = new Date();
      const hrs = newDate.getHours().toString().padStart(2, "0");
      const mins = newDate.getMinutes().toString().padStart(2, "0");
      const sec = newDate.getSeconds().toString().padStart(2, "0");
      const milSec = newDate.getMilliseconds().toString().padStart(3, "0");
      const InvNo = factoryInfo.code +'-'
      +dateValue.getFullYear()+(dateValue.getMonth() + 1)+dateValue.getDate()
      +hrs+mins+sec+milSec;
      setInvoiceNo(InvNo);
    }
    getFactInfo();
  }

  const saveCustomerSelection = (id: string) => {
    setSelectedCustomer(id);
  }

  const queryCustomerRecords = (text: string) => {
    const getCustomerRec = async() => {
      const customerList = await database.get('customers').query(Q.where("name", Q.like(`%${Q.sanitizeLikeString(text)}%`)));
      setCustomersList(customerList);
    }
    getCustomerRec();
  }

  const queryProductRecords = (text: string) => {
    const getProductRec = async() => {
      const productList = await database.get('products').query(Q.where("name", Q.like(`%${Q.sanitizeLikeString(text)}%`)));
      setProductsList(productList);
    }
    getProductRec();
  }

  const saveProductSelection = (data: any) => {
    setProductSelection([...productSelection, data]);
    setAddingProduct(!addingProduct)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.headerText}>Create Invoice</Text>
          <View style={styles.dateRow}>
            <Text style={styles.label}>Date:</Text>
            <Text 
              onPress={() => setShowDatePicker(true)}
              style={styles.selectorBox}
            >
              {dateValue.getDate() +'/'+ (dateValue.getMonth() + 1) +'/'+ dateValue.getFullYear()}
            </Text>
          </View>
          <View style={styles.row}>
            <FactoryDisplay
              factoriesList={factoriesList}
              selectedFactory={selectedFactory}
              setFactoryId={(id: string) => saveFactorySelection(id)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoice}>{invoiceNo}</Text>
          </View>
          <View style={styles.row}>
            <CustomerDisplay
              customersList={customersList}
              selectedCustomer={selectedCustomer}
              setCustomerId={saveCustomerSelection}
              queryCustomerRecords={(text: string) => queryCustomerRecords(text)}
            />
          </View>
          {productSelection.length > 0 && (
            <View style={styles.row}>
              <View style={styles.productsRowHeader} key={'Header'}>
                <Text style={styles.label}>{'Index '}</Text>
                <Text style={styles.label}>{'Product  '}</Text>
                <Text style={styles.rowEnd}>{'    Qty'}</Text>
              </View>
            {productSelection.map((product, index) => (
              <View style={styles.productsRow} key={product.id}>
                <Text style={styles.label}>{index+1}</Text>
                <Text style={styles.label}>{product.name}</Text>
                <Text style={styles.rowEnd}>{product.qty.toString()}</Text>
              </View>
            ))}
            </View>
          )}
          {addingProduct && (
            <View style={styles.row}>
              <ProductDisplay
                productsList={productsList}
                saveProductSelection={saveProductSelection}
                queryProductRecords={(text: string) => queryProductRecords(text)}
              />
            </View>
          )}
          <Button icon="plus" mode="contained" onPress={() => setAddingProduct(true)}>
            Add Product
          </Button>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateValue}
              mode="date"
              onChange={onChangeDate}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const enhance = withObservables([], () => ({
  factories: factoriesCollection.query().observe(),
  customers: customersCollection.query().observe(),
  products: productsCollection.query().observe(),
}));

export default enhance(CreateInvoice);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scrollView: {
    flex: 1,
    alignItems: 'baseline',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center'
  },
  text: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  dateRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 8
  },
  productsRowHeader: {
    // justifyContent: 'space-between',
    fontWeight: 'bold',
    flexDirection: 'row',
    margin: 6
  },
  productsRow: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 6
  },
  label: {
    color: 'white',
    fontSize: 18,
    minWidth: '15%',
  },
  rowEnd: {
    alignItems: 'flex-end',
    color: 'white',
    fontSize: 18,
    minWidth: '15%',
  },
  invoice: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    minWidth: '15%',
  },
  selectorBox: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '50%',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginLeft: 5,
    marginRight: 5
  }
});
