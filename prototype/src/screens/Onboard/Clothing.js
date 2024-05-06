import { Modal, Animated, StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import RegularText from '../../component/ui/regular-text'
import react, {useEffect,useRef, useState} from 'react';
import CircleButton from '../../component/ui/buttons/circle-button';
import Success from '../../../src/assets/success.png';
import Fail from '../../../src/assets/fail.png';
import ModalBtn from '../../component/ui/buttons/modal-button';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const {height} = Dimensions.get('window');

export default function Clothing(){
    const etcCompletedTime = useSelector((state) => state.readyTime.etcCompletedTime);

    const [timeLeft, setTimeLeft] = useState();
    const [time, setTime] = useState(Math.floor((etcCompletedTime - new Date().getTime())/(1000)));
    const [isRunning, setIsRunning] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [failModalOpen, setFailModalOpen] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        let interval;
        if (isRunning){
            Animated.timing(animatedValue, {
            toValue: height,
            duration: time * 1000 ,
            useNativeDriver: false,
        
        }).start();
        interval = setInterval(() => {
            setTime((prevTime) => {
                if(prevTime <= 1){
                    clearInterval(interval);
                    setIsRunning(false);
                    autoModalOpen();
                    return 0;
                }
                return prevTime -1;
            })
        }, 1000);
        return () => clearInterval(interval);
        
    }
    }, [isRunning]);
    

    const onPressModalOpen = () => {
        setModalOpen(true);
        setIsRunning(false);
        setTimeLeft(time);
        Animated.timing(animatedValue).stop();
    }

    const autoModalOpen = () => {
        setFailModalOpen(true);
    }
    

    const onPressModalClose = () => {
        setModalOpen(false);
        setFailModalOpen(false);
    }

    const formattedTime = (time) => {
        const hour = Math.floor(time / 3600);
        const remainingSeconds = time % 3600;
        const minute = Math.floor(remainingSeconds / 60);
        const second = remainingSeconds % 60
        
        return `${hour.toString().padStart(2, '0')} : ${minute.toString().padStart(2, '0')} : ${second.toString().padStart(2, '0')}`;
    }

    return(
        <View style={styles.background}>
            <View style={styles.component}>
                <RegularText style={styles.text}>지금은 옷입고</RegularText>
                <RegularText style={styles.text}>준비하는 시간 !</RegularText>
                <RegularText style={styles.text1}>{formattedTime(time)}</RegularText>
                <CircleButton children='완료' color="#7AFFB7" onPress={() => onPressModalOpen()}/>
            </View>
            <Animated.View style={[styles.colorback,{ height: animatedValue.interpolate({inputRange: [0, height],outputRange: [0,height],})}]} />
    
            <Modal animationType='slide' visible = {modalOpen} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalBack}/>
                <View style={styles.modal}>
                    <Image source={Success} style={styles.img}></Image>
                    <RegularText style={styles.modalText}>{time}초 아끼셨네요</RegularText>
                    <ModalBtn style={styles.btn}children='다음' onPress={()=>{onPressModalClose(); navigation.navigate('Moving');}}/>
                </View>
                </View>
            </Modal>
            
            <Modal animationType='slide' visible = {failModalOpen} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalBack}/>
                <View style={styles.modal}>
                    <Image source={Success} style={styles.img}></Image>
                    <RegularText style={styles.modalText}>지각 예정이에요..!</RegularText>
                    <RegularText style={styles.modalText}>서둘러 주세요.</RegularText>
                    <ModalBtn style={styles.btn}children='다음' onPress={()=>{onPressModalClose(); navigation.navigate('Moving');}}/>
                </View>
                </View>
            </Modal>
            
            
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
        backgroundColor: "#7AFFB7",
        width:'100%',
        zIndex: 1
    },
    text: {
        fontFamily: 'Pretendard-Bold',
        
    },
    text1: {
        fontFamily: 'Pretendard-Bold',
        marginBottom: hScale(300),
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
    modalContainer:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    modalBack:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height: '100%',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        opacity: .6,
        zIndex: 3
    },
    modal: {
        backgroundColor:'#FFFFFF',
        width: wScale(280),
        height: hScale(380),
        justifyContent:'center',
        alignItems:'center',
        borderRadius: wScale(20),
        zIndex: 6,
        opacity: 1,
    },
    modalText: {
        fontFamily:'Pretendard-Bold',
        fontSize: wScale(20)
    },
    img: {
        width: wScale(80),
        height: hScale(80),
        marginTop:hScale(80),
        marginBottom:hScale(20)
    },
    btn: {
        marginTop:hScale(80)
    }
})