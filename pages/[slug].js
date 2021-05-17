import { Image } from "react-datocms";

import { request } from "../lib/datocms";
import markdownToHtml from "../lib/markdownToHtml";

const ALL_SLUGS = `
query AllSlugs {
    allPosts {
      slug
    }
  }`;

const GET_POST = `
query GetPost($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      excerpt
      date
      title
      author {
        name
        picture {
          url
          responsiveImage(imgixParams: {fit: crop, w: 300, h: 300, auto: format}) {
            src
            srcSet
            webpSrcSet
            width
            height
            aspectRatio
            base64
            alt
            title
            sizes
          }
        }
      }
      content
      coverImage {
        responsiveImage(imgixParams: {auto: format, fit: crop}) {
          alt
          base64
          height
          sizes
          src
          srcSet
          title
          webpSrcSet
          width
          aspectRatio
        }
      }
    }
  }  
`;

export const getStaticPaths = async () => {
  const data = await request({
    query: ALL_SLUGS,
  });

  const paths = data.allPosts.map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ preview, params }) {
  const data = await request({
    query: GET_POST,
    variables: { slug: params.slug },
    preview: preview,
  });

  const content = await markdownToHtml(data?.post?.content || "");

  return {
    props: {
      post: data?.post,
      content,
    },
  };
}

export default function Post({ post, content }) {
  console.log(post);
  return (
    <div>
      <h1 className="text-5xl font-bold mb-7">{post.title}</h1>
      <div className="flex mb-10">
        <Image
          className="rounded-full w-10 h-10"
          data={post.author.picture.responsiveImage}
        />
        <p className="self-center ml-3">{post.author.name}</p>
        <p className="self-center ml-7">{post.date}</p>
      </div>
      <Image className="mb-10" data={post.coverImage.responsiveImage} />
      <p className="font-bold text-xl text-gray-400">{post.excerpt}</p>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
