import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen
        name="customer"
        options={{
          title: 'Customer',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people-sharp' : 'people-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: 'Product',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'basket-sharp' : 'basket-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Create Invoice',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'pencil-sharp' : 'pencil-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="viewInvoice"
        options={{
          title: 'View Invoices',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'folder-open-sharp' : 'folder-open-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="factory"
        options={{
          title: 'Factories',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'business-sharp' : 'business-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

