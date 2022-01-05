import { Image, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

import { TextArea } from './src/components/TextArea';
import { ButtonSearch } from './src/components/ButtonSearch'
import { useState, useEffect } from 'react';
import { api } from './src/services/api';
import { Card } from './src/components/Card';

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

      <Card onPress={() => alert("Deu certo jogador, parabéns")} name={user?.name} avatar_url={user?.avatar_url} login={user?.login} location={user?.location}/>

{/*       <View style={styles.containerInput}>
        <TouchableOpacity style={{flex: 1, marginRight: 13}}>
          <Image source={{ uri: user?.avatar_url }} style={styles.stretch} />
        </TouchableOpacity>
        
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{flexDirection: 'column', flexWrap: 'wrap',fontSize: 40, color: '#FFF'}}>
            {user?.name}
          </Text>
          <Text style={{fontSize: 10, color: '#FFF'}}>Login</Text>
          <Text style={{fontSize: 14, color: '#FFF', marginBottom: 20}}>{user?.login}</Text>          
          <Text style={{fontSize: 10, color: '#FFF'}}>Address</Text>
          <Text style={{fontSize: 14, color: '#FFF'}}>{user?.location}</Text>  
        </View>
          
      </View> */}


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
  stretch: {
    width: 166,
    height: 249.15,
    borderRadius: 10
  }
});
