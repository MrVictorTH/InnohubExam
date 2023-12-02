import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import TextInput from '../components/TextInput';
import { Navigation } from '../types';
import { StyleSheet, View } from 'react-native';
import { theme } from '../core/theme';
import LoadingScreen from './LoadingScreen';
import { Card } from '@rneui/themed';
import { createComment, deleteComment, fetchCommentById } from '../service/service';
import { DefaultField, ResponseCommentData } from '../types/types';
import { Button, IconButton } from 'react-native-paper';


type Props = {
    navigation: Navigation
}

const CommentScreen = ({ navigation }: Props) => {

  const commendId = Number(navigation.getParam('commendId'))
  const noteId = Number(navigation.getParam('noteId'))

  const [loading, setLoading] = useState<boolean>(true);
  const [commendData, setCommendData] = useState<ResponseCommentData>()
  const [commentBody, setCommentBody] = useState<DefaultField>({ value: '\n\n\n\n', error: '' });

  const onFetchCommend = async () => {
    try {
      const {status, data} = await fetchCommentById(commendId);
      if (status === 200) {
        setCommendData(data)
      } else {
        console.error('Commend fetching failed')
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  const onSave = async () => {
    const createBody = {noteId ,body : commentBody.value}
    try {
      const {status} = await createComment(createBody);
      status === 200
      ? console.log('Commend created successfully') : console.error('Failed to create Commend');
      }
     catch (error) {
      console.error('Error creating data:', error);
    }
    onFetchCommend()
  }

  const onDelete = async () => {
    try {
      const {status} = await deleteComment(commendId);
      status === 200
      ? console.log('Commend deleted successfully') : console.error('Failed to delete Commend');
      }
     catch (error) {
      console.error('Error deleting data:', error);
    }
    onFetchCommend()
  }

  
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, []);
  


    return (
      ( loading ? 
        (<LoadingScreen />) :
        <Background>
          <BackButton goBack={() => navigation.navigate('NotePageScreen')} />
          {!!commendId ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 }}>
            <Card.Title style={styles.cardTitle}>
            Commend ID: {commendId}
            </Card.Title>
            <IconButton
            style={{marginBottom:20}}
              icon="delete"
              iconColor={"#cc0001"}
              onPress={onDelete}
            />
          </View>
            ) : (
              <Card.Title style={styles.cardTitle}>
              Create commend
              </Card.Title>
          )}
        <Card.Divider/>
        <TextInput
          label="Enter your comment"
          returnKeyType="done"
          multiline
          value={commentBody.value}
          defaultValue={commendData?.body}
          onChangeText={text => setCommentBody({ value: text, error: '' })}
          error={!!commentBody.error}
          errorText={commentBody.error}
          disabled={!!commendId}
        />
        <View style={{position:"relative",alignItems:"center"}}>
        {!commendId && <Button mode="contained" onPress={onSave} style={{marginTop:25}}>
            SAVE
          </Button>}
        </View>
    </Background>)
    );

};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  cardTitle: {
    fontSize: 26,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    paddingVertical: 2,
  },

  btnPlusContainer: {
    position: 'relative',
    left: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
});

export default memo(CommentScreen);

