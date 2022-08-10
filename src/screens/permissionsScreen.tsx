import React, { useContext } from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import { PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { BlackButton } from '../components/BlackButton';
import { PermissionContext } from '../context/PermissionContext';

export const permissionsScreen = () => {

    const {checkLocalPermission,permissions,asKlocationPermision} = useContext(PermissionContext)


  return (

    <View style ={styles.container}>
        <Text style={{color:'black',width:250, fontSize:18,textAlign:'center',marginBottom:22}}>
            Se necesita el GPS para el uso de la app
        </Text>
        <BlackButton 
            title='Permiso'
            onPress={asKlocationPermision}
        />
        <Text style={{color:'black',marginTop:20}}>
            {JSON.stringify(permissions,null,5)}
        </Text>
    </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})