import { createClient } from "contentful";
import ContentfulBlogs from "../../components/ContentfulBlogs";

export default function Home({ blogs }) {
  return (
    <div className='mx-auto flex flex-col justify-center'>
      <h1 className="font-medium text-3xl mb-3 mx-auto text-blue">Contentful Blogs</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0'>
        {blogs.map((data) => (
          <ContentfulBlogs blog={data} key={data.fields.slug} />
        ))}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  // connect to contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  });

  const blogs = await client.getEntries({ content_type: 'personalBlogs' });
  return {
    props: {
      blogs: blogs.items,
    },
  };
}