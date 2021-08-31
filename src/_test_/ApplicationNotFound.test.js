import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent,render,screen} from '@testing-library/react';
import ApplicationNotFound from '../components/ApplicationPages/ApplicationNotFound';
import { BrowserRouter as Router } from 'react-router-dom';


describe('it should render correctly', () => {
    const history = createMemoryHistory();
    beforeEach(() => {
       render(
        <Router history={history}>
          <ApplicationNotFound />
        </Router>
    ); 
})  
  test('render notfoundtitle', () => {
    const notfoundtitle = screen.getByTestId('notfoundtitle')
    expect(notfoundtitle).toBeInTheDocument()
  })

  test('render notfoundtitle', () => {
    const notfounddesc = screen.getByTestId('notfounddesc')
    expect(notfounddesc).toBeInTheDocument()
  })
  
  test('not redirect to home button', async () => {
    const homebutton = screen.getByTestId('homebutton');
    fireEvent.click(homebutton);
    expect(history.location.pathname).not.toBe('/admin/basvuru-listesi');
  });
})
