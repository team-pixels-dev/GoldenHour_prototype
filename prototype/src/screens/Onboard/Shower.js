import { AppState, Platform, Modal, Animated, StyleSheet,
     View, Image, Dimensions, SafeAreaView } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import RegularText from '../../component/ui/regular-text'
import react, {useEffect,useRef, useState} from 'react';
import CircleButton from '../../component/ui/buttons/circle-button';
import Success from '../../../src/assets/success.png';
import Fail from '../../../src/assets/fail.png';
import ModalBtn from '../../component/ui/buttons/modal-button';
import { useSelector, useDispatch } from 'react-redux';
import {setSavedWashingTime} from '../../stores/ready-time-slice'
import { useNavigation } from '@react-navigation/native';

export default function Shower(){
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current); 

    // 씻기를 완료한 시점(ms)
    const washingCompletedTime = useSelector((state) => state.readyTime.washingCompletedTime);
    // 씻기를 위해 할당된 시간(초)
    const washingTime = useSelector((state) => state.readyTime.washingTime) * 60;
    // 화면이 로드된 시점에서 씻기를 완료하기까지 남은 시간(초)
    const [currentRemainTime, setCurrentRemainTime] = useState(Math.floor((washingCompletedTime - new Date().getTime())/(1000)));
    // 전체 씻기 시간에서 소비한 시간의 비율
    const [washingTimePersent, setWashingTimePersent] = useState(1 - (currentRemainTime/washingTime));

    const [timeLeft, setTimeLeft] = useState();
    // const [time, setTime] = useState(Math.floor((washingCompletedTime - new Date().getTime())/(1000)));
    const [time, setTime] = useState(washingTime);
    const [isRunning, setIsRunning] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [failModalOpen, setFailModalOpen] = useState(false);
    // const [animatedValue, setAnimatedValue] = useState(new Animated.Value(SCREEN_HEIGHT * washingTimePersent));
    // const [animatedValue, setAnimatedValue] = useState(new Animated.Value(SCREEN_HEIGHT * washingTimePersent));
    animatedValue = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const dispatch = useDispatch();

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            console.log('App has come to the foreground!');
            // 앱의 상태가 변경될 시점 기준으로 씻기를 완료하기까지 남은 시간(sec)
            const remain = Math.floor((washingCompletedTime - new Date().getTime())/(1000));
            setCurrentRemainTime(remain);
            const persent = 1 - (remain/washingTime);
            setWashingTimePersent(persent);
            const animeatedValue_ = new Animated.Value(SCREEN_HEIGHT * persent);
            // setAnimatedValue(new Animated.Value(SCREEN_HEIGHT * persent));
            // console.log('남은 시간 : '+ remain);
          }
    
          appState.current = nextAppState;
          setAppStateVisible(appState.current);
          console.log('AppState', appState.current);
        });
    
        return () => {
          subscription.remove();
        };
      }, []);

    
    useEffect(() => {
        // let interval;
        let interval2;
        if (isRunning){
            Animated.timing(animatedValue, {
            toValue: SCREEN_HEIGHT,
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
                return Math.floor((washingCompletedTime - new Date().getTime())/(1000));
            });
        }, 1000);
        // interval2 = setInterval(() => {
        //     const remain = (washingCompletedTime - new Date().getTime())/(1000);
        //     setCurrentRemainTime(remain);
        //     const persent = 1 - (remain/washingTime);
        //     setWashingTimePersent(persent);
        //     setTime((prevTime) => {
        //         if(prevTime <= 1){
        //             clearInterval(interval2);
        //             setIsRunning(false);
        //             autoModalOpen();
        //             return 0;
        //         }
        //         return Math.floor((washingCompletedTime - new Date().getTime())/(1000));
        //     })
        // }, 10);
        return () => {
            clearInterval(interval);
            // clearInterval(interval2);
        }
        
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

    const formattedTime2 = (time) => {
        const minute = Math.floor(time / 60);
        const second = time % 60
        
        return `${minute.toString().padStart(1, '0')} 분 ${second.toString().padStart(1, '0')} 초`;
    }

    const onModalNext = () => {
        if(time > 0){
            dispatch(setSavedWashingTime(time));
        }
        onPressModalClose();
        navigation.navigate('Clothing');
    }

    return(
            <View style={styles.background}>
                <View style={styles.component}>
                    <RegularText style={styles.text}>지금은 씻는 시간 !</RegularText>
                    <RegularText style={styles.text1}>{formattedTime(time)}</RegularText>
                    <CircleButton children='완료' color="#7AF7FF" onPress={() => onPressModalOpen()}/>
                </View>
                <Animated.View style={[styles.colorback,{ height: animatedValue.interpolate({inputRange: [0, SCREEN_HEIGHT],outputRange: [0,SCREEN_HEIGHT],})}]} />
                {/*<View style={[styles.colorback, {height:SCREEN_HEIGHT * washingTimePersent}]} /> */}
                <Modal animationType='slide' visible = {modalOpen} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBack}/>
                    <View style={styles.modal}>
                        <Image source={Success} style={styles.img}></Image>
                        <RegularText style={styles.modalText}>{formattedTime2(time)} 아끼셨네요</RegularText>
                        <ModalBtn style={styles.btn}children='다음' onPress={onModalNext}/>
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
                        <ModalBtn style={styles.btn}children='다음' onPress={onModalNext}/>
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
        // width:'100%',
        // height: '100%',
        alignItems: 'center',
        flexDirection: 'column-reverse',
    },
    colorback: {
        backgroundColor: "#7AF7FF",
        // flex: 1,
        // width:hScale(SCREEN_HEIGHT),
        width: '100%',
        transition: '1s',
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