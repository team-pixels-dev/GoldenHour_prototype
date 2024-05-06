import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import { useDispatch, useSelector } from 'react-redux';
import { setArrival, setDeparture } from '../../stores/time-select-slice';

export default function Onboard_2() {
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [departure_, setDeparture_] = useState(new Date(new Date().getTime() + (1000*60*60)));
    const [arrival_, setArrival_] = useState(new Date(departure_.getTime() + (1000*60*60)));
    const [isCorrect, setIsCorrect] = useState(true);
    const [buttonText, setButtonText] = useState('다음');

    useEffect(()=>{
        validation();
    },[])


    const arrivalChange = (event, selectedTime) => {
        if (selectedTime){
            // const formattedTime = selectedTime.toLocaleTimeString();
            validation();
            setArrival_(selectedTime);
        }
    }
    const departureChange = (event, selectedTime) => {
        if (selectedTime){
            // const formattedTime = selectedTime.toLocaleTimeString();
            // console.log()
            validation();
            setDeparture_(selectedTime);
        }
    }
    const nextScreen = () => {
        dispatch(setDeparture(departure_.getTime()));
        dispatch(setArrival(arrival_.getTime()));
        navigation.navigate('set_ready_time');
    }

    const validation = () => {
        if(arrival_ <= departure_){
            setIsCorrect(false);
            setButtonText('도착시간이 출발시간보다 빠릅니다.');
        } else if (departure_ <= new Date().getTime()){
            setIsCorrect(false);
            setButtonText('출발시간이 현재시간보다 빠릅니다.');
        } else {
            setIsCorrect(true);
            setButtonText('다음')
        }
    }

    
    return(
        <View style={styles.container}>
            <RegularText style={styles.script}>목표 도착시각 설정</RegularText>
            <DateTimePicker style={styles.picker} value={arrival_} mode={'time'} onChange={arrivalChange} is24Hour={true}/>
            <RegularText style={styles.script}>이동 출발시각 설정</RegularText>
            <DateTimePicker style={styles.picker} value={departure_} mode='time' onChange={departureChange}is24Hour={true}/>
            <FullSizeButton onPress={nextScreen} style={[styles.button, {color:'red'}]} disabled={!isCorrect}>{buttonText}</FullSizeButton>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    script:{
        marginTop:hScale(75),
        fontFamily:'Pretendard-Bold',
        fontSize:hScale(25)
    },
    picker:{
        marginTop:hScale(40),
        
    },
    button:{
        position:'absolute',
        bottom:hScale(75)
    }
})