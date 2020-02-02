/* eslint-disable no-console */
import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import ApiRequests from '../Helpers/ApiRequests';


export default class Register extends React.Component {
  apiRequests = new ApiRequests();

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: ''
    };
  }

  registerButtonPressed = async () => {
    const { firstName, lastName, userName, password } = this.state;
    const { navigation } = this.props;

    try {
      const registerResponse = await this.apiRequests.register(
        firstName, lastName, userName, password
      );

      if (registerResponse && registerResponse.status) {
        if (registerResponse.status === 'ok') {
          Alert.alert(
            'Registered successfully',
            'Please log in with your new user.',
            [
              { text: 'OK', onPress: () => navigation.navigate('LoginPageRoute') },
            ],
            { cancelable: false },
          );
        } else {
          Alert.alert(registerResponse.status);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not register');
    }
  }

  static navigationOptions = {
    headerShown: false
  };

  render() {
    const { firstName, lastName, userName, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="First name"
          style={[styles.textInput, { marginTop: 40 }]}
          value={firstName}
          onChangeText={(newText) => this.setState({ firstName: newText })}
        />
        <TextInput
          placeholder="Last name"
          style={[styles.textInput, { marginTop: 20 }]}
          value={lastName}
          onChangeText={(newText) => this.setState({ lastName: newText })}
        />
        <TextInput
          placeholder="Username"
          style={[styles.textInput, { marginTop: 20 }]}
          value={userName}
          onChangeText={(newText) => this.setState({ userName: newText })}
        />
        <TextInput
          placeholder="Password"
          style={[styles.textInput, { marginTop: 20 }]}
          value={password}
          onChangeText={(newText) => this.setState({ password: newText })}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() => {
            this.registerButtonPressed();
          }}
          style={[styles.button, { marginTop: 20 }]}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
            Register
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
    // borderColor: 'black',
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
