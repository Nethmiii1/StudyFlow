import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SubjectDetailsScreen from './screens/SubjectDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    light: {
      background: '#F2F8FF',
      card: '#FFFFFF',
      primary: '#5B9BD5',
      secondary: '#DCEEFF',
      text: '#17324D',
      secondaryText: '#5F7182',
      border: '#C9E2F7',
      input: '#FFFFFF',
    },

    dark: {
      background: '#101A2B',
      card: '#18263A',
      primary: '#78BDF2',
      secondary: '#243B55',
      text: '#F2F7FC',
      secondaryText: '#B8C7D9',
      border: '#314963',
      input: '#18263A',
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: currentTheme.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: 'StudyFlow' }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              isDarkMode={isDarkMode}
              theme={currentTheme}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="SubjectDetails"
          options={{ title: 'Subject Details' }}
        >
          {(props) => (
            <SubjectDetailsScreen
              {...props}
              isDarkMode={isDarkMode}
              theme={currentTheme}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Settings"
          options={{ title: 'Settings' }}
        >
          {(props) => (
            <SettingsScreen
              {...props}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              theme={currentTheme}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}