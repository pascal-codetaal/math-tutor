import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Fragment, useContext, useRef } from 'react'
import { MathContext } from '~/routes/_index'
import { cn } from '~/utils/cn'

/**
 * This function generates a CSS class string for a container based on the total number of columns it should display.
 * It takes two arguments: totalColumns and baseClasses.
 *
 * Example usage:
 *
 * const cssClass = containerClassName(3, "my-base-class ");
 * console.log(cssClass); // Outputs: "my-base-class w-48"
 *
 * In this example, the function generates a CSS class string for a container that should display 3 columns.
 * It appends the appropriate width class to the base classes provided.
 *
 * @param {number} totalColumns - The total number of columns the container should display.
 * @param {string} baseClasses - The base CSS classes to which the width class should be appended. Defaults to an empty string.
 * @returns {string} A CSS class string that includes the appropriate width class for the number of columns.
 */
const getContainerClassName = (
  totalColumns: number,
  baseClasses: string = '',
) => {
  switch (totalColumns) {
    case 1:
      return `${baseClasses}w-16` // 128px
    case 2:
      return `${baseClasses}w-32` // 128px
    case 3:
      return `${baseClasses}w-48` // 192px
    case 4:
      return `${baseClasses}w-64` // 256px
    case 5:
      return `${baseClasses}w-80` // 320px
    case 6:
      return `${baseClasses}w-96` // 384px
    default:
      return `${baseClasses}w-96` // Fallback or for greater than 6 columns
  }
}

// In your JavaScript file
const colors = [
  'yellow-500',
  'green-500',
  'blue-500',
  'cyan-500',
  'fuchsia-500',
]

const PositionedIcon = ({ children }) => (
  <div className="relative h-0">
    <div className="absolute bottom-full -mb-7 -translate-x-full bg-white p-2  first-letter:transform">
      {children}
    </div>
  </div>
)

const UnitIndicators = ({
  numberOfItems = 5,
  totalColumns,
}: {
  numberOfItems: number
  totalColumns: number
}) => {
  const topItems = ['E', 'T', 'H', 'D', 'TD', 'HD', 'M'].slice(
    0,
    numberOfItems + 1,
  )

  return Array.from({ length: totalColumns }, (_, index) => (
    <div
      key={index}
      className={`flex  items-center justify-center p-4 bg-${colors[index]} rounded-lg font-bold	text-white`}
    >
      {topItems[index]}
    </div>
  ))
}

const HelpFieldItem = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className="flex items-center justify-center rounded-full border-2 p-2"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        style={{ direction: 'ltr' }}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        className="h-8 w-8 rounded-full border-none p-0 text-center text-sm" // Adjusted classes
      />
    </div>
  )
}

const HelpFields = ({ totalColumns }: { totalColumns: number }) => {
  return Array.from({ length: totalColumns }, (_, index) => (
    <HelpFieldItem key={index} />
  ))
}

/**
 * Performs multiplication in a step-by-step process emulating manual multiplication.
 * Each step multiplies the firstMultiplier with a single digit of the secondMultiplier,
 * then appends the appropriate number of trailing zeros based on the digit's position.
 *
 * @param {number} firstMultiplier - The first number to multiply.
 * @param {number} secondMultiplier - The second number to multiply, can have any number of digits.
 * @returns {string[]} An array of strings representing each step's product with trailing zeros,
 *                     ordered from the least significant to the most significant digit of the secondMultiplier.
 */
function multiplyWithSteps(firstMultiplier: number, secondMultiplier: number) {
  const secondMultiplierString = secondMultiplier.toString()
  const stepSolutions = []

  // Iterate over each digit from right to left (from least significant digit to most significant)
  for (let i = secondMultiplierString.length - 1; i >= 0; i--) {
    const digit = parseInt(secondMultiplierString[i], 10)
    const stepResult = firstMultiplier * digit
    const zerosToAdd = secondMultiplierString.length - 1 - i // The number of trailing zeros depends on the position of the digit
    const stepSolution = Number(stepResult + '0'.repeat(zerosToAdd))

    // when Stepsolution is 0, we need to add trailing zeros
    if (stepSolution === 0) {
      stepSolutions.push('0'.repeat(firstMultiplier.toString().length))
    } else {
      stepSolutions.push(stepSolution)
    }
  }

  // Returning an array of step solutions, but you can format it as needed
  return stepSolutions
}

