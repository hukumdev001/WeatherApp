import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SearchAddress from '../../common/searchAddress';
import {useSelector, useDispatch} from 'react-redux';
import {getcurrentlocation} from '../../services/location';
import moment from 'moment';
import {colors} from '../../constants/colors';

const index = () => {
  const {weatherData} = useSelector(state => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    getcurrentlocation(dispatch);
  }, []);

  return (
    <ScrollView style={{marginHorizontal: 10, marginTop: 20}}>
      <SearchAddress />
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>
          Sunrise:
          {weatherData?.data?.sys.sunrise
            ? moment.unix(weatherData?.data?.sys.sunrise).format('HH:SS')
            : null}
        </Text>
        <Text style={styles.textStyle}>
          Sunset:
          {weatherData?.data?.sys.sunset
            ? moment.unix(weatherData?.data?.sys.sunset).format('HH:SS')
            : null}
        </Text>
      </View>

      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>Weather</Text>
        <Text style={styles.textStyle}>
          Description: {weatherData?.data?.weather[0].description}
        </Text>
      </View>

      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>Temperature</Text>
        <Text style={styles.textStyle}>
          Current Temp: {weatherData?.data?.main.temp}
        </Text>
        <Text style={styles.textStyle}>
          Feels Like:
          {weatherData?.data?.main.feels_like}
        </Text>
        <Text style={styles.textStyle}>
          Minimum Temp: {weatherData?.data?.main.temp_min}
        </Text>
        <Text style={styles.textStyle}>
          Maximum Temp: {weatherData?.data?.main.temp_max}
        </Text>
        <Text style={styles.textStyle}>
          Pressure: {weatherData?.data?.main.pressure}
        </Text>
        <Text style={styles.textStyle}>
          Humidity: {weatherData?.data?.main.humidity}
        </Text>
      </View>

      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>Wind</Text>
        <Text style={styles.textStyle}>
          Speed: {weatherData?.data?.wind.speed}
        </Text>
        <Text style={styles.textStyle}>
          Degree: {weatherData?.data?.wind.deg}
        </Text>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
  },

  textStyle: {
    fontSize: 20,
    opacity: 0.7,
  },

  containerStyle: {
    marginVertical: 10,
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
  },
});
