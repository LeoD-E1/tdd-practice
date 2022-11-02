import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { describe, it, afterEach, expect } from 'vitest'

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const operations = ['+', '-', '*', '/']
const rows = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  [0]
]

const Calculator = () => {
  const [value, setValue] = useState('')

  const createHandleNumber = number => () => setValue(value.concat(number))

  return (
    <>
      <h1>Calculator</h1>
      <input type='text' value={value} readOnly />
      <div role='grid'>
        {
          rows.map((row, i) => (
            <div key={i} role='row'>
              {
                row.map((number) => (
                  <button
                    onClick={createHandleNumber(number)}
                    key={number}
                  >
                    {number}
                  </button>)
                )
              }
            </div>
          ))
        }
        {
          operations.map(operation => (
            <span key={operation}>{operation}</span>
          ))
        }

        <span> = </span>
      </div>
    </>
  )
}

describe('Calculator', () => {
  afterEach(cleanup)
  it('should render', () => {
    render(<Calculator />)
  })

  it('should render title correctly', () => {
    render(<Calculator />)
    screen.getByText('Calculator')
  })

  it('should render numbers', () => {
    render(<Calculator />)
    numbers.forEach(number => {
      screen.getByText(number)
    })
  })

  it('should render 4 rows', () => {
    render(<Calculator />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(4)
  })

  it('should render operations', () => {
    render(<Calculator />)
    operations.forEach(operation => {
      screen.getByText(operation)
    })
  })

  it('should render equal sign', () => {
    render(<Calculator />)
    screen.getByText('=')
  })

  it('should render an input', () => {
    render(<Calculator />)
    screen.getByRole('textbox')
  })

  it('should user input after clicking several numbers', () => {
    render(<Calculator />)

    const one = screen.getByText('1')
    fireEvent.click(one)

    const two = screen.getByText('2')
    fireEvent.click(two)

    const three = screen.getByText('3')
    fireEvent.click(three)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('123')
  })
})
