import React, { useRef } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { UseLocation } from '../hooks/UseLocation'
import { HomeScreens } from '../screens/HomeScreens';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

// interface Props{
//     Markes?: Marker[];
// }


export const Map = () => {
   
    const [ showPolyline,setshowpolyline ] = useState( true );

    const {hastlocation,
        initialPosition,
        curreLocation,
        followUserLocation,
        userlocation,
        stopFollowUserLocation,
        routeLines
    } = UseLocation();

    const {latitude,longitude}= initialPosition;
    const MapViewRef = useRef<MapView>();
    const Following = useRef<boolean>(true);

    useEffect(()=>{
      followUserLocation();
      return () =>{
        stopFollowUserLocation
    }

    },[])

    useEffect(()=>{
        if( !Following.current) return;
        const {latitude, longitude} =  userlocation;

        MapViewRef.current?.animateCamera({
            center:{latitude,longitude}
        })
      },[userlocation])

    const centerPosition = async() =>{
        const {latitude, longitude} = await curreLocation();

        MapViewRef.current?.animateCamera({
            center:{latitude,longitude}
        })
    }

    if(!hastlocation){
        return <HomeScreens/>
    }

    return (
   <>
     <MapView
        ref ={(el) => MapViewRef.current = el!}
        style={{flex:1}}
        showsUserLocation
        initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}  
        onTouchStart={ () => Following.current = false}
    >
        {
            showPolyline && (
                <Polyline 
                    coordinates={routeLines}
                    strokeColor='black'
                    strokeWidth={3}
                />
            )
        }

        {/* <Marker
                image={ require('../assets/custom-marker.png') }
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title="Esto es un titulo"
                description="Esto es uan descripcion de marcador"
        /> */}

    </MapView>

    <TouchableOpacity
    style = {{width:45,
        height:45,
        backgroundColor:'#f3f1f3',
        position:'absolute',
        borderRadius:100,
        opacity: 0.7,
        alignItems:'center',
        margin: 10
    }}
    onPress={() => setshowpolyline(!showPolyline)}
    > 
        <Image
            source = {require('../assets/pincel.png')}
            style ={{height:30,width:30, top:10,}}
        />
    </TouchableOpacity>
   </>

    )
}
