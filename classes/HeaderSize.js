import { Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';

export default class HeaderSize
{
    static LANDSCAPE = 'landscape';
    static PORTRAIT = 'portrait';
    static getHeaderHeight = () => {
    let height;
    const orientation = HeaderSize.getOrientation();
    height = HeaderSize.getHeaderSafeAreaHeight();
    height += DeviceInfo.isIPhoneX_deprecated && orientation === HeaderSize.PORTRAIT ? 24 : 0;

    return height;
};

// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
    static getHeaderSafeAreaHeight = () => {
    const orientation = HeaderSize.getOrientation();
    if (Platform.OS === 'ios' && orientation === HeaderSize.LANDSCAPE && !Platform.isPad) {
        return 32;
    }
    return Header.HEIGHT;
};

    static getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return width > height ? HeaderSize.LANDSCAPE : HeaderSize.PORTRAIT;
};
}
