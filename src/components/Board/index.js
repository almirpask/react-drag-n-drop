import React, { useState } from 'react'
import produce from 'immer'
import {  loadLists } from '../../services/api'
import List from '../List'
import  { Container } from './styles';
import boardContext from "./context";
const data = loadLists()
export default function Header() {
  const [lists, setLists] = useState(data);
  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);

    }))
  }
  return(
    <boardContext.Provider value={{lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} listIndex={index} data={list}/>)}
      </Container>
      </boardContext.Provider>
  )
}