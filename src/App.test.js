/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
