import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import { Navigation } from '../types';
import LoadingScreen from './LoadingScreen';
import { fetchNotes, fetchProfile } from '../service/service';
import BackButton from '../components/BackButton';
import { ResponseNoteData, ResponseProfileData } from '../types/types';
import { theme } from '../core/theme';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';


type Props = {
    navigation: Navigation;
}

const NotePageScreen = ({ navigation }: Props) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [noteData, setNoteData] = useState<ResponseNoteData[]>()
  const [profileData, setProfileData] = useState<ResponseProfileData>()

  const onFetchNotes = async () => {
    try {
      const {status, data} = await fetchNotes();
      if (status === 200) {
        setNoteData(data)
      } else {
        console.error('Notes fetching failed')
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const onFetchProfile = async () => {
        try {
          const {status, data} = await fetchProfile();
          if (status === 200) {
            setProfileData(data)
          } else {
            console.error('Profile fetching failed')
          }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        useEffect(() => {
            onFetchNotes()
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1500);
          }, []);

    return (
      ( loading ? 
        (<LoadingScreen />) :
        <Background>
          <BackButton goBack={() => navigation.navigate('HomeScreen')} />
                <Header>
                Notes Info
                </Header>
                <Button mode="contained" onPress={() => navigation.navigate('NotePageScreen')}>
            <Icon name="plus" size={16} color={theme.colors.white}/>
               {" Add Note"}
          </Button>
          <Button
                mode="outlined"
                onPress={() => navigation.navigate('NotePageScreen', {id: 1})}
                >
                Note 1
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('NotePageScreen', {id: 2})}
                >
                Note 2
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('NotePageScreen', {id: 3})}
                >
                Note 3
            </Button>
        </Background>
      )
    );

};
export default memo(NotePageScreen);
