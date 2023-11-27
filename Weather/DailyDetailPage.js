// DailyDetailPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const HourlyForecastItem = ({ hour, temperature, condition }) => (
  <View style={{ marginVertical: 10 }}>
    <Text>{hour}</Text>
    <Text>{temperature}°C</Text>
    <Text>{condition}</Text>
  </View>
);

const DailyDetailPage = ({ route }) => {
  const { day } = route.params;
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = '695be21d675c8f2da6036cc5a86747f6';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=BOSTON&appid=${apiKey}`
        );
        const data = await response.json();
        setHourlyForecast(data.list);
      } catch (error) {
        console.error('Error fetching hourly forecast data:', error);
      }
    };

    fetchHourlyForecast();
  }, []);

  return (
    <Container>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {day.dt_txt}'s Hourly Forecast
      </Text>
      <FlatList
        data={hourlyForecast}
        keyExtractor={(item) => item.dt}
        renderItem={({ item }) => (
          <HourlyForecastItem
            hour={item.dt_txt}
            temperature={item.main.temp}
            condition={item.weather[0].main}
          />
        )}
      />
    </Container>
  );
};

export default DailyDetailPage;
