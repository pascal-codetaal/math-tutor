import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { Button } from 'flowbite-react'
import { createContext } from 'react'
import { RadioItem } from '~/components/form/radio-button'
import { MultiplyComponent } from '~/components/math/multiply'

export const MathContext = createContext({ showSolution: true })

function createMultiplicationExercises(
  numberOfExercises: number,
  {
    minFirstMultiplier,
    maxFirstMultiplier,
    minSecondMultiplier,
    maxSecondMultiplier,
  }: {
    minFirstMultiplier: number
    maxFirstMultiplier: number
    minSecondMultiplier: number
    maxSecondMultiplier: number
  },
) {
  const exercises = []
  for (let i = 0; i < numberOfExercises; i++) {
    const firstMultiplier =
      Math.floor(
        Math.random() * (maxFirstMultiplier - minFirstMultiplier + 1),
      ) + minFirstMultiplier
    const secondMultiplier =
      Math.floor(
        Math.random() * (maxSecondMultiplier - minSecondMultiplier + 1),
      ) + minSecondMultiplier
    exercises.push({ firstMultiplier, secondMultiplier })
  }
  return exercises
}

function getMultiplierRanges(category: string) {
  let ranges

  switch (category) {
    case 'ExE':
      ranges = {
        minFirstMultiplier: 1,
        maxFirstMultiplier: 9,
        minSecondMultiplier: 1,
        maxSecondMultiplier: 9,
      }
      break
    case 'ExTE':
      ranges = {
        minFirstMultiplier: 1,
        maxFirstMultiplier: 9,
        minSecondMultiplier: 10,
        maxSecondMultiplier: 90, // Assuming you want it to be a multiple of 10
      }
      break
    case 'TExTE':
      ranges = {
        minFirstMultiplier: 10,
        maxFirstMultiplier: 90, // Assuming you want it to be a multiple of 10
        minSecondMultiplier: 10,
        maxSecondMultiplier: 90, // Assuming you want it to be a multiple of 10
      }
      break
    case 'HTExTE':
      ranges = {
        minFirstMultiplier: 100,
        maxFirstMultiplier: 900, // Assuming you want it to be a multiple of 100
        minSecondMultiplier: 10,
        maxSecondMultiplier: 90, // Assuming you want it to be a multiple of 10
      }
      break
    case 'HTExHTE':
      ranges = {
        minFirstMultiplier: 100,
        maxFirstMultiplier: 900, // Assuming you want it to be a multiple of 100
        minSecondMultiplier: 100,
        maxSecondMultiplier: 900, // Assuming you want it to be a multiple of 100
      }
      break
    default:
      throw new Error('Invalid category')
  }

  return ranges
}

const ConfigMathExercises = () => {
  return (
    <div className="print:hidden">
      <Form>
        <ul className="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
          <RadioItem
            id="ExE"
            defaultChecked
            name="multiplyType"
            label="Eenheden x eenheden(ExE)"
            value="ExE"
          />
          <RadioItem
            id="ExTE"
            defaultChecked={false}
            name="multiplyType"
            label="Eenheden x tientallen(ExTE)"
            value="ExTE"
          />
          <RadioItem
            id="TExTE"
            defaultChecked={false}
            name="multiplyType"
            label="Tientallen x tientallen(TExTE)"
            value="TExTE"
          />
          <RadioItem
            id="HTxTE"
            defaultChecked={false}
            name="multiplyType"
            label="Honderdtallen x tientallen(HTExTE)"
            value="HTExTE"
          />
          <RadioItem
            id="HTxHT"
            defaultChecked={false}
            name="multiplyType"
            label="Honderdtallen x tientallen(HTExHTE)"
            value="HTExHTE"
          />
          <Button type="submit">Genereer</Button>
        </ul>
      </Form>
    </div>
  )
}

export async function loader({ request }: LoaderFunctionArgs) {
  const multipliers = getMultiplierRanges('TExTE')
  const mathExercises = createMultiplicationExercises(10, multipliers)

  return json({ mathExercises })
}

export default function Multiply() {
  const { mathExercises } = useLoaderData<typeof loader>()
  function splitArray(originalArray, chunkSize) {
    const resultArray = []

    for (let i = 0; i < originalArray.length; i += chunkSize) {
      const chunk = originalArray.slice(i, i + chunkSize)
      resultArray.push(chunk)
    }

    return resultArray
  }

  const chunkedArrays = splitArray(mathExercises, 4)

  return (
    <>
      <ConfigMathExercises />
      <MathContext.Provider value={{ showSolution: true }}>
        {chunkedArrays.map((el, i, arr) => {
          return (
            <>
              <div className="c-page c-page--no-print flex flex-wrap content-start items-start">
                {el.map(({ firstMultiplier, secondMultiplier }, index) => {
                  return (
                    <MultiplyComponent
                      key={`${index}-${firstMultiplier}-${secondMultiplier}`}
                      firstMultiplier={firstMultiplier}
                      secondMultiplier={secondMultiplier}
                    />
                  )
                })}
              </div>
              {arr.length - 1 === i ? (
                <></>
              ) : (
                <div className="c-page-breaker js-page-breaker"></div>
              )}
            </>
          )
        })}
      </MathContext.Provider>
    </>
  )
}
