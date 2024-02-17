import React from 'react'

type Props = {
  title : string
}

function Header({
  title = ""
}: Props) {
  return (
    <div>
      <p className='text-xl font-semibold text-zinc-100'>{title}</p>
    </div>
  )
}

export default Header