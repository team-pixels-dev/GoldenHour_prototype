import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import { useDispatch, useSelector } from 'react-redux';
import { setArrival, setDeparture } from '../../stores/time-select-slice';

export default function Onboard_2() {
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date(1598051730000));
    const arrival = useSelector((state) => state.time.arrival);
    const departure = useSelector((state) => state.time.departure);


    const arrivalChange = (event, selectedTime) => {
        if (selectedTime){
            const formattedTime = selectedTime.toLocaleTimeString();
            dispatch(setArrival(formattedTime))
        }
    }
    const departureChange = (event, selectedTime) => {
        if (selectedTime){
            const formattedTime = selectedTime.toLocaleTimeString();
            dispatch(setDeparture(formattedTime))
        }
    }

    
    return(
        <View style={styles.container}>
            <RegularText style={styles.script}>목표 도착시각 설정</RegularText>
            <DateTimePicker style={styles.picker}value={date} mode={'time'} onChange={arrivalChange} is24Hour={true}/>
            <RegularText style={styles.script}>이동 출발시각 설정</RegularText>
            <DateTimePicker style={styles.picker}value={date} mode='time' onChange={departureChange}is24Hour={true}/>
            <FullSizeButton onPress={() => navigation.navigate('Praise')}children='다음'/>
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
        marginTop:hScale(75),
        fontFamily:'Pretendard-Bold',
        fontSize:hScale(25)
    },
    picker:{
        marginTop:hScale(40),
        
    }
})