import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#8a2be2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 80, // 👈 aumenta a altura da tab bar
          paddingBottom: 20, // 👈 opcional: ajusta o ícone mais pra cima
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          height: 100, // 👈 aumenta a altura do header
        },
        headerTitle: () => (
          <Image
            source={require('../../assets/images/logo.png')} // ajuste o caminho conforme seu projeto
            style={{ 
              width: 150, 
              height: 100, 
              resizeMode: 'contain',
              marginTop: 30, 
            }}
          />
        ),
        headerTitleAlign: 'center', // opcional: centraliza a imagem
      }}
    >
      <Tabs.Screen
        name="refund"
        options={{
          title: "Cadastro de Reembolso",
          tabBarIcon: ({ color, size }) => <Ionicons name="create-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Lista de Reembolsos",
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="requests/index"
        options={{
          title: "Solicitações",
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='requests/new'
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
