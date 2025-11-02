import React, { useState } from "react";
import { View, useWindowDimensions, StyleSheet, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Typo } from "../../../../components/common";
import { MessageTab, OverviewTab } from "./Tabs";
import HeaderComp from "../../../../navigation/DynamicRoutes/Components/HeaderComp.tsx";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const SiteSUrveyScreen = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    const [routes] = useState([
        { key: "overview", title: "Overview" },
        { key: "message", title: "Message" },
    ]);

    const renderScene = SceneMap({
        overview: OverviewTab,
        message: MessageTab,
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
                        <Typo style={[styles.tabText, isActive && { fontFamily: 'GeneralSans-Medium' }]}>
                            {route?.title}
                        </Typo>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp screenName="#RENGY12345" isPrimary={false} bgColor="#FFFFFF" isBack onBackPress={() => navigation.goBack()} isSearch={false} isNotification={false} isProfile={false} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </SafeAreaView>
    );
}

export default SiteSUrveyScreen;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
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
