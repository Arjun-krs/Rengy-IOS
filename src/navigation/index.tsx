import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screens } from './Components/StackScreen';
import { useDrawerStore } from '../hooks/Drawer/useDrawer';
import CustomDrawer from './Components/CustomDrawer';

const Stack = createNativeStackNavigator();
const options = { headerShown: false };

const MainRoutes = () => {
  const { isDrawerVisible, closeDrawer } = useDrawerStore();
  return (
    <NavigationContainer>
      <CustomDrawer isVisible={isDrawerVisible} onClose={closeDrawer} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {screens.map(screen => (
          <Stack.Screen
            key={screen?.name}
            name={screen?.name}
            component={screen?.component}
            options={options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;
