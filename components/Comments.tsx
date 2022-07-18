import React from 'react';
import { getComments } from '../services';
import moment from 'moment';

import { Comment } from '../types/types';
interface CommentsProps {
  slug: string;
}

const Comments: React.FC<CommentsProps> = ({ slug }) => {
  const [comments, setComments] = React.useState<Comment[]>([]);

  console.log(comments);
  React.useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">{comments.length} Comments</h3>
          {comments.map((comment, index: number) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="text-gray-600 pr-4 break-words max-h-44 overflow-y-auto">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
