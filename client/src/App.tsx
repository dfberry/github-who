import './App.css';
import AppRoutes from './Routes';
import { Provider } from "react-redux"
import { store } from './Redux/store';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes></AppRoutes>
      </div>
    </Provider>
  );
}

export default App;
