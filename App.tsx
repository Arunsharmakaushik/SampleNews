import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Appearance, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routing from './src/navigation';
import NetworkLogger from './src/utils/NetworkLogger';

function App(): React.JSX.Element {
  useEffect(() => {
    Appearance.setColorScheme('light');
    return () => {};
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationContainer>
          <Routing />
          {__DEV__ && <NetworkLogger />}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
