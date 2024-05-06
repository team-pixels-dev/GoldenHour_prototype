import { Modal, Animated, StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import RegularText from '../../component/ui/regular-text'
import react, {useEffect,useRef, useState} from 'react';
import CircleButton from '../../component/ui/buttons/circle-button';
import Success from '../../../src/assets/success.png';
import Fail from '../../../src/assets/fail.png';
import ModalBtn from '../../component/ui/buttons/modal-button';
import { useNavigation } from '@react-navigation/native';

const {height} = Dimensions.get('window');
export default function Moving(){
    const [timeLeft, setTimeLeft] = useState();
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [arrival, setArrival] = useState(true);

    useEffect(() => {
        let interval;
        if (isRunning){
            Animated.timing(animatedValue, {
            toValue: height,
            duration: 28 * 1000 , // 남은 시간 넣어야함. 
            useNativeDriver: false,
        
        }).start();
        interval = setInterval(() => {
            setTime((prevTime) => {
                return prevTime + 1;
            })
        }, 1000);
        return () => clearInterval(interval);
        
    }
    }, [isRunning]);

    const pressDepart = () => {
        setArrival(false);
        setIsRunning(true);
        setTimeLeft(time);
        Animated.timing(animatedValue).stop();
    }

    const formattedTime = (time) => {
        const hour = Math.floor(time / 3600);
        const remainingSeconds = time % 3600;
        const minute = Math.floor(remainingSeconds / 60);
        const second = remainingSeconds % 60
        
        return `${hour.toString().padStart(2, '0')} : ${minute.toString().padStart(2, '0')} : ${second.toString().padStart(2, '0')}`;
    }
    const depart = () => {
        return(
            <View style={styles.BtnView}>
                <Text style={styles.BtnText1}>도착 버튼을</Text>
                <Text style={styles.BtnText2}>눌러주세요</Text>
                <CircleButton children='도착' color="#EDEDED" onPress={() => navigation.navigate('Praise')}/>
            </View>
        )
    }

    return(
        <View style={styles.background}>
            <View style={styles.component}>
                <RegularText style={styles.text}>집에서 도착지로 ~~</RegularText>
                <RegularText style={styles.text1}>{formattedTime(time)}</RegularText>
                {arrival ? <CircleButton children='출발' color="#FFFA7A" onPress={() => pressDepart()}/> : depart()}
            </View>
            <Animated.View style={[styles.colorback,{ height: animatedValue.interpolate({inputRange: [0, height],outputRange: [0,height],})}]} />    
        </View>
    )
    
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        width:'100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column-reverse',
    },
    colorback: {
        backgroundColor: "#FFFA7A",
        width:'100%',
        zIndex: 1
    },
    text: {
        fontFamily: 'Pretendard-Bold',
        
    },
    text1: {
        fontFamily: 'Pretendard-Bold',
        marginBottom: hScale(280),
        marginTop: hScale(20)
    },
    component : {
        position: 'absolute',
        flex: 1,
        bottom:hScale(100),
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },
    
    BtnView: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnText1: {
        fontSize: wScale(15),
        marginBottom: hScale(5),
        fontWeight: '600'
    },
    BtnText2: {
        fontSize: wScale(15),
        marginBottom: hScale(20),
        fontWeight: '600'
    }
})