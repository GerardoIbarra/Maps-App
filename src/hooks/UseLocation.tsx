import Geolocation from '@react-native-community/geolocation'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { Location } from '../interface/appinterface';

export const UseLocation = () => {

    const [ hastlocation,sethaslocation ] = useState( false );
    const [ routeLines,setrouteLines ] = useState<Location[]>( [] );

    const [ initialPosition,setinitialposition ] = useState<Location>({
        latitude:0,
        longitude:0
    }); 
    const [ userlocation,setuserlocation ] = useState<Location>({
        latitude:0,
        longitude:0
    }); 
    const WatchId = useRef<number>();
    const IsMounted = useRef(true);

    
    useEffect(() => {
        IsMounted.current = true;
        return () => {
            IsMounted.current = false;
        }

    },[])

    useEffect(() => {
        curreLocation()
            .then( location => {
                if(!IsMounted.current) return;
                setinitialposition(location);
                setuserlocation(location);
                setrouteLines(route=>[...route, location]);
                sethaslocation(true);
            } )

    },[])

    const curreLocation = (): Promise<Location> =>{
        return new Promise((resolve,reject)=>{

                 
            Geolocation.getCurrentPosition(
                ({coords}) => {

                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });

                },
                (err) => reject({ err }),{enableHighAccuracy:true}
            );
        });
    }

    const followUserLocation  = ()  => {
           WatchId.current = Geolocation.watchPosition(
            ({coords}) => {
                if(!IsMounted.current) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }

                setuserlocation(location);

                setrouteLines(route=>[...route, location]);

            },
            (err) => console.log( err ),{enableHighAccuracy:true,distanceFilter:10}
        );
    }

    const stopFollowUserLocation  = ()  => {
        WatchId.current 
        ? Geolocation.clearWatch(WatchId.current) 
        : console.log("sdsdsd");
    }


  return {
    hastlocation,
    initialPosition,
    curreLocation,
    followUserLocation,
    userlocation,
    stopFollowUserLocation,
    routeLines
  }
}
