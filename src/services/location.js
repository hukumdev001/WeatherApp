import urls from '../constants/urls';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request, check} from 'react-native-permissions';
import {Platform} from 'react-native';
import {GOOGLEKEY} from '../constants/key';
import {getWeather} from '../redux/actions/weatherAction';

export const searchAddress = async data => {
  try {
    const response = await axios({
      method: 'GET',
      url: urls.googleMapSearch,
      headers: {
        Accept: 'application/json',
      },
      params: {
        input: data,
        key: GOOGLEKEY,
      },
    });

    if (response.data) {
      return response.data;
    }
  } catch (err) {
    if (err.response) {
      const {message} = err.response.data;
    } else if (err.request) {
      if (!err.status) {
      }
    } else {
    }
  }
};

export const addressByPlacesId = async placeid => {
  try {
    const response = await axios({
      method: 'GET',
      url: urls.addressByPlacesId,
      headers: {
        Accept: 'application/json',
      },
      params: {
        place_id: placeid,
        key: GOOGLEKEY,
      },
    });

    if (response.data) {
      return response.data;
    }
  } catch (err) {
    if (err.response) {
      const {message} = err.response.data;
    } else if (err.request) {
      if (!err.status) {
      }
    } else {
    }
  }
};

export const getcurrentlocation = dispatch => {
  try {
    Geocoder.init(GOOGLEKEY);
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(res => {
      if (res == 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            let initialRegion = Object.assign(
              {},
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            );

            const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
            const circumference = (40075 / 360) * 1000;

            const latDelta =
              position.coords.accuracy *
              (1 / (Math.cos(position.coords.latitude) * circumference));
            const lonDelta =
              position.coords.accuracy / oneDegreeOfLongitudeInMeters;

            initialRegion.latitudeDelta = Math.max(0, latDelta);
            initialRegion.longitudeDelta = Math.max(0, lonDelta);

            Geocoder.from(initialRegion.latitude, initialRegion.longitude)
              .then(json => {
                let address = {
                  city: '',
                  state: '',
                  country: '',
                  zipCode: '',
                };

                let placeData = json.results[0].address_components;

                placeData.map((data, index) => {
                  switch (placeData[index].types[0]) {
                    case 'administrative_area_level_2':
                      address.city = placeData[index].long_name;
                      break;

                    case 'locality':
                      address.city = placeData[index].long_name;
                      break;

                    case 'administrative_area_level_1':
                      address.state = placeData[index].long_name;
                      break;

                    case 'country':
                      address.country = placeData[index].long_name;
                      break;

                    case 'postal_code':
                      address.zipCode = placeData[index].long_name;
                      break;

                    default:
                      break;
                  }
                });

                dispatch(getWeather(address));
              })
              .catch(error => {});
          },
          error => {
            alert(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } else {
        alert('Location permission denied');
      }
    });
  } catch (error) {}
};
