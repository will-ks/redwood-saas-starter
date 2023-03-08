import { Stepper, StepProps } from '@mantine/core'
import { FC } from 'react'
import { useMedia } from 'react-use'
import theme from 'src/data/theme'

const MultiStepDisplay: FC<{
  activeStepIndex: number
  steps: ({
    label: string
    id: string
  } & StepProps)[]
  onStepClick: (stepId: string) => void
}> = ({ activeStepIndex, steps, onStepClick }) => {
  const isLargeScreen = useMedia(`(min-width: ${theme.breakpoints.sm}px)`)
  return (
    <div
      style={
        isLargeScreen
          ? {}
          : {
              maxWidth: theme.breakpoints.xs,
              margin: 'auto',
            }
      }
    >
      <Stepper active={activeStepIndex} allowNextStepsSelect={false}>
        {steps.map(({ id, label, description, disabled, ...rest }) => (
          <Stepper.Step
            label={isLargeScreen && label}
            description={isLargeScreen && description}
            title={label}
            key={id}
            icon={isLargeScreen ? undefined : <></>}
            onClick={() => onStepClick(id)}
            allowStepSelect={disabled}
            allowStepClick={disabled}
            disabled={disabled}
            {...rest}
          />
        ))}
      </Stepper>
    </div>
  )
}

export default MultiStepDisplay
