import React, { ReactElement } from 'react'

interface Props {
  image: string;
}

export default function ImageGrid({image}: Props): ReactElement {
  return (
    <div>
      <img src={image} width="100%"></img>
    </div>
  )
}
