/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import {searchAddress, addressByPlacesId} from '../services/location';
import {useDispatch} from 'react-redux';
import {getWeather} from '../redux/actions/weatherAction';

const deliveryAddress = () => {
  const dispatch = useDispatch();
  const [textAutoSuggestion, setTextAutoSuggestion] = useState('');
  const [selectedSuggestion, setSelectedAutoSuggestion] = useState('');
  const [autoSuggestionData, saveAutoSuggestionData] = useState([]);

  const onTextSuggestionChange = React.useCallback(
    data => {
      setTextAutoSuggestion(data);
    },
    [setTextAutoSuggestion],
  );

  const selectedVaule = React.useCallback(
    data => {
      saveAutoSuggestionData([]);
      setSelectedAutoSuggestion(data);
    },
    [setSelectedAutoSuggestion],
  );

  const getaddressPlacesData = async () => {
    if (selectedSuggestion.place_id) {
      const data = await addressByPlacesId(selectedSuggestion.place_id);
      let city = '',
        state = '',
        country = '',
        zipcode = '';
      let placeData = data.result.address_components;
      placeData.map((data, index) => {
        switch (placeData[index].types[0]) {
          case 'administrative_area_level_2':
            city = placeData[index].long_name;
            break;
          case 'locality':
            city = placeData[index].long_name;
            break;
          case 'administrative_area_level_1':
            state = placeData[index].long_name;
            break;
          case 'country':
            country = placeData[index].long_name;
            break;
          case 'postal_code':
            zipcode = placeData[index].long_name;
            break;
          default:
            break;
        }
      });
      const submitdata = {
        city: city,
        country: country,
        state: state,
        zipcode: zipcode,
      };
      dispatch(getWeather(submitdata));
    }
  };

  const getAutoSuggestionData = async () => {
    if (textAutoSuggestion.length >= 3) {
      const searchData = await searchAddress(textAutoSuggestion);
      saveAutoSuggestionData(searchData);
    }
  };

  useEffect(() => {
    getaddressPlacesData();
  }, [selectedSuggestion]);

  useEffect(() => {
    setSelectedAutoSuggestion('');
    saveAutoSuggestionData([]);
    getAutoSuggestionData();
  }, [textAutoSuggestion]);

  return (
    <View style={{marginBottom: 15}}>
      <View style={styles.surfaceContainer}>
        <TextInput
          onChangeText={value => onTextSuggestionChange(value)}
          mode="outlined"
          value={
            selectedSuggestion !== ''
              ? selectedSuggestion.description
              : textAutoSuggestion
          }
          placeholder="Search City"
          style={[styles.textInputStyles]}
        />
      </View>
      {autoSuggestionData.predictions &&
        autoSuggestionData.predictions.map(data => (
          <View key={data.place_id} style>
            <Text
              onPress={() => selectedVaule(data)}
              style={styles.suggestionList}>
              {data.description}
            </Text>
          </View>
        ))}
    </View>
  );
};

export default deliveryAddress;

const styles = StyleSheet.create({
  surfaceContainer: {
    borderColor: colors.accentSecondary,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: colors.darkGrey,
  },

  textInputStyles: {
    width: '99%',
    backgroundColor: colors.light,
  },

  errorStyles: {
    color: colors.error,
    marginTop: 3,
    marginBottom: 5,
  },

  suggestionList: {
    marginHorizontal: 15,

    fontSize: 17,
    paddingVertical: 5,
    lineHeight: 30,
  },
});
