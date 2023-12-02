import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Paragraph from '../components/Paragraph'
import { Navigation } from '../types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme';
import LoadingScreen from './LoadingScreen';
import { createNote, deleteNote, fetchNoteById, fetchNotes } from '../service/service';
import BackButton from '../components/BackButton';
import { DefaultField, ResponseNoteData } from '../types/types';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


type Props = {
    navigation: Navigation;
}

const NotePageScreen = ({ navigation }: Props) => {

  const noteId = Number(navigation.getParam('id'))

  const [loading, setLoading] = useState<boolean>(true);
  const [noteTitle, setNoteTitle] = useState<DefaultField>({ value: '', error: '' });
  const [noteBody, setNoteBody] = useState<DefaultField>({ value: '', error: '' });
  const [noteData, setNoteData] = useState<ResponseNoteData>()

  const onFetchNote = async () => {
    try {
      const {status, data} = await fetchNoteById(noteId);
      if (status === 200) {
        setNoteData(data)
      } else {
        console.error('Note fetching failed')
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  const onSave = async () => {
    const createBody = {title: noteTitle.value ,body : noteBody.value}
    try {
      const {status} = await createNote(createBody);
      status === 200
      ? console.log('Note created successfully') : console.error('Failed to create note');
      }
     catch (error) {
      console.error('Error creating data:', error);
    }
    onFetchNote()
  }

  const onDelete = async () => {
    try {
      const {status} = await deleteNote(noteId);
      status === 200
      ? console.log('Note deleted successfully') : console.error('Failed to delete note');
      }
     catch (error) {
      console.error('Error deleting data:', error);
    }
    onFetchNote()
  }

  useEffect(() => {
    onFetchNote()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

    return (
      ( loading ? 
        (<LoadingScreen />) :
        <Background>
          <BackButton goBack={() => navigation.navigate('NotePagesScreen')} />
          {!!noteId ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 }}>
            <Header>
            Note ID: {noteId}
            </Header>
            <IconButton
              icon="delete"
              iconColor={"#cc0001"}
              onPress={onDelete}
            />
          </View>
            ) : (
            <Header>
              Create Note
            </Header>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Title</Text>
          </View>
          <TextInput
            label="Enter your note title"
            defaultValue={noteData?.title}
            returnKeyType="next"
            multiline
            value={noteTitle.value}
            onChangeText={text => setNoteTitle({ value: text, error: '' })}
            error={!!noteTitle.error}
            errorText={noteTitle.error}
            disabled={!!noteId}
          />
          <View style={styles.row}>
            <Text style={styles.label}>Description</Text>
          </View>
          <TextInput
            label="Enter your note"
            defaultValue={noteData?.body}
            returnKeyType="done"
            multiline
            value={noteBody.value}
            onChangeText={text => setNoteBody({ value: text, error: '' })}
            error={!!noteBody.error}
            errorText={noteBody.error}
            disabled={!!noteId}
          />
          {!noteId && <Button mode="contained" onPress={onSave}>
            SAVE
          </Button>}
      {!!noteId && (
        <>
          <Button mode="contained" onPress={() => navigation.navigate('CommentScreen')}>
            <Icon name="plus" size={16} color={theme.colors.white} style={styles.btnPlusContainer} />
               {" Add Comment"}
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('CommentScreen', {noteId, commendId:1})}>
            <Paragraph>comment#1</Paragraph>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CommentScreen', {noteId, commendId:2})}>
            <Paragraph>comment#2</Paragraph>
          </TouchableOpacity>

        </>
      )}
      </Background>
      )
    );

};

const styles = StyleSheet.create({
  //--------------------อันนี้ใช้---------------------------------
  label: {
    flexDirection: 'row',
    textAlign: 'left',
    color: theme.colors.secondary,
  },

  row: {
    marginTop: 4,
    textAlign: 'left'
  },

  button: {
    marginTop: 24,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

  //-----------------------------------------------------

  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },

  btnPlusContainer: {
    position: 'relative',
    left: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  tableContainer: {
     flex: 1,
     width: '55%',
     padding: 16, 
     paddingTop: 30, 
     backgroundColor: '#fff'},
     head: { 
      backgroundColor: '#f1f8ff' },
      text: { margin: 6 }
});

export default memo(NotePageScreen);
