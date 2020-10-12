import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from "./App";
import './style.css';
import { useAsync } from "react-async-hook";
import { getStore } from "./logic";




const Switcher: React.FunctionComponent<{scoreToWin: number}> = (props)=>{
  
  const {scoreToWin} = props;
  const asyncStore = useAsync(getStore, [scoreToWin]);
  
  return(
    <div className="app">
      {
        asyncStore.loading ? <h1>Loading...</h1> : <App store={asyncStore.result} />
      }


    </div>

  )
}

render(<Switcher scoreToWin={20}/>, document.getElementById('root'));
