import React from 'react'
import ApplicationForm from '../components/ApplicationPages/ApplicationForm'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'

describe('its should render correctly', () => {
  beforeEach(() => {
    render(
      <Router>
        <ApplicationForm />
      </Router>
    )
  })
  test('render  name input', () => {
    const name = screen.getByTestId('name')
    expect(name).toBeInTheDocument()
  })
  test('render  name input', () => {
    const labeldesc = screen.getByTestId('labeldesc')
    expect(labeldesc).toBeInTheDocument()
  })

  test('render  age input', () => {
    const age = screen.getByTestId('age')
    expect(age).toBeInTheDocument()
  })

  test('not redirect to admin application list', async () => {
    const formbutton = screen.getByTestId('formbutton')
    fireEvent.click(formbutton)
    expect(history.pathname).not.toBe('/admin/basvuru-listesi')
  })

  test('not redirect to admin page', async () => {
    const formbutton = screen.getByTestId('formbutton')
    expect(formbutton).toBeInTheDocument()
  })
})
