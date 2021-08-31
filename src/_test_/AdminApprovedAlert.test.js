import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent,render,screen} from '@testing-library/react';
import AdminApprovedAlert from '../components/AdminPage/AdminApprovedAlert';
import { BrowserRouter as Router } from 'react-router-dom';


describe('it should render correctly',()=>{
    const history = createMemoryHistory();
    beforeEach(() => {
       render(
        <Router history={history}>
          <AdminApprovedAlert />
        </Router>
    ); 
    })
    test('render svg',()=>{
        const svg = screen.getByTestId('svg');
        expect(svg).toBeInTheDocument();
    })

    test('render succesMessage',()=>{
        const succesMessage = screen.getByTestId('succesMessage');
        expect(succesMessage).toBeInTheDocument();
    })

    test('not redirect to admin page', async () => {
        const alertbutton = screen.getByTestId('alertbutton');
        fireEvent.click(alertbutton);
        expect(history.location.pathname).not.toBe('/admin/basvuru-listesi');
      });
      
})