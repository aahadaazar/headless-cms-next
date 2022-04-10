import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import moment from "moment";


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
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { items } = await client.getEntries({ content_type: 'personalBlogs', 'fields.slug': slug });
  return {
    props: { blogData: items[0] }
  };
}

export default function PostPage({ blogData }) {
  console.log(blogData);
  const { preview, slug, title, dated, content } = blogData.fields;
  return (
    <div className='prose mx-auto'>
      <h1 className="mb-3">{title}</h1>
      <h5 className="m-0 mb-5">{moment(dated).format('MMMM Do YYYY')}</h5>
      {documentToReactComponents(content)}
      {/* <div dangerouslySetInnerHTML={{ __html: md().render(content) }} /> */}
    </div>
  );
}