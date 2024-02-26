import React from 'react'

type Props = {
  title : string,
  icon? : any
}

function Header({
  title = "",
  icon = <></>
}: Props) {
  return (
    <div className='flex flex-row gap-2 items-center'>
      {icon}
      <p className='text-xl font-semibold text-zinc-100'>{title}</p>
    </div>
  )
}

export default Header