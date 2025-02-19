import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import * as FileSystem from 'expo-file-system';

const fileUri = `${FileSystem.documentDirectory}periodDates.json`;

const Summery = () => {
  const [allData, setAllData] = useState<{ [month: string]: { [date: string]: any } }>({});

  // Read JSON file on component mount
  useEffect(() => {
    const readAll = async () => {
      try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const parsedData = fileContent ? JSON.parse(fileContent) : {};
        setAllData(parsedData);
      } catch (error) {
        console.log('Failed to read data:', error);
      }
    };

    readAll();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.navbar}>
        <Nav />
      </View>

      <ScrollView style={styles.dataContainer}>
        {Object.keys(allData).length > 0 ? (
          Object.entries(allData).map(([month, dates]) => (
            <View key={month} style={styles.monthSection}>
              <Text style={styles.monthTitle}>{month}</Text>
              {Object.keys(dates).map((date) => (
                <Text key={date} style={styles.dateText}>
                  {date}
                </Text>
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No data found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    backgroundColor: '#FBFBFB',
    height: '100%',
    width: '100%'
  },
  navbar: {
    position: 'relative',
    marginBottom: 0,
    width: '100%',
    height: 80
  },
  dataContainer: {
    padding: 10
  },
  monthSection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  }
});

export default Summery;
