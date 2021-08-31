import React from 'react'
import AdminLogin from '../components/AdminPage/AdminLogin'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

// const mockLogin = jest.fn()

describe('it should render correctly', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router>
        <AdminLogin />
      </Router>
    )
  })
  test('render  status', () => {
    const username = screen.getByTestId('username')
    expect(username).toBeInTheDocument()
  })

  test('render iFg', () => {
    const img = screen.getByTestId('img')
    expect(img).toBeInTheDocument()
  })

  test('render  password', () => {
    const password = screen.getByTestId('password')
    expect(password).toBeInTheDocument()
  })
  test('render  login header', () => {
    const loginHeader = screen.getByTestId('loginHeader')
    expect(loginHeader).toBeInTheDocument()
  })
  test('not redirect to admin page', async () => {
    const loginButton = screen.getByTestId('loginbutton')
    fireEvent.click(loginButton)
    expect(history.pathname).not.toBe('/admins')
  })

  test('should login target value', async () => {
    fireEvent.input(screen.getByTestId('username'), {
      target: {
        value: 'kodluyoruz',
      },
    })
    fireEvent.input(screen.getByTestId('password'), {
      target: {
        value: 'bootcamp109',
      },
    })

    await act(async () => {
      fireEvent.submit(screen.getByTestId('loginbutton'))
    })

    expect(history.location.pathname).toBe('/')
  })
})
