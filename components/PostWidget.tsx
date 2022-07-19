import React from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '../services';
import { Category, Post } from '../types/types';
interface PostWidgetI {
  categories?: Category[];
  slug?: string;
}

const PostWidget: React.FC<PostWidgetI> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    if (slug && categories) {
      const newArray = categories.map((category) => category.slug);
      getSimilarPosts(newArray, slug).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="w-full flex mb-4">
          <img
            src={post.featuredimage.url}
            className="align-middle rounded-full h-12 w-12"
            alt={post.title}
            height="60px"
            width="60px"></img>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
