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

        // Extract daily data using the date as the key
        const dailyData = data.list.reduce((acc, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) {
            acc[date] = [item];
          } else {
            acc[date].push(item);
          }
          return acc;
        }, {});

        setForecastData(dailyData);

        // Process daily temperatures
        const temps = {};
        Object.keys(dailyData).forEach((date) => {
          const temperatures = dailyData[date].map((forecast) => forecast.main.temp);
          temps[date] = { min: Math.min(...temperatures), max: Math.max(...temperatures) };
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
      {Object.keys(forecastData).map((date) => {
        const forecast = forecastData[date][0]; // Take the first item of the day
        return (
          <ForecastCard
            key={date}
            onPress={() => {
              console.log('Full Forecast Object:', forecast); // Log the full object
              const hourlyData = forecastData[date];
              console.log('Selected Day:', date);
              console.log('Hourly Data:', hourlyData);
              navigation.navigate('DailyDetail', { day: date, hourlyData });
            }}
          >
            <DayText>{date}</DayText>
            {dailyTemps[date] ? (
              <>
                <HighLowText>
                  High: {kelvinToCelsius(dailyTemps[date].max).toFixed(2)}°C
                </HighLowText>
                <HighLowText>
                  Low: {kelvinToCelsius(dailyTemps[date].min).toFixed(2)}°C
                </HighLowText>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
            <WeatherLogo source={getWeatherImage(forecast?.weather[0]?.main)} />
          </ForecastCard>
        );
      })}
    </Container>
  );
};

export default ForecastPage;
