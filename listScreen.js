import React, { useEffect, useState,useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Rating } from 'react-native-ratings';
import { Card, Divider, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Info from './info';
import { IconButton} from 'react-native-paper'

function ListScreen({ route, navigation }) {
    const [crimeType, setCrimeType] = useState(null)
    const [startTime, setStartTime] = useState(new Date(route.params['from']))
    const [endTime, setEndTime] = useState(new Date(route.params['to']))
    const [crimeCategories, setCrimeCategories] = useState(null)
    const [loading, setLoading] = useState(true)
    const { crimeData } = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <IconButton
              icon = "home"
              onPress={() => navigation.navigate('Main')}
              title="Home"
              color="#fff"
            />
          )
        })
      }, [])

    useEffect(() => {
        setCrimeCategories([...new Set(crimeData.map(crime => crime['_primary_decsription']))])
    }, [])

    useEffect(() => {
        if (crimeCategories) {
            setLoading(false)
        }
    }, [crimeCategories])

    if (loading) {
        return <Text>Loading data...</Text>
    }

    const getStyle = (riskNum) => {
        if (riskNum == 0) {
            return styles.riskZero;
        }
        if (riskNum == 1) {
            return styles.riskOne;
        }
        if (riskNum == 2) {
            return styles.riskTwo;
        }
        if (riskNum == 3) {
            return styles.riskThree;
        }
        if (riskNum == 4) {
            return styles.riskFour;
        }
        if (riskNum == 5) {
            return styles.riskFive;
        }
        if (riskNum == 6) {
            return styles.riskSix;
        }
        if (riskNum == 7) {
            return styles.riskSeven;
        }
    };

    return (
        <View style={{ height: '95%' }}>
            <View style={{ width: '85%', alignSelf: 'center' }}>
                <View>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setCrimeType(value)}
                        placeholder={{
                            label: 'Choose crime type',
                            value: null,
                            color: 'grey',
                        }}
                        items={crimeCategories.map(category => ({ 'label': category, 'value': category, color: 'black' }))}
                        value={crimeType}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            },
                        }}
                        Icon={() => {
                            return <Icon size={24} color="black" name='down' />;
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={styles.timeFilter}>
                        <Text style={{ flex: 1 }}>From:</Text>
                        <DateTimePicker
                            value={startTime}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={(e, selectedDate) => { setStartTime(selectedDate) }}
                            style={{ flex: 2 }}
                        />
                    </View>
                    <View style={styles.timeFilter}>
                        <Text style={{ flex: 1 }}>To:</Text>
                        <DateTimePicker
                            value={endTime}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={(e, selectedDate) => { setEndTime(selectedDate) }}
                            style={{ flex: 2 }}
                        />
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.center}>
                {crimeData.map((crime, i) => {
                    const caseInfo = new Info(crime)
                    return ((!crimeType || crimeType === caseInfo.getCategory()) && caseInfo.getDate() >= startTime && caseInfo.getDate() <= endTime &&
                        (
                            <TouchableOpacity
                                key={i}
                                onPress={() => navigation.navigate('Info', { caseInfo: crime })}
                                style={{ width: '85%' }}
                            >
                                <Card containerStyle={[styles.crimeBasic, getStyle(caseInfo.getRisk())]}>
                                    <View style={styles.center}>
                                        <Text style={styles.headerText}>{caseInfo.getCategory()}</Text>
                                    </View>
                                    <Divider style={styles.divider} />
                                    <Text style={styles.infoText}>{caseInfo.getDate().toLocaleString()}</Text>
                                    <Text style={styles.infoText}>{caseInfo.getBlockStreet()}</Text>
                                    <Text style={styles.infoText}>Arrested: {caseInfo.getArrest()}</Text>
                                    <Text style={styles.infoText}>Risk Level: {caseInfo.getRisk()}</Text>
                                    <Rating
                                        style={styles.rating}
                                        startingValue={caseInfo.getRisk()}
                                        readonly={true}
                                        imageSize={22}
                                        ratingCount={6}
                                        tintColor={'white'}
                                    />
                                </Card>
                            </TouchableOpacity>
                        )
                    )
                })}
            </ScrollView>
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'grey',
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: 'grey',
        color: 'black',
        paddingRight: 30
    },
})

const styles = StyleSheet.create({
    timeFilter: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: "row",
        width: '50%',
        alignItems: 'center',
        color: 'black',
    },
    filterContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    filterText: {
        color: 'grey',
        fontSize: 14
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        height: 1,
        backgroundColor: 'grey'
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5
    },
    rating: {
        paddingVertical: 0,
        alignSelf: 'flex-start'
    },
    crimeBasic: {
        borderRadius: 4,
        borderWidth: 2,
    },
    riskZero: {
        borderColor: 'rgba(192, 192, 192, 1)'
    },
    riskOne: {
        borderColor: 'rgba(0, 255, 0, 1)'
    },
    riskTwo: {
        borderColor: 'rgba(0, 255, 0, 1)'
    },
    riskThree: {
        borderColor: 'rgba(255, 0, 255, 1)'
    },
    riskFour: {
        borderColor: 'rgba(255, 255, 0, 1)'
    },
    riskFive: {
        borderColor: 'rgba(255, 44, 0, 0.4)'
    },
    riskSix: {
        borderColor: 'rgba(255, 99, 71, 1)'
    },
    riskSeven: {
        borderColor: 'rgba(255, 0, 0, 1)'
    },
});


export default ListScreen;