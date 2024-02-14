import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routing from './src/navigation';
import NetworkLogger from './src/utils/NetworkLogger';

function App(): React.JSX.Element {
  useEffect(() => {
    Appearance.setColorScheme('light');
    return () => {};
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Routing />
        {__DEV__ && <NetworkLogger />}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
