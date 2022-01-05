import { StyleSheet, Text, View, StatusBar, Modal } from 'react-native';

import { TextArea } from './src/components/TextArea';
import { ButtonSearch } from './src/components/ButtonSearch'
import { useState, useEffect } from 'react';
import { api } from './src/services/api';
import { Card } from './src/components/Card';
import { DetailsCard } from './src/components/DetailsCard';

interface UserType {
    avatar_url: string,
    name: string,
    login: string,
    location: string,
    id: number,
    followers: number,
    public_repos: number
} 

interface UserRepoType {
    id: number,
    name: string,
    languages_url: string,
    description: string,
    created_at: string,
    updated_at: string,
    language: string,
    html_url: string,
}

export default function App() {
  const [user, setUser] = useState<UserType>();
  const [repositories, setRespositories] = useState<UserRepoType[]>();
  const [nickname, setNickname] = useState(""); 
  const [sending, setSending] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    api.get("/users/" + nickname)
    .then((response) => {
        setUser(response.data)
        setSending(false);
    })
    .catch((error) => {
        console.log(error)
    });
  }, [sending]); 

  useEffect(() => {
    api.get("/users/" + nickname + "/repos")
    .then((response) => {
      setRespositories(response.data);
      setOpenDetails(false);
    })
    .catch((error) => {
      console.log('Erro encontrado: ' + error);
    });
  }, [openDetails])

  function handleCloseProfileModal() {
    setIsProfileModalOpen(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Text style={styles.header}>Search for a dev on GitHub</Text>

      <View style={styles.containerInput}>
        <TextArea
          autoCapitalize='none' 
          placeholder="Enter a nickname here..." 
          onChangeText={setNickname}
        />
        <ButtonSearch onPress={() => {
          setSending(true);
          setFirstClick(false);
          }
        }/>
      </View>

      <Card 
        onPress={() => {
          setIsProfileModalOpen(true);
          setOpenDetails(true);
        }} 
        name={user?.name} avatar_url={user?.avatar_url} login={user?.login} location={user?.location}
      />

      <Modal
        animationType="slide"
        visible={isProfileModalOpen}
        onRequestClose={handleCloseProfileModal}
      >
        <View style={styles.container}>
          <DetailsCard 
          name={user?.name} avatar_url={user?.avatar_url} login={user?.login} location={user?.location} id={user?.id} followers={user?.followers} public_repos={user?.public_repos} />
        </View>
      </Modal>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1441',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInput: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF'
  },
});
