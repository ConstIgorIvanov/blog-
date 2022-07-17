import React from 'react';

import { Author } from '../types/types';

interface AuthorProps {
  author: Author;
}

const Author: React.FC<AuthorProps> = ({ author }) => {
  return (
    <div>
      <p>{author.name}</p>
      <p>{author.bio}</p>
      <img width="60px" src={author.photo.url}></img>
      <p>Посты этого автора слайдер типо</p>
    </div>
  );
};

export default Author;
