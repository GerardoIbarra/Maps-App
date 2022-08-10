import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreens } from '../screens/HomeScreens';
import { permissionsScreen } from '../screens/permissionsScreen';
import React, { useContext } from 'react'
import { PermissionContext } from '../context/PermissionContext';
import { MapScreen } from '../screens/MapScreen';

const Stack  = createStackNavigator();


export const Navigator = () => {

  const {permissions}= useContext(PermissionContext);

  if(permissions.locationState === 'unavailable' ){
    return <HomeScreens />
  }

  return (
    <Stack.Navigator
    initialRouteName='permissionsScreen'
    screenOptions={{
        headerShown:false,
        cardStyle:{
            backgroundColor:'white'
        }
    }}
    >
      {
        (permissions.locationState == 'granted')
        ? <Stack.Screen name="MapScreen" component={MapScreen} />
        : <Stack.Screen name="permissionsScreen" component={permissionsScreen} />
        
      }
  </Stack.Navigator>
  )
}
