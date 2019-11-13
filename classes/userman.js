import {AsyncStorage,Alert} from "react-native";
export default class UserMan {
    static SaveToken = (token) => {
        try {
            AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log(error);
        }
    };
};