export const MultiplyComponent = ({
  firstMultiplier,
  secondMultiplier,
}: {
  firstMultiplier: number
  secondMultiplier: number
}) => {
  const solution = firstMultiplier * secondMultiplier + ''

  const stepSolutions = multiplyWithSteps(firstMultiplier, secondMultiplier)

  const totalColumns = solution.toString().length
  const containerClassName = cn(
    `grid grid-cols-${totalColumns} gap-2`,
    getContainerClassName(totalColumns),
  )

  return (
    <div className="card mb-4 flex pr-16">
      {/* Flex container with vertical center alignment and some spacing */}
      <div className="ml-auto">
        <div
          style={{ direction: 'rtl' }}
          className={cn(containerClassName, 'mb-2')}
        >
          <HelpFields totalColumns={totalColumns} />
        </div>
        <div style={{ direction: 'rtl' }} className={containerClassName}>
          <UnitIndicators
            numberOfItems={totalColumns}
            totalColumns={totalColumns}
          />
        </div>

        <div
          style={{ direction: 'rtl' }}
          className={cn(containerClassName, 'mt-2')}
        >
          <MultiplicandStepDisplayRow
            key={'first'}
            solution={firstMultiplier}
            totalColumns={totalColumns}
            dynamic={true}
          />
        </div>
        <PositionedIcon>
          <XCircleIcon
            style={{ height: '2rem', width: '2rem' }}
            className="h-8 w-8 flex-none text-gray-400"
          />{' '}
        </PositionedIcon>
        <div
          style={{ direction: 'rtl' }}
          className={cn(containerClassName, 'mt-2')}
        >
          <MultiplicandStepDisplayRow
            key={'second'}
            solution={secondMultiplier}
            totalColumns={totalColumns}
            dynamic={true}
          />
        </div>

        {stepSolutions?.length > 1 && (
          <>
            <div
              style={{ direction: 'rtl' }}
              className={cn(containerClassName, 'mt-2 border-t-4 border-black')}
            ></div>
            {stepSolutions.map((solution, index) => (
              <Fragment key={`${index}-${solution}`}>
                <div
                  style={{ direction: 'rtl' }}
                  className={cn(containerClassName, 'mt-2')}
                >
                  <MultiplicandStepDisplayRow
                    key={`${index}-${solution}`}
                    totalColumns={totalColumns}
                    solution={solution}
                    dynamic={false}
                  />
                </div>
                {index < stepSolutions.length - 1 && (
                  <PositionedIcon>
                    <PlusCircleIcon
                      style={{ height: '2rem', width: '2rem' }}
                      className="h-8 w-8 flex-none text-gray-400"
                    />
                  </PositionedIcon>
                )}
              </Fragment>
            ))}
          </>
        )}
        <div
          style={{ direction: 'rtl' }}
          className={cn(
            containerClassName,
            'mt-2 border-t-4 border-double border-black',
          )}
        ></div>
        <div
          style={{ direction: 'rtl' }}
          className={cn(containerClassName, 'mt-2')}
        >
          <MultiplicandStepDisplayRow
            totalColumns={totalColumns}
            solution={solution}
            dynamic={false}
          />
        </div>
      </div>
      <div className="calculus h-64 w-12 border-2 p-4">
        {' '}
        {/* New div with a border and padding */}
        {/* Content of the new div goes here */}
      </div>
    </div>
  )
}

const MultiplicandStepDisplayRow = ({
  totalColumns,
  solution,
  dynamic,
}: {
  totalColumns: number
  solution: string | number
  dynamic: boolean
}) => {
  const solutionArray = solution.toString().split('').reverse()

  const { showSolution } = useContext(MathContext)
  console.log({ showSolution })

  const RenderItem = ({
    value,
    borderColor,
  }: {
    value: string
    borderColor?: string
  }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const color = `border-${borderColor}`
    return (
      <div
        className={`flex items-center justify-center rounded-lg border-2 p-2 ${color}`}
        onClick={() => inputRef.current?.focus()}
      >
        {dynamic ? (
          <span className="text-lg font-bold">{value}</span>
        ) : (
          <input
            type="text"
            ref={inputRef}
            defaultValue={showSolution ? value : ''}
            style={{ direction: 'ltr' }}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className={`w-full border-none p-0 text-center text-lg font-bold ${color}`}
          />
        )}
      </div>
    )
  }
  return (
    <>
      {Array.from({ length: totalColumns }, (_, index) => (
        <RenderItem
          key={index}
          value={solutionArray[index]}
          borderColor={colors[index]}
        />
      ))}
    </>
  )
}
