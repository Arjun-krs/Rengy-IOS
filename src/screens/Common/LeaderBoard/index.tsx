import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';
import { WeeklyScreen, AllTimeScreen } from './Tabs';
import { Typo } from '../../../components/common';
const LeaderBoardScreen: React.FC = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: "weekly", title: "Weekly" },
        { key: "allTime", title: "All Time" },
    ]);

    const renderScene = SceneMap({
        weekly: WeeklyScreen,
        allTime: AllTimeScreen,
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
            <HeaderComp isPrimaryHeader={false} isSecondaryHeader screenName="Top performing vendors" statubarColor="#FFFFFF" />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </SafeAreaView>
    );
};

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
})

export default LeaderBoardScreen;
