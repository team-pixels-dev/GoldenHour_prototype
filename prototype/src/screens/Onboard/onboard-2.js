import { Platform, Pressable, StyleSheet, View} from 'react-native';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import { useDispatch, useSelector } from 'react-redux';
import { setArrival, setDeparture } from '../../stores/time-select-slice';
import CustomAnimatedPressable from '../../component/ui/buttons/animated-pressable';

export default function Onboard_2() {
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [departure_, setDeparture_] = useState(new Date(new Date().getTime() + (1000*60*60)));
    const [arrival_, setArrival_] = useState(new Date(departure_.getTime() + (1000*60*60)));
    const [isCorrect, setIsCorrect] = useState(true);
    const [buttonText, setButtonText] = useState('다음');
    const [showDep, setShowDep] = useState(false);
    const [showArr, setShowArr] = useState(false);

    useEffect(()=>{
        validation();
    },[])

    const arrivalChange = (event, selectedTime) => {
        if (selectedTime){
            setArrival_(selectedTime);
            validation(selectedTime, departure_);
            if(showArr) setShowArr(false);
        }
    }
    const departureChange = (event, selectedTime) => {
        if (selectedTime){
            setDeparture_(selectedTime);
            validation(arrival_, selectedTime);
            if(showDep) setShowDep(false);
        }
    }
    const nextScreen = () => {
        if(validation()){
            dispatch(setDeparture(departure_.getTime()));
            dispatch(setArrival(arrival_.getTime()));
            navigation.navigate('set_ready_time');
        }
    }

    const validation = (arrival = arrival_, departure = departure_) => {
        if(arrival <= departure){
            setIsCorrect(false);
            setButtonText('도착시간이 출발시간보다 빠릅니다.');
            return false;
        } else if (departure <= new Date().getTime()){
            setIsCorrect(false);
            setButtonText('출발시간이 현재시간보다 빠릅니다.');
            return false;
        } else {
            setIsCorrect(true);
            setButtonText('다음');
            return true;
        }
    }

    const showMode = (value, onChange) => {
        DateTimePickerAndroid.open({
            value: value,
            onChange,
            mode: 'time',
            display: 'spinner',
            is24Hour: true,
          });
    }

    const getTimeFormat = (date) => {
        let timeString = date.getHours().toString().padStart(2, '0') 
        + ':' + date.getMinutes().toString().padStart(2, '0')  + ' ';
        if (date.getHours() >= 12)
            timeString += 'PM'
        else
            timeString += 'AM'
        return timeString
    }

    const timePicker = (value, onChange, element = '') => {
        if(Platform.OS === 'ios')
            return(
                <DateTimePicker style={styles.picker} value={value} mode='time' display='compact' onChange={onChange} is24Hour={true} view={<View><RegularText>hello</RegularText></View>}/>
            )
        else
            return(
                <CustomAnimatedPressable style={styles.picker} onPress={() => showMode(value, onChange)}><RegularText style={{fontSize:wScale(28)}}>{getTimeFormat(value)}</RegularText></CustomAnimatedPressable>
            );
    }
    
    return(
        <View style={styles.container}>
            <RegularText style={styles.script1}>목표 도착시각 설정</RegularText>
            {timePicker(arrival_, arrivalChange)}
            <RegularText style={styles.script2}>이동 출발시각 설정</RegularText>
            {timePicker(departure_, departureChange)}
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
    script1:{
        fontFamily:'Pretendard-Bold',
        fontSize:hScale(30),
        marginTop:hScale(-45)
    },
    script2:{
        marginTop:hScale(120),
        fontFamily:'Pretendard-Bold',
        fontSize:hScale(30)
    },
    picker:{
        marginTop:hScale(75),
        fontSize:wScale(28),
        ...Platform.select({
            android: {
                width:wScale(150),
                backgroundColor:'#EBEBEB',
                borderRadius:8,
                justifyContent:'center',
                alignItems:'center'
            },
            ios: {
                transform: [{ scale: 1.2, }]
            }
        })
        
        
    },
    button:{
        position:'absolute',
        bottom:hScale(75)
    }
})