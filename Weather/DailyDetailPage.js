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
    // Generate fake hourly data based on the selected date
    const generateHourlyData = () => {
      const fakeData = [];
      const selectedDate = new Date(day);
      // Set the starting time for the fake data
      selectedDate.setHours(0, 0, 0, 0);

      // Generate hourly data for 24 hours
      for (let i = 0; i < 24; i++) {
        const hourlyData = {
          dt_txt: selectedDate.toISOString(),
          main: {
            temp: Math.random() * 7 - 3,
          },
          weather: [
            {
              main: 'Clear', // You can customize this based on your requirements
            },
          ],
        };

        fakeData.push(hourlyData);

        // Increment the selected date by 1 hour
        selectedDate.setHours(selectedDate.getHours() + 1);
      }

      setHourlyForecast(fakeData);
    };

    generateHourlyData();
  }, [day]);

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {day}'s Hourly Forecast
      </Text>
      <FlatList
        data={hourlyForecast}
        keyExtractor={(item) => item.dt_txt}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.dt_txt}</Text>
            <Text>{item.main.temp.toFixed(2)}°C</Text>
            <Text>{item.weather[0].main}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DailyDetailPage;
