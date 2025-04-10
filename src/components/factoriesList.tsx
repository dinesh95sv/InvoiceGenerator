import { FlatList, StyleSheet, View } from 'react-native';
import FactoryListItem from './factoryListItem';
import { factories } from '../db';
import Factories from '../model/Factories';

import { withObservables } from '@nozbe/watermelondb/react';

function FactoriesList({ factories }: { factories: Factories[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={factories}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <FactoryListItem factory={item} />}
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
  factories: factories.query(),
}));

export default enhance(FactoriesList);