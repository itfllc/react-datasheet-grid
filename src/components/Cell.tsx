import React, { FC, useState } from 'react'
import cx from 'classnames'

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
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
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
      {showTooltip && dataTooltipContent && (
        <div className="custom-tooltip" style={{ left: gutter ? "110%" : "50%", transform: gutter ? "translateY(-50%)" : "translateX(-50%)", top: gutter ? "50%" : "110%"}}>
          {dataTooltipContent}
        </div>
      )}
    </div>
  )
}
