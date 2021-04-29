import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { block_area } from './basicInfo';
import axios from 'axios';
import { APP_TOKEN } from '@env';
import { IconButton } from 'react-native-paper';

function MainScreen({ navigation }) {
  const [crimeData, setCrimeData] = useState([])
  const [loading, setLoading] = useState(true)
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 2)
  const chicagoTime = new Date(monthAgo.getTime() + monthAgo.getTimezoneOffset() * 60000)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="star"
          onPress={() => navigation.navigate('Vis', { crimeData: crimeData, blocks: block_area })}
          title="VIS"
          color="#fff"
        />
      )
    })
  }, [crimeData])

  useEffect(() => {
    axios({
      url: "https://data.cityofchicago.org/resource/x2n5-8w5q.json",
      type: "GET",
      params: {
        '$where': `date_of_occurrence > '${chicagoTime.toISOString().slice(0, -1)}'`,
        '$limit': 1000000,
        "$$app_token": `${APP_TOKEN}`
      }
    }).then(res => {
      setCrimeData(res['data'])
    })
  }, [])

  useEffect(() => {
    if (crimeData.length > 0) {
      crimeData.map(crime => {
        curLatitude = parseFloat(crime['latitude'])
        curLongitude = parseFloat(crime['longitude'])
        for (const block of block_area) {
          if (curLatitude >= block['Latitude Range'][0] && curLatitude <= block['Latitude Range'][1]
            && curLongitude >= block['Longitude Range'][0] && curLongitude <= block['Longitude Range'][1]) {
            block['Crimes'].push(crime)
            break
          }
        }
      })
      setLoading(false)
    }
  }, [crimeData])

  if (loading) {
    return <Text>Loading data...</Text>
  }

  const initialRegion = {
    latitude: 41.881832,
    longitude: -87.623177,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {block_area.map((block, i) => {
            return (
              <Marker
                key={i}
                onPress={() => navigation.navigate('List', {
                  crimeData: block['Crimes'],
                  from: monthAgo.toJSON(),
                  to: new Date().toJSON()
                })}
                coordinate={{ latitude: block['Center'][0], longitude: block['Center'][1] }}
              >
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: 'red',
                }}
                >
                  <Text style={styles.marker}>
                    {block['Crimes'].length}
                  </Text>
                </View>
              </Marker>
            )
          })}
        </MapView>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.infoText}> All the Crime number: {crimeData.length}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    height: '95%',
    marginTop: '5%',
    borderRadius: 5,
    overflow: 'hidden'
  },
  map: {
    flex: 1,
  },
  infoView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 40,
  },
  marker: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    backgroundColor: "orange"
  }
})

export default MainScreen;

