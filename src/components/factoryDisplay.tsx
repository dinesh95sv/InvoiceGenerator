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
      <Text style={styles.label}>Factory:</Text>
        <Menu
          visible={isVisible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode={selectFactory ? "outlined" : "contained"}
              onPress={openMenu}
              buttonColor={'white'}
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
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    height: 150,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  button: {
    width: '100%',
    marginLeft: 8
  }
});



export default FactoryDisplay;