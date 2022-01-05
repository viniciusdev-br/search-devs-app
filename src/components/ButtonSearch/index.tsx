import LupaSearch from '../../../assets/lupa-search.svg'
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from './styles';


export function ButtonSearch({...rest}: TouchableOpacityProps) {
    return(
        <TouchableOpacity style={styles.SearchButton}
            {...rest}
        >
          <LupaSearch />
        </TouchableOpacity>
    )
}