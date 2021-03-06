import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Image, Icon, Input } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const SignUpScreen = ({ navigation }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { colors } = useTheme();
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] = useState(
    false
  );
  const [data, setData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    checkInput: false,
    securityPassword: true,
  });
  const inputChangeEmail = (e) => {
    //console.log(e);
    if (e.length > 0) {
      setData({
        ...data,
        email: e,
        checkInput: true,
      });
    } else {
      setData({
        ...data,
        email: e,
        checkInput: false,
      });
    }
  };
  const handlePassword = (e) => {
    console.log(e);
    if (e.length > 0) {
      setData({
        ...data,
        password: e,
      });
    }
  };

  const handlePasswordConfirm = (e) => {
    console.log(e);
    if (e.length > 0) {
      setData({
        ...data,
        passwordConfirm: e,
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.tex_footer, { color: colors.text }]}>Email</Text>
        <View style={styles.action}>
          <Input
            //placeholder="Ingrese su email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(e) => inputChangeEmail(e)}
            leftIcon={{
              type: "material-community",
              name: "account-check-outline",
              size: 20,
              color: colors.text,
            }}
            rightIcon={
              data.checkInput ? (
                <Animatable.View animation="bounceIn">
                  <Icon
                    type="material-community"
                    name="checkbox-marked-circle-outline"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
              ) : null
            }
          />
        </View>
        <Text style={[styles.tex_footer, { color: colors.text }]}>
          Password
        </Text>
        <View style={styles.action}>
          <Input
            //placeholder="Ingrese su password"
            secureTextEntry={isVisiblePassword ? false : true}
            onChangeText={(e) => handlePassword(e)}
            style={styles.textInput}
            autoCapitalize="none"
            leftIcon={{
              type: "material-community",
              name: "lock-question",
              size: 20,
              color: colors.text,
            }}
            rightIcon={
              <Icon
                type="material-community"
                name={isVisiblePassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                onPress={() => setIsVisiblePassword(!isVisiblePassword)}
                color={colors.text}
              />
            }
          />
        </View>

        <Text style={[styles.tex_footer, { color: colors.text }]}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Input
            //placeholder="Ingrese su password"
            secureTextEntry={isVisiblePasswordConfirm ? false : true}
            onChangeText={(e) => handlePasswordConfirm(e)}
            style={styles.textInput}
            autoCapitalize="none"
            leftIcon={{
              type: "material-community",
              name: "lock-question",
              size: 20,
              color: colors.text,
            }}
            rightIcon={
              <Icon
                type="material-community"
                name={
                  isVisiblePasswordConfirm ? "eye-off-outline" : "eye-outline"
                }
                size={20}
                color={colors.text}
                onPress={() =>
                  setIsVisiblePasswordConfirm(!isVisiblePasswordConfirm)
                }
              />
            }
          />
        </View>
        <View style={styles.button}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text style={[styles.textSign, { color: "#fff" }]}>Sign Up </Text>
          </LinearGradient>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08d4c4",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  tex_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    //borderBottomWidth: 1,
    //borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    height: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
