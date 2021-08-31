import React from 'react'
import Application from '../components/ApplicationPages/Application'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

describe('it should render correctly', () => {
  beforeEach(() => {
    render(
      <Router>
        <Application />
      </Router>
    )
  })
  test('render applicationTitle ', () => {
    const applicationTitle = screen.getByTestId('applicationTitle')
    expect(applicationTitle).toBeInTheDocument()
  })
})
