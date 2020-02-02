/* eslint-disable import/named */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Register from './pages/Register';


const MainNavigator = createStackNavigator(
  {
    LoginPageRoute: { screen: LoginPage },
    HomePageRoute: { screen: HomePage },
    RegisterRoute: { screen: Register }
  },
  {
    initialRouteName: 'LoginPageRoute',
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
