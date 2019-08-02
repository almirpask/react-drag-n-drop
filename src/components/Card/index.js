import React, { useRef, useContext } from 'react'

import BoardContext from '../Board/context'
import { useDrag, useDrop} from "react-dnd";
import  { Container, Label } from './styles';

export default function Header({ data, index, listIndex }) {
  const ref = useRef()
  const { move } = useContext(BoardContext);

  const [{isDragging}, dragRef] = useDrag({
    item: { type: 'CARD', index, id: data.id, content: data.content, listIndex},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor)  {
      const draggedListIndex = item.listIndex
      const targetListIndex = listIndex;
      const draggedIndex = item.index;
      const targetIndex =  index
      if(draggedIndex === targetIndex && draggedListIndex === targetListIndex){
         return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const graggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && graggedTop  < targetCenter) {
        return;
      }
      if (draggedIndex > targetIndex && graggedTop  > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex)

      item.index = targetIndex;
    }
  })

  dragRef(dropRef(ref))
  return(
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label color={label} key={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && (
        <img src={data.user} alt=""/>
      )}      
    </Container>
  )
}