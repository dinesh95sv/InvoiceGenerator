import React , {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import { Menu, Button } from 'react-native-paper';

function FactoryDisplay({ factoriesList, selectedFactory, setFactoryId }: { factoriesList : [], selectedFactory : string, setFactoryId: any}) {

  const [isVisible, setIsVisible] = useState(false);
  const [factoryData, setFactoryData] = useState([]);

  // useEffect(() => {
  //   factories.map(data => console.log(data))
  // }, [factories]);
  const openMenu = () => { setIsVisible(true); }
  const closeMenu = () => { setIsVisible(false); }
  const handleSelectedFactory = (id) => {
    setFactoryId(id);
    closeMenu();
  }

  useEffect(() => {
    setFactoryData(factoriesList);
  },[factoriesList, selectedFactory, setFactoryId])

  const selectFactory = factoriesList.find(f => f.id === selectedFactory);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Factory:    </Text>
      <View style={styles.menu}>
        <Menu
          visible={isVisible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode={selectFactory ? "outlined" : "contained"}
              onPress={openMenu}
              buttonColor={'pink'}
              textColor={'black'}
              style={styles.button}
            >
              {selectFactory ? selectFactory.name : "Select Factory"}
            </Button>
          }
        >
          {factoriesList.length === 0 ? (
            <Menu.Item title="No Factory Available" />
          ): (
            factoriesList.map(factory => (
              <Menu.Item
                key={factory.id}
                title={factory.name}
                onPress={() => handleSelectedFactory(factory.id)}
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
  menu: {
    marginLeft: 6,
    width: 220
  }
});



export default FactoryDisplay;