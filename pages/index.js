import Head from "next/head";
import { request } from "../lib/datocms";
import { renderMetaTags } from "react-datocms";

import PostCard from "../components/PostCard";

const HOMEPAGE_QUERY = `
query HomePage($limit: IntType) {
  site: _site {
    favicon: faviconMetaTags {
      attributes
      content
      tag
    }
  }
  blog {
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
  }
  allPosts(first: $limit) {
    id
    title
    excerpt
    slug
    date
    author {
      name
    }
    coverImage {
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`;

export async function getStaticProps(context) {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
    preview: context.preview,
  });

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  return (
    <div>
      <Head>{renderMetaTags(data.blog.seo.concat(data.site.favicon))}</Head>
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {data.allPosts.map((blogPost) => (
          <PostCard post={blogPost} />
        ))}
      </div>
    </div>
  );
}
