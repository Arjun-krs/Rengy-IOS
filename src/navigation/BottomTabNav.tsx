import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Image, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomerHome from '../screens/App/Customer/Home';
import GetInstallation from '../screens/App/Customer/GetInstallation';
import RequestList from '../screens/App/Customer/RequestList';
import VendorHome from '../screens/App/Vendor/Home';
import VendorPreHome from '../screens/App/Vendor/Home/Home';
import ArVrScreen from '../screens/App/Vendor/ArVr';
import VendorReportScreen from '../screens/App/Vendor/Reports';
import VendorCalculate from '../screens/App/Vendor/Calculate';
import CustomerCalculate from '../screens/App/Customer/Calculate';

import CustomTabBarBackground from './Components/TabbarBackground';
import useFetchUserData from '../hooks/useFetchUser';
import { PlusIcon } from '../utils/svgSrc';
import { FOOTER_MENU } from './Components/TabMenu';

const Tab = createBottomTabNavigator();
interface TabMenuItem {
  name: string;
  component: React.ComponentType<any>;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode | string;
}

interface CustomTabBarLabelProps {
  focused: boolean;
  title: string;
}

interface UserInfo {
  userType: 'customer' | 'vendor' | null;
  isLoading: boolean;
}

const BottomTabView = () => {
  const navigation = useNavigation<any>();
  const { user } = useFetchUserData()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: null,
    isLoading: true,
  });

  let menu: any;

  useEffect(() => {
    AsyncStorage.getItem('user_type').then(storedType => {
      if (storedType === 'vendor' || storedType === 'customer') {
        setUserInfo((prev) => ({ ...prev, userType: storedType }))
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'UserType' }],
        });
      }
      setUserInfo((prev) => ({ ...prev, isLoading: false }))
    });
  }, [navigation]);

  const isLoggedIn = !!(user?.accessToken && user?.refreshToken);

  switch (userInfo?.userType) {
    case 'customer':
      menu = [
        {
          name: 'Home',
          component: CustomerHome,
        },
        {
          name: 'Calculate',
          component: CustomerCalculate,
        },
        {
          name: 'Get Installation',
          component: GetInstallation,
        },
        {
          name: 'My Request',
          component: RequestList,
        },
      ];
      break;
    case 'vendor':
      const VendorHomeComponent = isLoggedIn ? VendorHome : VendorPreHome;
      menu = [
        {
          name: 'Home',
          component: VendorHomeComponent,
        },
        {
          name: 'AR/VR',
          component: ArVrScreen,
        },
        {
          name: 'Add Button',
          component: () => null,
        },
        {
          name: 'Report',
          component: VendorReportScreen,
        },
        {
          name: 'Calculate',
          component: VendorCalculate,
        },
      ];
      break;
    default:
      menu = [];
  }

  const renderItem = (item: TabMenuItem, active: boolean, navigation: any, route: { name: string }) => {
    const handlePress = () => {
      if (item?.activeIcon === 'addButton') return;

      if (isLoggedIn) {
        navigation.navigate(route.name);
      } else {
        navigation.navigate('Login');
      }
    };
    return (
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={handlePress}>
        {active ? item?.activeIcon : item?.icon}
      </TouchableOpacity>
    );
  };

  const CustomTabBarLabel = ({ focused, title }: CustomTabBarLabelProps) => {
    return (
      <Text style={{ fontSize: 12, color: focused ? '#148057' : '#67606E' }}>
        {title}
      </Text>
    );
  };

  const renderTabButton = () => {
    const handlePress = () => {
      if (isLoggedIn) {
        navigation.navigate('AddLeads');
      } else {
        navigation.navigate('Login');
      }
    };
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          position: 'absolute',
          bottom: 25,
          alignSelf: 'center',
          backgroundColor: '#131337',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <PlusIcon color="#70F3C3" />
      </TouchableOpacity>
    );
  };

  if (userInfo?.isLoading || !userInfo?.userType || (isLoggedIn && !user)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#148057" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName: any;
          iconName = FOOTER_MENU?.find(el => el?.name === route?.name);
          return renderItem(iconName, focused, navigation, route);
        },
        tabBarLabel: ({ focused }) => (
          <CustomTabBarLabel focused={focused} title={route?.name} />
        ),
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: menu?.some((item: any) => item?.name === 'Add Button') ? 0 : 7,
          display: 'flex',
        },
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        tabBarBackground: () =>
          menu?.some((item: any) => item?.name === 'Add Button') ? (
            <CustomTabBarBackground />
          ) : undefined,
      })}
    >
      {menu?.map((screens: any) => (
        <Tab.Screen
          name={screens?.name}
          component={screens?.component}
          options={{
            tabBarButton: screens?.name === 'Add Button' ? () => renderTabButton() : undefined
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabView;
