import React, { useLayoutEffect }  from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import MapView, { Marker } from 'react-native-maps';
import Info from './info';
import { IconButton} from 'react-native-paper'

function InfoScreen({ route, navigation }) {
    const { caseInfo } = route.params

    if (!caseInfo) {
        return (
            <Text>Loading</Text>
        )
    }

    const info = new Info(caseInfo);
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

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: info.getLatitude(),
                        longitude: info.getLongitude(),
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >
                    <Marker coordinate={{ latitude: info.getLatitude(), longitude: info.getLongitude() }} />
                </MapView>
            </View>
            <View style={styles.infoView}>
                <Text style={styles.headerText}>{info.getCaseID()}</Text>
                <Text style={styles.headerText}>{info.getCategory()}</Text>
                <Rating
                    style={styles.rating}
                    startingValue={info.getRisk()}
                    readonly={true}
                    imageSize={22}
                    ratingCount={6}
                    tintColor={'red'}
                />
                <Divider style={styles.divider} />
                <Text style={styles.infoText}>{info.getBlockStreet()}</Text>
                <Text style={styles.infoText}>Place: {info.getLocationDescription()}</Text>
                <Text style={styles.infoText}>{info.getDate().toLocaleString()}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.infoText}>Case Description:</Text>
                <Text style={styles.infoText}>{info.getDescription()}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.infoText}>Arrested: {info.getArrest()}</Text>
                <Divider style={styles.divider} />
                <Button onPress={() => navigation.goBack()} title="BACK" />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        height: 2,
        backgroundColor: 'grey'
    },
    infoText: {
        fontSize: 18,
        marginBottom: 5
    },
    mapContainer: {
        flex: 1,
        alignSelf: 'center',
        width: '85%',
        height: '85%',
        marginTop: '5%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    map: {
        flex: 1,
    },
    infoView: {
        flex: 2,
        marginTop: '10%',
        width: '80%'
    },
    rating: {
        paddingVertical: 0,
        alignSelf: 'flex-start',
    },
})

export default InfoScreen;
