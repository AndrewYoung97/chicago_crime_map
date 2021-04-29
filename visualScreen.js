import * as React from 'react';
import { useLayoutEffect, useEffect, useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import { IconButton } from 'react-native-paper';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import * as scale from 'd3-scale';

function VisScreen({ route, navigation }) {
    const { crimeData, blocks } = route.params
    const [loading, setLoading] = useState(true)
    const [ranking, setRanking] = useState([])
    const [classification, setClassification] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon="home"
                    onPress={() => navigation.navigate('Main')}
                    title="Home"
                    color="#fff"
                />
            )
        })
    }, [])

    useEffect(() => {
        let wholeRanking = blocks.map(block => ([block['Area Name'], block['Crimes'].length])).sort(
            function (a, b) {
                return a[1] - b[1];
            }
        ).reverse()
        setRanking(wholeRanking.slice(0, 10))
        let crimeCount = {}
        for (const crime of crimeData) {
            crimeCount[crime['_primary_decsription']] = (crimeCount[crime['_primary_decsription']] || 0) + 1
        }
        setClassification(Object.entries(crimeCount))
    }, [])

    useEffect(() => {
        if (classification.length > 0 && ranking.length > 0) {
            setLoading(false)
        }
    }, [ranking, classification])

    if (loading) {
        return <Text>Loading data...</Text>
    }

    const blockCrimeNumber = ranking.map(block => ({ label: block[0], value: block[1] }))
    const CUT_OFF = ranking[3][1]
    const Labels = ({ x, y, bandwidth, data }) => {
        return data.map((value, index) => (
            <SvgText
                key={index}
                x={value['value'] > CUT_OFF ? x(0) + 10 : x(value['value']) + 10}
                y={y(index) + (bandwidth / 2)}
                fontSize={14}
                fill={value['value'] > CUT_OFF ? 'white' : 'black'}
                alignmentBaseline={'middle'}
            >
                {value['value']}
            </SvgText>
        ))
    }

    return (
        <View style={{ height: '90%' }}>
            <ScrollView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Block Ranking</Text>
                    <View style={styles.graphStyle}>
                        <YAxis
                            data={blockCrimeNumber}
                            yAccessor={({ index }) => index}
                            scale={scale.scaleBand}
                            contentInset={{ top: 10, bottom: 10 }}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                                fontWeight: 'bold'
                            }}
                            spacing={0.2}
                            formatLabel={(_, index) => blockCrimeNumber[index].label}
                        />
                        <BarChart
                            style={{ flex: 1 }}
                            data={blockCrimeNumber}
                            horizontal={true}
                            yAccessor={({ item }) => item.value}
                            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacing={0.2}
                            gridMin={0}
                        >
                            <Grid direction={Grid.Direction.VERTICAL} />
                            <Labels />
                        </BarChart>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Crime Categories</Text>
                    <Table borderStyle={{ borderWidth: 2.5 }}>
                        <Row data={['Crime Type', 'Number']} style={styles.headStyle} textStyle={styles.textStyle} />
                        <Rows data={classification} textStyle={styles.textStyle} />
                    </Table>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    headStyle: {
        height: 40
    },
    textStyle: {
        margin: 6
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
    },
    graphStyle: {
        flexDirection: 'row',
        height: 300,
        paddingVertical: 10
    }
});
export default VisScreen;