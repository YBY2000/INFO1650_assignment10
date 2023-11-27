// WeatherComponent.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import sunnyIcon from './assets/sunny.png';
import snowyIcon from './assets/snowy.png';
import cloudyIcon from './assets/cloudy.png';
import rainyIcon from './assets/rainy.png';

const Container = styled.View`
  flex-direction: row; // Set flexDirection to 'row' for a horizontal layout
  align-items: center;
`;

const WeatherImage = styled.Image`
  width: 50px;
  height: 50px;
`;
const getWeatherImage = (condition) => {
  switch (condition) {
    case 'sunny':
      return sunnyIcon;
    case 'snowy':
      return snowyIcon;
    case 'cloudy':
      return cloudyIcon;
    case 'rainy':
      return rainyIcon;
    default:
      return null; // You can provide a default image or handle it as needed
  }
};

const WeatherComponent = ({ condition }) => {
  const weatherImage = getWeatherImage(condition);

  return (
    <Container>
      <WeatherImage source={weatherImage} />
      <Text style={{ marginLeft: 10 }}>{condition}</Text>
    </Container>
  );
};

export default WeatherComponent;
