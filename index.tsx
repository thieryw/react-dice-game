import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from "./App";
import './style.css';
import { useAsync } from "react-async-hook";
import { getStore } from "./logic";

interface AppProps { }
interface AppState {
  name: string;
}

const Switcher: React.FunctionComponent = ()=>{
  
  const asyncStore = useAsync(getStore, []);
  
  return(
    <div>
      {
        asyncStore.loading ? <h1>Loading...</h1> : <App store={asyncStore.result} />
      }


    </div>

  )
}

render(<Switcher/>, document.getElementById('root'));
