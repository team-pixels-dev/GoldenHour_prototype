import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { hScale } from '../../utils/scaling';

export default function SetReadyTimes() {
    return(
        <View style={styles.container}>
            <FullSizeButton style={styles.button}>준비시작!</FullSizeButton>
        </View>
    );
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
        
    },
    button:{
        position:'absolute',
        bottom:hScale(75)
    }
})