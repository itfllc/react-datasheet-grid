import React, { FC } from 'react'
import cx from 'classnames'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import { TooltipProps, styled, tooltipClasses } from '@mui/material'

const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: 14,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.error.main,
  },
}))

export const Cell: FC<{
  gutter: boolean
  stickyRight: boolean
  disabled?: boolean
  className?: string
  active?: boolean
  children?: any
  width: number
  left: number
  dataTooltipContent?: string
  errorPlacement?: TooltipProps['placement']
}> = ({
  children,
  gutter,
  stickyRight,
  active,
  disabled,
  className,
  width,
  left,
  dataTooltipContent,
  errorPlacement,
}) => {
  return (
    <ErrorTooltip title={dataTooltipContent} placement={errorPlacement} arrow>
      <div
        className={cx(
          'dsg-cell',
          gutter && 'dsg-cell-gutter',
          disabled && 'dsg-cell-disabled',
          gutter && active && 'dsg-cell-gutter-active',
          stickyRight && 'dsg-cell-sticky-right',
          className
        )}
        style={{
          width,
          left: stickyRight ? undefined : left,
        }}
      >
        {children}
      </div>
    </ErrorTooltip>
  )
}
