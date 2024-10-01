import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const Demo = () => {
  const [location, setlocation] = useState(null);
  Geolocation.requestAuthorization(permission => {
    console.log(permission);
  });
  Geolocation.setRNConfiguration({
    distanceFilter: 10,
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  });
  Geolocation.getCurrentPosition(info => {
    console.log(info);
    setlocation(JSON.stringify(info));
  });
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'black'}}>location: {location}</Text>
    </View>
  );
};

export default Demo;
