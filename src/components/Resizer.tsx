import React, { FC, useRef, useEffect } from "react"
import { Column } from ".."

const Resizer: FC<{
    column: Column<any, any, any>
    setColumnsWidth: any
  }> = ({ column, setColumnsWidth }) => {
    // Track the current position of mouse
  
    const x = useRef(0)
    const w = useRef(0)
    const resizerRef = useRef<any>()
  
    useEffect(() => {
      resizerRef.current.addEventListener('mousedown', mouseDownHandler)
  
      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
      }
    }, [])
  
    const mouseDownHandler = function (e: any) {
      // Get the current mouse position
      x.current = e.clientX
  
      const width = resizerRef.current.parentElement.clientWidth
  
      w.current = width
  
      // Attach listeners for document's events
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
    }
  
    const mouseMoveHandler = function (e: any) {
      // Determine how far the mouse has been moved
      const dx = e.clientX - x.current
      // Update the width of column
      setColumnsWidth((cols: any) =>
        cols.map((x: any) => {
          if (x.id === column.id) {
            x.width = w.current + dx

            if (x.width < 5) {
              x.width = 5
            }
          }
          return x
        })
      )
    }
  
    // When user releases the mouse, remove the existing event listeners
    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }
  
    return <div ref={resizerRef} className="dsg-resizer"></div>
  }

  export default Resizer;