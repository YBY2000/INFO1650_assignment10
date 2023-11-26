// DayDetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const DayDetailScreen = ({ route }) => {
  const { day } = route.params;

  return (
    <Container>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {day.day}'s Hourly Forecast
      </Text>
      {/* Add hourly forecast details here */}
    </Container>
  );
};

export default DayDetailScreen;
