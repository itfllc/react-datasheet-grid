import { TooltipProps, styled, tooltipClasses } from '@mui/material'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import cx from 'classnames'
import React, { FC } from 'react'

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
  stickyColumn?: boolean
  disabled?: boolean
  className?: string
  active?: boolean
  children?: any
  width: number
  left: number
  dataTooltipContent?: string
  errorPlacement?: TooltipProps['placement']
  colIndex?: number
}> = ({
  children,
  gutter,
  stickyRight,
  stickyColumn,
  active,
  disabled,
  className,
  width,
  left,
  dataTooltipContent,
  errorPlacement,
  colIndex
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
          stickyColumn && 'dsg-cell-sticky-first',
          className
        )}
        style={{
          width,
          left: stickyRight ? undefined : left,
          transform: stickyColumn ? `translateY(-${(colIndex || 0) > 0 ? ((colIndex || 0) ) * 100 : 0}%)` : "unset"
        }}
      >
        {children}
      </div>
    </ErrorTooltip>
  )
}
