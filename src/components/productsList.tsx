import { FlatList, StyleSheet, View } from 'react-native';
import ProductListItem from './productListItem';
import { products } from '../db';
import Products from '../model/Products';

import { withObservables } from '@nozbe/watermelondb/react';

function ProductsList({ products }: { products: Products[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <ProductListItem product={item} />}
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
  products: products.query(),
}));

export default enhance(ProductsList);