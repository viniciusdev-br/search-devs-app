import React from 'react';
import {View, Text, TouchableOpacity, Image, TouchableOpacityProps} from 'react-native'
import {styles} from './styles'

type Props = TouchableOpacityProps & {
    avatar_url?: string,
    name?: string,
    login?: string,
    location?: string
}

export function Card({avatar_url,name,login,location, ...rest}: Props) {
    return(
        <View style={styles.containerInput}>
            <TouchableOpacity style={{flex: 1, marginRight: 13}} {...rest}>
                <Image source={{ uri: avatar_url }} style={styles.stretch} />
            </TouchableOpacity>

            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{flexDirection: 'column', flexWrap: 'wrap',fontSize: 40, color: '#FFF'}}>
                    {name}
                </Text>
                <Text style={{fontSize: 10, color: '#FFF'}}>Login</Text>
                <Text style={{fontSize: 14, color: '#FFF', marginBottom: 20}}>{login}</Text>          
                <Text style={{fontSize: 10, color: '#FFF'}}>Address</Text>
                <Text style={{fontSize: 14, color: '#FFF'}}>{location}</Text>  
            </View> 
        </View>
    );
}