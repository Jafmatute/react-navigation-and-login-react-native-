import "react-native-gesture-handler";
import React, { useState, useEffect, useMemo, useReducer } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabsScreen from "./app/navigations/MainTabsScreen";
import { DrawerContent } from "./app/navigations/DrawerContent";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import { AuthContext } from "./app/components/Context";

import BookmarkScreen from "./app/screens/BookmarkScreen";
import SettingScreen from "./app/screens/SettingScreen";
import SupportScreen from "./app/screens/SupportScreen";
import RootStackScreen from "./app/navigations/RootStackScreen";
const Drawer = createDrawerNavigator();

const App = () => {
  //const [isLoading, setIsLoading] = useState(true);
  //const [userToken, setUserToken] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const initialLoginState = {
    isLoading: false,
    userToken: null,
    email: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
        break;
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          email: action.uid,
          isLoading: false,
        };
        break;
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          email: null,
          isLoading: false,
        };
        break;
      case "REGISTER":
        return {
          ...prevState,
          userToken: action.token,
          email: action.uid,
          isLoading: false,
        };
        break;
      default:
        break;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      //setUserToken("josue123");
      //setIsLoading(false);

      const userToken = String(foundUser[0].userToken);
      const email = foundUser[0].email;
      try {
        await AsyncStorage.setItem("userToken", userToken);
      } catch (error) {
        console.log("error asyncStorage_signIn", error);
      }
      console.log("user token", userToken);
      dispatch({ type: "LOGIN", uid: email, token: userToken });
    },
    signOut: async () => {
      //setIsLoading(false);
      //setUserToken(null);

      try {
        await AsyncStorage.removeItem("userToken");
      } catch (error) {
        console.log("error AsyncStorage_singOut", error);
      }
      dispatch({ type: "LOGOUT" });
    },
    SignUp: () => {
      //setUserToken("josue123");
      //setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme((isDarkTheme) => !isDarkTheme);
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (error) {
        console.log("error AsyncStorage_useEffect", error);
      }
      //console.log('user token useEffect', userToken);
      dispatch({ type: "REGISTER", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#08d4c4" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken != null ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="Home" component={MainTabsScreen} />
              <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
              <Drawer.Screen name="Setting" component={SettingScreen} />
              <Drawer.Screen name="Support" component={SupportScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
