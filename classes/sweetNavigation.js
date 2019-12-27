import {Linking} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import SweetConsole from './SweetConsole';
import {NavigationState} from 'react-native-tab-view';
export default class SweetNavigation {
    /*static _resetNavigationAndNavigate = (navigation,stackName,Destination,params) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [navigation.navigate(stackName, {}, NavigationActions.navigate({ routeName: Destination,params:params  }))],
        });
        return resetAction;
    };*/

    static _resetNavigationAndNavigate = (navigation,stackName,Destination,params) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: stackName,params: {},
                action: NavigationActions.navigate({ routeName: Destination,params:params}),
            })],
        });
        navigation.dispatch(resetAction);
    };
    static _navigateTo(navigation, stackName, routeName, params, reset)
    {
        if(!reset)
            navigation.navigate(stackName, {}, NavigationActions.navigate({ routeName: routeName,params:params }));
        else
            SweetNavigation._resetNavigationAndNavigate(navigation,stackName,routeName,params);
    }
    static navigateToNormalPage(navigation,routeName,params)
    {
        SweetNavigation._navigateTo(navigation,'drawerStack',routeName,params,false)
    }
    static backToNormalPage(navigation,routeName,params)
    {
        console.log('backing to'+routeName);
        SweetNavigation._navigateTo(navigation,'drawerStack',routeName,params,false)
    }
    static resetAndNavigateToNormalPage(navigation,routeName,params)
    {
        SweetNavigation._navigateTo(navigation,'drawerStack',routeName,params,true)
    }
    static navigateToNoDrawerPage(navigation,routeName,params)
    {
        SweetNavigation._navigateTo(navigation,'loginStack',routeName,params,false)
    }
    static resetAndNavigateToNoDrawerPage(navigation,routeName,params)
    {
        SweetNavigation._navigateTo(navigation,'loginStack',routeName,params,true)
    }
    static getKeyToGoBackToRouteName(
        state: NavigationState,
        routeName: string
    ) {
        // reverse the routes so we go back to the most recent route with name=RouteName
        const reversedRoutes = state.routes.slice(0).reverse();

        const index = reversedRoutes.findIndex(r => {
            return (
                // Check if the route is the one we want
                r.routeName === routeName ||
                // Or if this is a nested Navigator route, recursively check to see if
                // its children match
                !!(r.routes && SweetNavigation.getKeyToGoBackToRouteName(r, routeName))
            );
        });

        // If we didn't find the route, then return immediately
        if (index === -1) return null;

        // We want the key of the route _after_ routeName so that when we go back from
        // key, we are at routeName
        // Since we have reversed the routes, later routes have smaller indices
        const route = reversedRoutes[index - 1];
        return route ? route.key : null;
    }
    static openURL = (URL) => {
        Linking.canOpenURL(URL).then(supported => {
            if (supported) {
                Linking.openURL(URL);
            } else {
                SweetConsole.log("Don't know how to open URI: " + URL);
            }
        });
    };
};
