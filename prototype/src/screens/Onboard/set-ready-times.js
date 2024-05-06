import { Platform, StyleSheet, View } from 'react-native';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { hScale, wScale } from '../../utils/scaling';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { setTotalReadyCompletedTime, setWashingCompletedTime, setEtcCompletedTime} from '../../stores/ready-time-slice';

export default function SetReadyTimes() {

    // 현재시간 ms
    let currentTime = new Date().getTime();
    // 출발시간 ms
    const departure = useSelector((state) => state.time.departure);
    // const totalReadyCompletedTime = useSelector((state) => state.readyTime.totalReadyCompletedTime);
    // const washingCompletedTime = useSelector((state) => state.readyTime.washingCompletedTime);
    // const etcCompletedTime = useSelector((state) => state.readyTime.etcCompletedTime);
    // const spareTime_ = useSelector((state) => state.readyTime.spareTime);
    const dispatch = useDispatch();

    function getTimeString(dateObj){
        return dateObj.getFullYear() + "-" + 
        (dateObj.getMonth()+1) + "-" + 
        dateObj.getDate() + "/" + 
        dateObj.getHours() + ":" + 
        dateObj.getMinutes() + ":" + 
        dateObj.getSeconds();
    }

    // 총 준비시간의 최대값 : 출발시간 - 현재시간
    const [maximumReadyTime, setMaximumReadyTime] = useState(parseInt((departure-currentTime)/(1000*60)));
    const [totalReadyTime, setTotalReadyTime] = useState(parseInt(maximumReadyTime/2)); // 총 준비 시간
    const [maxWashingTime, setMaxWashingTime] = useState(maximumReadyTime);
    const [washingTime, setWashingTime] = useState(0); // 씻는 시간
    const [etcTime, setEtcTime] = useState(0);
    const [spareTime, setSpareTime] = useState(totalReadyTime - washingTime - etcTime); // 여유시간

    const navigation = useNavigation();

    function hapticsFeedback() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    function onChangeTotalReadyTime(val){
        setTotalReadyTime(val);
        hapticsFeedback();
    }
    function onCompleteTotalReadyTime(val){
        // setMaxWashingTime(val);
        setSpareTime(val - washingTime - etcTime);
        hapticsFeedback();
    }
    function onChangeWashingTime(val){
        setWashingTime(val);
        setSpareTime(totalReadyTime - val - etcTime);
        hapticsFeedback();
    }
    function onChangeEtcTime(val){
        setEtcTime(val);
        setSpareTime(totalReadyTime - washingTime - val);
        hapticsFeedback();
    }
    function start(){
        currentTime = new Date().getTime()
        dispatch(setTotalReadyCompletedTime(currentTime + (totalReadyTime*1000*60)));
        dispatch(setWashingCompletedTime(currentTime + (washingTime*1000*60)));
        dispatch(setEtcCompletedTime(currentTime + ((washingTime + etcTime)*1000*60)));
        navigation.navigate('Shower');
        hapticsFeedback();
    }

    const RemainTime = spareTime >= 0 ?
    <RegularText style={styles.timeMarker_child_2}>여유시간:{spareTime}분</RegularText> :
    <RegularText style={[{color:'red'},styles.timeMarker_child_2]}>초과시간:{spareTime*-1}분</RegularText>

    const timeMarker = (value, max) => {
        return (
            <View style={[{marginLeft:value * 230/(max+1)}, styles.timeMarker]}>
                <View style={styles.timeMarker_child_1}>
                    <RegularText style={styles.timeMarker_child_1_child}>{value}분</RegularText>
                </View>
                {RemainTime}
            </View>
        );
    }

    const slider = (boldText, smallText, maximumValue, lowerLimit, upperLimit, value, onValueChang, onSlidingComplete = 0) => {
        return(
            <View style={styles.sliderArea}>
                    <View style={styles.scriptArea}>
                        <RegularText style={styles.boldText}>{boldText}</RegularText>
                        <RegularText style={styles.lightText}>{smallText}</RegularText>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={maximumValue}
                        lowerLimit={lowerLimit}
                        upperLimit={upperLimit}
                        value={value}
                        onValueChange={onValueChang}
                        onSlidingComplete={onSlidingComplete}
                        step={1}
                        minimumTrackTintColor="#FFF500"
                        maximumTrackTintColor="#B4B4B4"
                        thumbTintColor="#FFF500"
                    />
                    {timeMarker(value, maximumValue)}
                </View>
        );
    }

    

    // useEffect(()=>{
    //     setInterval(()=>{
    //         console.log(new Date());
    //     }, 1000)
    // },[])

    return(
        <View style={styles.container}>
            <View style={styles.content}>
                {slider(
                    boldText = "전체 준비 시간",
                    smallText = "10분 정도의 여유시간을 주는게 좋아요", 
                    maximumValue = maximumReadyTime, 
                    lowerLimit = 1,
                    upperLimit = maximumReadyTime,
                    value = totalReadyTime, 
                    onValueChang = (val) => onChangeTotalReadyTime(val), 
                    onSlidingComplete = (val) => onCompleteTotalReadyTime(val)
                )}
                {slider(
                    boldText = "씻는 시간",
                    smallText = "챙겨야 할 준비물은 다 생각하셨나요?",
                    maximumValue = maxWashingTime, 
                    lowerLimit = 0,
                    upperLimit = maximumReadyTime - etcTime,
                    value = washingTime, 
                    onValueChang = (val) => onChangeWashingTime(val), 
                )}
                {slider(
                    boldText = "옷입고 준비하는 시간",
                    smallText = "챙겨야 할 준비물은 다 생각하셨나요?", 
                    maximumValue = maxWashingTime, 
                    lowerLimit = 0,
                    upperLimit = maximumReadyTime - washingTime,
                    value = etcTime, 
                    onValueChang = (val) => onChangeEtcTime(val), 
                )}
            </View>
            <FullSizeButton style={styles.button} onPress={start}>준비시작!</FullSizeButton>
        </View>
    );
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content:{
        height: hScale(706),
        width: Platform.OS === 'ios' ? wScale(290) : wScale(310),
        justifyContent:'center',
        alignItems:'flex-start',
        overflow:'visible'
    },
    sliderArea:{
        marginTop:hScale(45),
    },
    scriptArea:{
        paddingLeft:wScale(5)
    },
    boldText:{
        fontFamily: "Pretendard-Bold",
        fontSize:wScale(24),
    },
    lightText:{
        color:'#767676',
        fontSize:wScale(12),
        marginTop:hScale(10)
    },
    button:{
        position:'absolute',
        bottom:wScale(75)
    },
    slider:{
        // width:wScale(290),
        ...Platform.select({
            ios:{
                width:wScale(290),
            },
            android: {
                // transformOrigin:'20%',
                // transform: [{ scale : 2 }],
                width:wScale(290),
                // marginLeft:(-15),
                height:hScale(40),
                
            }
        }),
    },
    timeMarker:{ // 0 ~ 230
    },
    timeMarker_child_1_child:{
        fontFamily:'Pretendard-SemiBold',
        fontSize:wScale(18),
        lineHeight:hScale(30),
        textAlign:'center'
    },
    timeMarker_child_1:{
        width:wScale(54),
        height:hScale(29),
        borderColor:'#CFCFCF',
        borderRadius:100,
        backgroundColor:'#F9F7F7',
    },
    timeMarker_child_2:{
        fontFamily:'Pretendard-Light',
        fontSize:wScale(10)
    },
})