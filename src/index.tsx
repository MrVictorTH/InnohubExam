import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  NotePagesScreen,
  NotePageScreen,
  CommentScreen,
  LoadingScreen
} from './screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    NotePagesScreen,
    NotePageScreen,
    CommentScreen,
    LoadingScreen
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
