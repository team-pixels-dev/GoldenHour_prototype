import { StyleSheet, Pressable } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../utils/scaling';
import CustomAnimatedPressable from './animated-pressable';
import RegularText from '../../../component/ui/regular-text'

/**
 * 큰 사이즈의 버튼, 애니메이션과 폰트가 적용됨
 * @param textColor, onPress, disabled
 * @returns 
 */
export default function fullSizeButton({style, textColor = 'black', children, onPress, disabled = false}){
    return (
        <CustomAnimatedPressable style={[styles.base, style, {backgroundColor:disabled?"#EBEBEB":"#FFF500"}]} onPress={onPress} disabled={disabled}>
                <RegularText style={[styles.font, {color:textColor}]}>{children}</RegularText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
      height: hScale(62),
      width: wScale(347),
      backgroundColor: "#FFF500",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:wScale(38.5)
    },
    font: {
        fontSize: wScale(16),
        fontFamily: "Pretendard-Bold",
    }
  });