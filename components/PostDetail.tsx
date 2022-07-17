import React from 'react';

import { Post } from '../types/types';

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return <h1>PostDetail</h1>;
};

export default PostDetail;
