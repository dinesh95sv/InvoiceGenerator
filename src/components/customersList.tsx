import { FlatList, StyleSheet, View } from 'react-native';
import CustomerListItem from './customerListItem';
import { customers } from '../db';
import Customers from '../model/Customers';

import { withObservables } from '@nozbe/watermelondb/react';

function CustomersList({ customers }: { customers: Customers[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <CustomerListItem customer={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
})

const enhance = withObservables([], () => ({
  customers: customers.query(),
}));

export default enhance(CustomersList);