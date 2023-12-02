import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { Navigation } from '../types';


type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>
      Welcome
    </Header>
    <Button mode="contained" onPress={() => console.log('Login')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('NotePagesScreen')}
    >
      Go to Note Page
    </Button>
  </Background>
);

export default memo(HomeScreen);
