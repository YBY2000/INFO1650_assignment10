// ForecastPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';

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
  width: 25;
  height: 25;
`;

const HighLowText = styled.Text`
  font-size: 12px;
  margin-bottom: 5px;
`;

const kelvinToCelsius = (temperature) => {
  return temperature - 273.15;
};

const getWeatherImage = (condition) => {
  switch (condition) {
    case 'Clear':
      return require('./assets/sunny.png');
    case 'Snow':
      return require('./assets/snowy.png');
    case 'Clouds':
      return require('./assets/cloudy.png');
    case 'Rain':
      return require('./assets/rainy.png');
    default:
      return require('./assets/unknown.png');
  }
};

const ForecastPage = ({ navigation }) => {
  const [forecastData, setForecastData] = useState([]);
  const [dailyTemps, setDailyTemps] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = '695be21d675c8f2da6036cc5a86747f6';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=BOSTON&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);

        if (!data || !data.list) {
          throw new Error('Unexpected API response format');
        }

        const dailyData = data.list.filter((item, index) => index % 8 === 0); // Select every 8th item

        setForecastData(dailyData);

        // Process daily temperatures
        const temps = {};
        dailyData.forEach((forecast) => {
          const date = forecast.dt_txt.split(' ')[0];
          const temp = forecast.main.temp;
          if (!temps[date]) {
            temps[date] = { min: temp, max: temp };
          } else {
            temps[date].min = Math.min(temps[date].min, temp);
            temps[date].max = Math.max(temps[date].max, temp);
          }
        });
        setDailyTemps(temps);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <Container>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        5-Day Forecast
      </Text>
      {forecastData.map((forecast, index) => (
        <ForecastCard
          key={index}
          onPress={() => navigation.navigate('DailyDetail', { day: forecast })}
        >
          <DayText>{forecast.dt_txt}</DayText>
          {dailyTemps[forecast.dt_txt.split(' ')[0]] ? (
            <>
              <HighLowText>
                High: {kelvinToCelsius(dailyTemps[forecast.dt_txt.split(' ')[0]].max).toFixed(2)}°C
              </HighLowText>
              <HighLowText>
                Low: {kelvinToCelsius(dailyTemps[forecast.dt_txt.split(' ')[0]].min).toFixed(2)}°C
              </HighLowText>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
          <WeatherLogo source={getWeatherImage(forecast.weather[0].main)} />
        </ForecastCard>
      ))}
    </Container>
  );
};

export default ForecastPage;
