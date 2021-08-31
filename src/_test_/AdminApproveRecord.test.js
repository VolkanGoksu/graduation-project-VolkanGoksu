import React from 'react'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'

import { BrowserRouter as Router } from 'react-router-dom'
import AdminApproveRecord from '../components/AdminPage/AdminApproveRecord'



describe('it should render correctly', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <AdminApproveRecord />
      </Router>
    )
  })
  test('render  header title', () => {
    const recordheader = screen.getByTestId('recordheader')
    expect(recordheader).toBeInTheDocument()
  })

  test('not redirect to admin application list', async () => {
    const handleAsnwer = screen.getByTestId('handleAsnwer')
    fireEvent.click(handleAsnwer)
    expect(history.pathname).not.toBe('/admin/basvuru-listesi')
  })
})
