/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import ApiRequests from '../Helpers/ApiRequests';
import StorageHelper from '../Helpers/StorageHelper';

const storageHelper = new StorageHelper();

export default class HomePage extends React.Component {
  apiRequests = new ApiRequests();

  constructor(props) {
    super(props);
    this.state = { listLoaded: false };
  }


  async componentDidMount() {
    const usersResponse = await this.apiRequests.getUsers();

    this.setState({
      listLoaded: true,
      users: usersResponse
    });
  }

  SignOutPressed = async () => {
    const { navigation } = this.props;
    await storageHelper.deleteJwtFromStore();
    navigation.navigate('LoginPageRoute');
  }

  static navigationOptions = {
    headerShown: false
  };

  renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.row}>
        <Image source={{ uri: item.imageUrl }} style={styles.pic} />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{ `${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.mblTxt}>Contact</Text>
          </View>
          <View style={styles.msgContainer}>
            <Text style={styles.msgTxt}>{item.jobTitle}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { users, listLoaded } = this.state;

    return (
      <View style={styles.container}>
        <Header
          rightComponent={<Icon type="font-awesome" name="sign-out" color="#ffffff" onPress={() => this.SignOutPressed()} />}
          centerComponent={{ text: '360 Team', style: { color: '#fff' } }}
        />
        {listLoaded && (
          <FlatList
            data={users}
            keyExtractor={(item) => item.userName}
            renderItem={this.renderItem}
          />
        )}

        {!listLoaded && (
          <View style={{ paddingTop: 70 }}>
            <Text>Loading users...</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
