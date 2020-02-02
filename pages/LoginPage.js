/* eslint-disable no-console */
import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import ApiRequests from '../Helpers/ApiRequests';

export default class LoginPage extends React.Component {
  apiRequests = new ApiRequests();

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  loginButtonPressed = async () => {
    const { username, password } = this.state;
    const { navigation } = this.props;

    const loginResponse = await this.apiRequests.login(username, password);
    if (loginResponse && loginResponse.status === 'ok') {
      navigation.navigate('HomePageRoute');
    } else {
      Alert.alert('Bad credentials');
    }
  }

  static navigationOptions = {
    headerShown: false
  };

  render() {
    const { username, password } = this.state;
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          style={[styles.textInput, { marginTop: 40 }]}
          value={username}
          onChangeText={(newText) => this.setState({ username: newText })}
        />
        <TextInput
          placeholder="Password"
          style={[styles.textInput, { marginVertical: 20 }]}
          onChangeText={(newText) => this.setState({ password: newText })}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() => {
            this.loginButtonPressed();
          }}
          style={[styles.button]}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            height: 40,
            justifyContent: 'center',
            marginBottom: 20
          }}
        >
          <Text style={{ color: '#BDC3C6', fontSize: 15 }}>
            Need Help?
          </Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', color: '#A6A8A9', fontSize: 15 }}>
          Don’t have an account yet ?
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            height: 34,
            justifyContent: 'center'
          }}
          onPress={() => navigate('RegisterRoute')}
        >
          <Text style={{ color: '#0D92CA', fontSize: 15 }}>
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#11B8FF',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
