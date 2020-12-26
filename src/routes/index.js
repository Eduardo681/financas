import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/auth";

function Routes(){
    const {signed, loading} = useContext(AuthContext);
    if(loading){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#131313"/>
        </View>
    } else {
        return (
            signed ? <AppRoutes/>: <AuthRoutes />
        )
    }

}

export default Routes;