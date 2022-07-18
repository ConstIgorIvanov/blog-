import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
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
      <p className="text-white text-lg mb-4">{author.bio}</p>
      <div className="flex flex-nowrap overflow-x-scroll">
        {author.posts.map((post) => (
          <div key={post.slug} className="w-full flex  text-white mb-4">
            <img
              src={post.featuredimage.url}
              className="align-middle rounded-xl"
              alt={post.title}
              height="60px"
              width="60px"></img>
            <div className="ml-4">
              <p className="font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <Link href={`/post/${post.slug}`} className="text-md">
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Author;
