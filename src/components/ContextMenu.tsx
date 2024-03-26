import * as React from 'react'
import { FC, useCallback, useRef } from 'react'
import { useDocumentEventListener } from '../hooks/useDocumentEventListener'
import { ContextMenuItem, ContextMenuComponentProps } from '../types'
import { Menu, MenuItem } from '@mui/material'

export const defaultRenderItem = (item: ContextMenuItem) => {
  if (item.type === 'CUT') {
    return <>Cut</>
  }

  if (item.type === 'COPY') {
    return <>Copy</>
  }

  if (item.type === 'PASTE') {
    return <>Paste</>
  }

  if (item.type === 'DELETE_ROW') {
    return <>Delete row</>
  }

  if (item.type === 'DELETE_ROWS') {
    return (
      <>
        Delete rows <b>{item.fromRow}</b> to <b>{item.toRow}</b>
      </>
    )
  }

  if (item.type === 'INSERT_ROW_BELLOW') {
    return <>Insert row below</>
  }

  if (item.type === 'DUPLICATE_ROW') {
    return <>Duplicate row</>
  }

  if (item.type === 'DUPLICATE_ROWS') {
    return (
      <>
        Duplicate rows <b>{item.fromRow}</b> to <b>{item.toRow}</b>
      </>
    )
  }

  return item.type
}

export const createContextMenuComponent =
  (
    renderItem: (item: ContextMenuItem) => JSX.Element = defaultRenderItem
  ): FC<ContextMenuComponentProps> =>
  // eslint-disable-next-line react/display-name
  ({ clientX, clientY, items, close }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const onClickOutside = useCallback(
      (event: MouseEvent) => {
        const clickInside = containerRef.current?.contains(event.target as Node)
        const clickBackdrop = (event.target as HTMLElement).className?.includes(
          'MuiBackdrop-root'
        )

        if (!clickInside || clickBackdrop) {
          close()
        }
      },
      [close]
    )
    useDocumentEventListener('mousedown', onClickOutside)

    return (
      <Menu
        open={true}
        anchorReference="anchorPosition"
        anchorPosition={{ top: clientY, left: clientX }}
        ref={containerRef}
        onClose={close}
      >
        {items.map((item) => (
          <MenuItem key={item.type} onClick={item.action} dense>
            {renderItem(item)}
          </MenuItem>
        ))}
      </Menu>
    )
  }

export const ContextMenu = createContextMenuComponent(defaultRenderItem)

ContextMenu.displayName = 'ContextMenu'
