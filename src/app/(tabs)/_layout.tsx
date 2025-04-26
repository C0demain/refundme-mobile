import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#8a2be2',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
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
              marginTop: 10, 
            }}
          />
        ),
        headerTitleAlign: 'center', // opcional: centraliza a imagem
      }}
    >
      <Tabs.Screen
        name="refund/[request_id]"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Lista de Reembolsos",
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
          href: null
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
      <Tabs.Screen
        name='requests/[request_id]/index'
        options={{
          href: null
        }}
        />

      <Tabs.Screen
        name='requests/[request_id]/edit'
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name='projects/[project_id]/index'
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name='projects/new'
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name='requests/[request_id]/delete'
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name='projects/index'
        options={{
          title: "Projetos",
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
    </GestureHandlerRootView>
  );
}
