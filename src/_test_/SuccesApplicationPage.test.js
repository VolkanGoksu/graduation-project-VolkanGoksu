import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SuccesApplicationPage from '../components/ApplicationPages/SuccesApplicationPage'

describe('it should render correctly', () => {
  beforeEach(() => {
    render(
      <Router>
        <SuccesApplicationPage />
      </Router>
    )
  })
  test('render infoheader', () => {
    const infoHeader = screen.getByTestId('infoheader')
    expect(infoHeader).toBeInTheDocument()
  })
  test('render succesmessage', () => {
    const succesMessage = screen.getByTestId('infosucces')
    expect(succesMessage).toBeInTheDocument()
  })
})
