import LupaSearch from '../../../assets/lupa-search.svg'
import { TextInput, TextInputProps } from "react-native";
import { styles } from './styles';

export function TextArea({...rest}: TextInputProps) {
    return(
        <TextInput 
            style={styles.TextInput}
            {...rest}
        />
    )
}