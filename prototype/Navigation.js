import React from "react";
import "@expo/metro-runtime";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Onboard_1 from "./src/screens/Onboard/onboard-1";
import Onboard_2 from "./src/screens/Onboard/onboard-2";
import SetReadyTimes from "./src/screens/Onboard/set-ready-times";
import Praise from "./src/screens/Onboard/praise";
import Disappoint from "./src/screens/Onboard/disappoint";
import Shower from "./src/screens/Onboard/Shower";
import SliderScreen from "./src/component/features/slider/slider";

const Stack = createStackNavigator();

function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouterName = 'onboard_1'>
                <Stack.Screen options={{ headerShown: false }} name="Onboard_1" component={Onboard_1}/>
                <Stack.Screen options={{ headerShown: false }} name="Onboard_2" component={Onboard_2}/>
                <Stack.Screen options={{ headerShown: false }} name="Praise" component={Praise}/>
                <Stack.Screen options={{ headerShown: false }} name="Disappoint" component={Disappoint}/>
                <Stack.Screen options={{ headerShown: false }} name="set_ready_time" component={SetReadyTimes}/>
                <Stack.Screen options={{ headerShown: false }} name="range_slider" component={SliderScreen}/>
                <Stack.Screen options={{ headerShown: false }} name="Shower" component={Shower}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Navigation;