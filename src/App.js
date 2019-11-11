import React, {useState} from 'react';
import Main from './components/Index'

import { IsFinnish, MightBeFinnish, Bullshit } from './hooks/Contexts';

const App= () => {
  const [isFinnish, setFinnish] =useState([])
  const [mightBeFinnish, setMightBeFinnish] =useState([])
  const [isBullshit, setBullshit] =useState([])


  const app = (
    <div className="App">
      <header className="App-header">
        <IsFinnish.Provider value={{isFinnish, setFinnish}}>
          <MightBeFinnish.Provider value={{mightBeFinnish, setMightBeFinnish}}>
            <Bullshit.Provider value={{isBullshit, setBullshit}}>
              <Main />
             
            </Bullshit.Provider>
          </MightBeFinnish.Provider>
        </IsFinnish.Provider>
        
         
      </header>
    </div>
  );
  return app;
}

export default App;
