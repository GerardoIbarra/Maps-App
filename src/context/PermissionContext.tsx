import { createContext, useEffect, useState } from 'react';
import { check, PERMISSIONS, PermissionStatus, request, openSettings } from 'react-native-permissions';
import React from 'react'
import { AppState, Platform } from 'react-native';

    export interface PermissionState{ 
        locationState:PermissionStatus
    }

    export const PermissionInitState: PermissionState = {
        locationState:'unavailable'
    }

    type permisionContextProps = {
        permissions: PermissionState,
        asKlocationPermision: () => void;
        checkLocalPermission: () => void;
    }

    export const PermissionContext = createContext({} as permisionContextProps);

    export const PermisosProvider = ({children}: any) =>{

        const [permissions,setpermissions]= useState(PermissionInitState);

        useEffect( () => {
            checkLocalPermission();
            
            AppState.addEventListener('change', state=>{
                checkLocalPermission();
            })

        } )

        const asKlocationPermision = async() => {
            let permisosStatus:PermissionStatus;        
            
            if(Platform.OS ==='ios'){
                permisosStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            }
            else{
                permisosStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            }

            if(permisosStatus == 'blocked'){
                openSettings();
            }

            setpermissions({
                ...permissions,
                locationState:permisosStatus
            });
        }

        const checkLocalPermission = async() => {

            let permisosStatus:PermissionStatus;        
            
            if(Platform.OS ==='ios'){
                permisosStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            }
            else{
                permisosStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            }

            setpermissions({
                ...permissions,
                locationState:permisosStatus
            });

        }

        return(
            <PermissionContext.Provider value={{
                asKlocationPermision,
                permissions,
                checkLocalPermission
            }}
            >
                {children}
            </PermissionContext.Provider>
        )
    }