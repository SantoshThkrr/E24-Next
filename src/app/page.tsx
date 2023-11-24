import BannerSection from '@/components/BannerSection/BannerSection';
import ListView from '@/components/Cards/Card';
import Menu from '@/components/Header/Menu';
import { MENU_QUERY } from '@/components/Header/MenuQuery';
import { fetchData } from '@/helpers/graphql';
import { DocumentNode, gql } from '@apollo/client';
import React from 'react'
import client from '../helpers/apollo/client';

const Home = async () => {

  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setMobileMenuOpen(!mobileMenuOpen);
  // }

  const getPostsQuery = gql`
  query GetPosts {
    posts {
      edges {
        node {
          slug
          title
          databaseId
          date
          featuredImage {
            node {
              sourceUrl
              title
            }
          }
          categories {
            edges {
              node {
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`
  
  // Call the async function
 const data= await fetchData(getPostsQuery);
  

  return (

      <div className="w-full md:w-1/2 lg:w-6/12 p-4">
        <div>
      {data &&
        data.posts?.edges.map((post: any, index: number) => {
          const { node } = post;
          const { title, slug, databaseId, date, featuredImage, categories } = node;
          return index===0?      <BannerSection  title={title} slug={slug} databaseId={databaseId} date={date} featuredImage={featuredImage} categories={categories} />
          :<ListView title={title} slug={slug} databaseId={databaseId} date={date} featuredImage={featuredImage} categories={categories} />;
        })}
      </div>
      </div>

  )
}

export default Home