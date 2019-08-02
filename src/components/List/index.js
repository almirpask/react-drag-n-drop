import React from 'react'

import  { Container } from './styles';

import { MdAdd } from 'react-icons/md'

import Card from '../Card'

export default function Header({ data, listIndex }) {
  return(
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="buutton">
            <MdAdd size={12} color="#FFF"/>
          </button>
        )}        
      </header>

      <ul>
        {data.cards.map((card, index) => {
          if(card.id != undefined) {
            return <Card key={card.id} data={card} listIndex={listIndex} index={index}/>
          }
          
        })}
      </ul>
    </Container>
  )
}