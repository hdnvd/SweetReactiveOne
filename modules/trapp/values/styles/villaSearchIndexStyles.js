import {Dimensions, StyleSheet} from 'react-native';
import Localization from '../../../../classes/Localization';

let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        topImage:
            {
                height: Window.width * 0.5,
                width: Window.width,
            },
    }
);
