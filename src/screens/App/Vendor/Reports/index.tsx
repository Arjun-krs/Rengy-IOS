import React, { useState } from "react";
import { View, useWindowDimensions, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, SceneMap } from "react-native-tab-view";
import LinearGradient from "react-native-linear-gradient";
import { ProjectTab, RequestTab } from "./Tabs";
import HeaderComp from "../../../../navigation/Components/HeaderComp";
import { Typo } from "../../../../components";

const VendorReportScreen = () => {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets()
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "projects", title: "Projects" },
    { key: "request", title: "Request" },
  ]);

  const renderScene = SceneMap({
    projects: ProjectTab,
    request: RequestTab,
  });

  const renderTabBar = (props: any) => (
    <View style={styles.tabBarContainer}>
      {props?.navigationState?.routes?.map((route: any, i: number) => {
        const isActive = index === i;
        return (
          <TouchableOpacity
            key={route?.key}
            style={[styles.tabItem, isActive && styles.activeTab]}
            onPress={() => setIndex(i)}
          >
            <Typo label={route?.title} style={[styles.tabText, isActive && { fontFamily: 'GeneralSans-Medium' }]}/>
              {/* {route?.title}
            </Typo> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E5F8E6' }}>
      <HeaderComp statubarColor="#E5F8E6" />
      <View style={{ height: '100%' }}>
        <LinearGradient
          colors={['#E5F8E6', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        >
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

export default VendorReportScreen

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    margin: 16,
    padding: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Regular',
    color: '#030204'
  },
});
