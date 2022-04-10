import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function ContentfulBlogs({ blog }) {
  const { preview, slug, title, dated } = blog.fields;
  return (
    <div
      key={blog.sys.id}
      className='text-white border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col'
    >
      <Link href={`/contentful/${slug}`}>
        <a>
          <Image
            width={preview.fields.file.details.image.width}
            height={preview.fields.file.details.image.height}
            alt={slug}
            src={`https:${preview.fields.file.url}`}
          />
          <h1 className='pb-1 p-2'>{title}</h1>
          <h3 className='pt-0 p-2'>{moment(dated).format('MMMM Do YYYY')}</h3>
        </a>
      </Link>
    </div>
  )
}
