import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DownloadIcon } from '../../../../../utils/svgSrc'
import { SelectDropdown, Typo } from '../../../../../components'

const TransactionTab = () => {

    const [dropdown, setDropdown] = useState('')

    const transactionsData = [
        {
            month: 'August 2025',
            transactions: [
                { id: '1', title: 'ABC Solar Installation', date: '31 August, 05:13 p.m.', amount: '-₹7,000' },
                { id: '2', title: 'AMC Service', date: '22 August, 05:13 p.m.', amount: '-₹2,000' },
                { id: '3', title: 'Monthly AMC Subscription', date: '21 August, 05:13 p.m.', amount: '-₹6,000' },
                { id: '4', title: 'Solar Installation', date: '21 August, 05:13 p.m.', amount: '-₹10,000' },
                { id: '5', title: 'CSE Solar Installation', date: '15 August, 05:13 p.m.', amount: '-₹7,000' },
            ],
        },
        {
            month: 'July 2025',
            transactions: [
                { id: '6', title: 'ABC Solar Installation', date: '31 July, 05:13 p.m.', amount: '-₹7,000' },
                { id: '7', title: 'AMC Service', date: '22 July, 05:13 p.m.', amount: '-₹2,000' },
                { id: '8', title: 'Monthly AMC Subscription', date: '21 July, 05:13 p.m.', amount: '-₹6,000' },
            ],
        },
    ];


    const renderList = ({ item }: { item: typeof transactionsData[0] }) => {
        return (
            <View style={{ marginBottom: 32, gap: 20 }}>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ borderWidth: 1, borderStyle: 'dashed', position: 'relative', borderColor: '#D4CEDA' }}></View>
                    <Typo label={item?.month} color='#030204' variant='bodyMediumTertiary' style={{ position: 'absolute', top: -10, backgroundColor: '#FFFFFF', right: 0, paddingLeft: 10 }} />
                </View>
                <View style={{ gap: 24 }}>
                    {item?.transactions.map((el) => (
                        <View
                            key={el.id}
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Typo label={el.title} color='#030204' variant='bodyLargeTertiary' />
                                <Typo label={el.date} color='#7A7480' variant='bodyMediumTertiary' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Typo label={el.amount} color='#030204' variant='bodyLargeSecondary' />
                                <TouchableOpacity>
                                    <DownloadIcon />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        // <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 16 }}>
                <SelectDropdown
                    placeholder="Recent transactions"
                    options={[
                        { label: 'Current month', value: 'Lasdatest' },
                        { label: 'Last month', value: 'Latesast' },
                        { label: 'Last 3 months', value: 'Lavxtest' },
                        { label: 'Last 6 months', value: 'Lweatest' },
                        { label: 'Last year', value: 'Latesst' },
                        { label: 'Custom range', value: 'Lvxcatest' }
                    ]}
                    value={dropdown}
                    onValueChange={(val) => setDropdown(val)}
                />
                <FlatList
                    data={transactionsData}
                    keyExtractor={(item) => item?.month}
                    renderItem={renderList}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        // </SafeAreaView>
    )
}

export default TransactionTab
