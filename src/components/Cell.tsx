import React, { FC, useEffect, useState } from 'react'
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
  const [hoverTimeout, setHoverTimeout] = useState<any | null>(null);

  const handleMouseEnter = () => {
    const timeoutId = setTimeout(() => {
      setShowTooltip(true);
    }, 400);
    setHoverTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout); // タイマーをキャンセル
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      // コンポーネントがアンマウントされるときにタイマーをクリア
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
