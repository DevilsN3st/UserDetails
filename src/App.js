// import Users from "./components/Users";
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import UsersContainer from './components/UsersContainer'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <UsersContainer />
      </div>
    </Provider>
  );
}

export default App;
