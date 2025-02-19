import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Calendar } from 'react-native-calendars';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';

const fileUri = `${FileSystem.documentDirectory}periodDates.json`;

const Period = () => {
    const [markDate, setDate] = useState<{ [key: string]: { startingDay?: boolean, endingDay?: boolean, color: string } }>({});
    const [currentMonth, setCurrentMonth] = useState<string>('');

    useEffect(() => {
        Notifications.requestPermissionsAsync();
    }, []);

    const loadDatesForMonth = async (month: string) => {
        try {
            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            const allDates = fileContent ? JSON.parse(fileContent) : {};
            setDate(allDates[month] || {});
            setCurrentMonth(month);
        } catch (error) {
            console.log('Failed to load dates:', error);
            setDate({});
        }
    };

    const saveDatesForMonth = async (month: string, dates: any) => {
        try {
            let allDates: { [key: string]: any } = {};
            const fileContent = await FileSystem.readAsStringAsync(fileUri).catch(() => '{}');
            if (fileContent) allDates = JSON.parse(fileContent);
            allDates[month] = dates;
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(allDates));
        } catch (error) {
            Alert.alert('Error', 'Failed to save dates.');
        }
    };

    const toggleDateSelection = (date: string) => {
        const selectedMonth = date.slice(0, 7);
        if (selectedMonth !== currentMonth) loadDatesForMonth(selectedMonth);

        setDate((prevDates) => {
            const updatedDates = { ...prevDates };
            if (updatedDates[date]) {
                delete updatedDates[date];
            } else {
                const dateKeys = Object.keys(updatedDates).sort();
                if (dateKeys.length === 0) {
                    updatedDates[date] = { startingDay: true, endingDay: true, color: '#F2C2C2' };
                } else {
                    const minDate = dateKeys[0];
                    const maxDate = dateKeys[dateKeys.length - 1];

                    if (date < minDate) {
                        updatedDates[date] = { startingDay: true, color: '#F2C2C2' };
                        updatedDates[minDate].startingDay = false;
                    } else if (date > maxDate) {
                        updatedDates[date] = { endingDay: true, color: '#F2C2C2' };
                        updatedDates[maxDate].endingDay = false;
                    } else {
                        updatedDates[date] = { color: '#F2C2C2' };
                    }
                }
            }

            saveDatesForMonth(selectedMonth, updatedDates);
            return updatedDates;
        });
    };

    useEffect(() => {
        const today = new Date();
        const initialMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        loadDatesForMonth(initialMonth);
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.navbar}>
                <Nav />
            </View>

            <View style={styles.calndr}>
                <Calendar
                    markingType="period"
                    onDayPress={(day: { dateString: string }) => toggleDateSelection(day.dateString)}
                    markedDates={markDate}
                />
            </View>

            <View style={styles.scrollAndImageHolder}>
                <ScrollView style={styles.scrollable}>
                    {Object.keys(markDate).length > 0 ? (
                        Object.keys(markDate).map((date) => (
                            <Text key={date} style={styles.dateText}>{date}</Text>
                        ))
                    ) : (
                        <Text style={styles.dateText}>No Dates</Text>
                    )}
                </ScrollView>

                <View style={styles.imagare}>
                    <Image
                        source={{ uri: 'https://i.pinimg.com/originals/ba/05/84/ba05848aa94062e65b730304a4c20cfb.gif' }}
                        style={{ width: 200, height: 200 }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    navbar: {
        position: 'relative',
        marginBottom: 0,
        width: '100%',
        height: 80
    },
    calndr: {
        display: 'flex',
        width: '100%',
        marginBottom: 10
    },
    scrollAndImageHolder: {
        display: 'flex',
        width: '100%',
        height: 300,
        paddingLeft: '2%',
        paddingRight: '2%',
        flexDirection: 'row',
    },
    scrollable: {
        width: '30%',
        maxHeight: 300,
        overflow: 'scroll',
    },
    dateText: {
        fontFamily: 'popping',
        fontSize: 16,
        marginBottom: 5
    },
    imagare: {
        width: '64%',
        marginLeft: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
    },
});

export default Period;
