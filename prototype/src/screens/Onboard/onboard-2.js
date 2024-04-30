import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
export default function Onboard_2() {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [arrival,setArrival] = useState();
    const [departure,setDeparture] = useState();

    const arrivalChange = (event, selectedTime) => {
        setArrival(selectedTime.toLocaleTimeString())
        console.log(arrival)
    }
    const departureChange = (event, selectedTime) => {
        setDeparture(selectedTime.toLocaleTimeString())
        console.log(departure)
    }

    
    return(
        <View style={styles.container}>
            <RegularText style={styles.script}>목표 도착시각 설정</RegularText>
            <DateTimePicker style={styles.picker}value={date} mode={'time'} onChange={arrivalChange} is24Hour={true}/>
            <RegularText style={styles.script}>이동 출발시각 설정</RegularText>
            <DateTimePicker style={styles.picker}value={date} mode='time' onChange={departureChange}is24Hour={true}/>
            <FullSizeButton onPress={() => navigation.navigate('Onboard_1')}children='다음'/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    script:{
        fontWeight:'700',
        marginTop:hScale(75)
    },
    picker:{
        marginTop:hScale(40),
        
    }
})