import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}



render(<App />, document.getElementById('root'));
