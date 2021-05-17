import Link from "next/link";
import { Image } from "react-datocms";

export default function PostCard({ post }) {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image className="w-full" data={post.coverImage.responsiveImage} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.title}</div>
          <p className="text-gray-700 text-base">{post.excerpt}</p>
        </div>
        <div className="px-6 pt-4 pb-4 text-gray-700">
          <p className="pb-4">{post.author.name}</p>
          <Link href={`/${post.slug}`}>
            <a className="hover:text-black">View Post &#8594;</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
