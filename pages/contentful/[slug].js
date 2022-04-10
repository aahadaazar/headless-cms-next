import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import moment from "moment";
import Skeleton from "../../components/Skeleton";


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
});


export async function getStaticPaths() {
  const blogs = await client.getEntries('personalBlogs');
  const paths = blogs.items.map(o => {
    return {
      params: { slug: o.fields.slug }
    }
  })

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { items } = await client.getEntries({ content_type: 'personalBlogs', 'fields.slug': slug });

  if (!items.length) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      }
    }
  }
  return {
    props: { blogData: items[0] },
    revalidate: 1
  };
}

export default function PostPage({ blogData }) {
  if (!blogData) return <Skeleton />
  const { title, dated, content } = blogData.fields;
  return (
    <div className='prose mx-auto'>
      <h1 className="mb-3">{title}</h1>
      <h5 className="m-0 mb-5">{moment(dated).format('MMMM Do YYYY')}</h5>
      {documentToReactComponents(content)}
      {/* <div dangerouslySetInnerHTML={{ __html: md().render(content) }} /> */}
    </div>
  );
}