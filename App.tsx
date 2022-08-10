import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { PermisosProvider } from './src/context/PermissionContext';

const AppState=({children}:any)=>{
  return(
    <PermisosProvider>
      {children}
    </PermisosProvider>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <AppState>
      <Navigator />
      </AppState>
    </NavigationContainer>
    )
}
export default App;