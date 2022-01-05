import React from 'react';
import {View, Text, TouchableOpacity, Image, TouchableOpacityProps} from 'react-native'
import {styles} from './styles'

type Props = TouchableOpacityProps & {
    avatar_url?: string,
    name?: string,
    login?: string,
    location?: string,
    id?: number,
    followers?: number,
    public_repos?: number
}

export function DetailsCard({avatar_url,name,login,location, id, followers, public_repos, ...rest}: Props) {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={{flex: 1, marginRight: 13}} {...rest}>
                <Image source={{ uri: avatar_url }} style={styles.stretch} />
            </TouchableOpacity>

            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{flexDirection: 'column', flexWrap: 'wrap',fontSize: 32, color: '#79838B'}}>
                    {name}
                </Text>
                <Text style={styles.fieldDetailsAsk}>Login</Text>
                <Text style={styles.fieldDetailsAnswer}>{login}</Text>  

                <Text style={styles.fieldDetailsAsk}>Address</Text>
                <Text style={styles.fieldDetailsAnswer}>{location}</Text> 

                <Text style={styles.fieldDetailsAsk}>ID</Text>
                <Text style={styles.fieldDetailsAnswer}>{id}</Text> 

                <Text style={styles.fieldDetailsAsk}>Followers</Text>
                <Text style={styles.fieldDetailsAnswer}>{followers}</Text> 

                <Text style={styles.fieldDetailsAsk}>Public repositories</Text>
                <Text style={styles.fieldDetailsAnswer}>{public_repos}</Text> 
            </View> 
        </View>
    );
}