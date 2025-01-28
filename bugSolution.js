```javascript
import * as React from 'react';
import { Camera, BarCodeScanner } from 'expo-camera';
import { useState, useEffect } from 'react';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeData(data);
    // Add timeout for better detection 
    setTimeout(() => {
      if (barcodeData === null) {
        console.warn('Barcode not detected within timeout. Check Camera settings.');
      } 
    }, 2000);
  };

  if (hasPermission === null) {
    return <View />; // or <Text>Requesting permissions...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
      {barcodeData && <Text>Barcode: {barcodeData}</Text>}
    </View>
  );
}
```