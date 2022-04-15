import React from 'react';
import { ICharacter } from '../../models/Character';

const Character = ({ name, image }: ICharacter) => {
  return (
    <div className={'col-12 col-sm-6 col-md-3'} data-testid={'character'}>
      <div className='bg-white rounded overflow-hidden'>
        <img src={image} alt={name} className={'w-100'} />
        <h6 className={'p-3 m-0'}>{name}</h6>
      </div>
    </div>
  );
};

export default Character;
