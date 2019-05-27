/// <reference path="../typings/ace-my-order.d.ts" />

import React, { useEffect } from 'react'

import { PreviewsItem } from 'ace-my-order'

interface PreviewPanelProps {
  item: PreviewsItem
}

function PreviewPanel(props: PreviewPanelProps) {
  const { item } = props

  useEffect(() => {
    console.log('effect')
  }, [item])

  return (
    <div>
      <p>{item.title}</p>
    </div>
  )
}

PreviewPanel.whyDidYouRender = true

export default PreviewPanel
