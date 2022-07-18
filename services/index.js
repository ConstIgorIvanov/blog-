import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              name
              bio
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredimage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
        last: 3
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCatigories {
      categories {
        name
        id
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const getPostsDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredimage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
          posts {
            title
            slug
            featuredimage {
              url
            }
            createdAt
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};
export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

///

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredimage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};
