import React, {memo} from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import Background from '../components/Background';

const LoadingScreen = () => {
    return (
        <Background>
            <Spinner
                visible={true}
                overlayColor={'#204496'}
                textContent={'Loading...'}
            textStyle={{color: '#fff'}}
            />
        </Background>
      );
}

export default memo(LoadingScreen);