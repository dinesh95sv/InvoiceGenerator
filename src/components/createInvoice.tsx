import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, RefreshControl } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { withDatabase, withObservables } from '@nozbe/watermelondb/react';

import database, { factoriesCollection } from '../db';
import FactoryDisplay from './factoryDisplay';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function CreateInvoice() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [selectedFactory, setSelectedFactory] = useState('');
  const [factoriesList, setFactoriesList] = useState([]);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDateValue(currentDate);
  };

  useEffect(() => {
    const loadData = async () => {
      const recFactoriesData = await database.get('factories').query().fetch();

      setFactoriesList(recFactoriesData)
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
              {dateValue.getDate() +'/'+ dateValue.getMonth() +'/'+ dateValue.getFullYear()}
            </Text>
          </View>
          <View style={styles.row}>
            <FactoryDisplay
              factoriesList={factoriesList}
              selectedFactory={selectedFactory}
              setFactoryId={(id) => setSelectedFactory(id)}
            />
          </View>
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
  label: {
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
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  }
});
