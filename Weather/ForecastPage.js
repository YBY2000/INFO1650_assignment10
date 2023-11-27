// ForecastPage.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import sunnyIcon from './assets/sunny.png';
import snowyIcon from './assets/snowy.png';
import cloudyIcon from './assets/cloudy.png';
import rainyIcon from './assets/rainy.png';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ForecastCard = styled.TouchableOpacity`
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 80%;
  align-items: center;
`;

const DayText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const WeatherLogo = styled.Image`
  width: 50,
  height: 50,
`;

const HighLowText = styled.Text`
  font-size: 12px;
  margin-bottom: 5px;
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


const ForecastScreen = ({ navigation , condition }) => {
    return (
        <Container>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                5-Day Forecast
            </Text>
            {/* Fake data for demonstration */}
            {fakeForecastData.map((day, index) => (
                <ForecastCard
                    key={index}
                    onPress={() => navigation.navigate('DayDetail', { day })}
                >
                    <DayText>{day.day}</DayText>
                    <HighLowText>High: {day.highTemp}°C</HighLowText>
                    <HighLowText>Low: {day.lowTemp}°C</HighLowText>
                    {/* Add image based on weather condition */}
                    {/* <Image source={...} /> */}
                    <Image source={getWeatherImage(day.condition)} style={{ width: 20, height: 20 }} />
                </ForecastCard>
            ))}
        </Container>
    );
};

const fakeForecastData = [
    { day: 'Monday', highTemp: 28, lowTemp: 18, condition: 'sunny' },
    { day: 'Tuesday', highTemp: 25, lowTemp: 15, condition: 'cloudy' },
    { day: 'Wednesday', highTemp: 22, lowTemp: 12, condition: 'rainy' },
    { day: 'Thursday', highTemp: 20, lowTemp: 10, condition: 'snowy' },
    { day: 'Friday', highTemp: 23, lowTemp: 14, condition: 'sunny' },
];

export default ForecastScreen;
