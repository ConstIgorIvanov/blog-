import Image from 'next/image';
import React from 'react';

import { Author } from '../types/types';

interface AuthorProps {
  author: Author;
}

const Author: React.FC<AuthorProps> = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          alt={author.name}
          src={author.photo.url}
          unoptimized
          height="100px"
          width="100px"
          className="align-middle rounded-full"
        />
      </div>
      <h3 className="text-white text-xl font-bold my-4">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
