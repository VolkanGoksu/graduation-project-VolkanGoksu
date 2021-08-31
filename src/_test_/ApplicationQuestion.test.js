import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent,render,screen} from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationQuestion from '../components/ApplicationPages/ApplicationQuestion';


describe('it should render correctly',()=>{
    const history = createMemoryHistory();
    beforeEach(() => {
       render(
        <Router history={history}>
          <ApplicationQuestion />
        </Router>
    ); 
    })
     test('render application Question header',()=>{
         const applicationQuestion = screen.getByTestId('applicationQuestion');
         expect(applicationQuestion).toBeInTheDocument();
     })
     test('render error div',()=>{
         const errorDiv = screen.getByTestId('errorDiv');
         expect(errorDiv).toBeInTheDocument();

     })

   
   
})