import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import New from '../pages/New';
import CustomDrawer from "../components/CustomDrawer";
const AppDrawer= createDrawerNavigator();

function AppRoutes() {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerStyle = {{
        backgroundColor: "#171717"
      }}
      drawerContentOptions = {{
        labelStyle: {
          fontWeight: 'bold'
        },
        activeTintColor: 'white',
        activeBackgroundColor: '#00b94a',
        inactiveBackgroundColor: 'black',
        inactiveTintColor: '#ddd',
        itemStyle: {
          marginVertical: 5
        }
      }}
    >
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Registrar" component={New} />
      <AppDrawer.Screen name="Perfil" component={Profile} />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;
