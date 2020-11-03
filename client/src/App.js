import './App.css';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore()
const persistor = persistStore(store)
window.store = store;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Home />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
