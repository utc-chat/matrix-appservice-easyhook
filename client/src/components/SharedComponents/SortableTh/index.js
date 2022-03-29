import React, { useState, useEffect } from 'react'

import SortNormalImg  from '../../../assets/images/sort_both.png'
import SortAscImg     from '../../../assets/images/sort_asc.png'
import SortDescImg    from '../../../assets/images/sort_desc.png'

const SortableTh = (props) => {

  const [selectedImg, setSelectedImg] = useState(SortNormalImg)
  useEffect(() => {
    if (props.current.key === props.value) {
      if (props.current.value === 'asc')
        setSelectedImg(SortAscImg)
      else if (props.current.value === 'desc')
        setSelectedImg(SortDescImg)
      else setSelectedImg(SortNormalImg)
    }else if (props.current.key !== props.value)
      setSelectedImg(SortNormalImg)    
  }, [props])

  return (
    <th className="sortable-th">
      <span className="order-th" onClick={() => props.handleClick()}>
        {props.title}
        <img src={selectedImg} alt="sort" style={{"marginLeft": "10px"}}/>
      </span>      
    </th>
  )
}

export default SortableTh;