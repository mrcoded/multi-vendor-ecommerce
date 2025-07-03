import React from "react";
import parse from "html-react-parser";

function CommunityPostHtml({ content }: { content: string }) {
  return (
    <article className="prose lg:col-span-7 prose-blockquote:border-none prose-blockquote:text-lg prose-blockquote:bg-gray-100 prose-blockquote:leading-7 prose-blockquote:text-gray-900 prose-blockquote:font-medium prose-blockquote:px-8 prose-blockquote:py-5">
      {parse(`${content}`)}
    </article>
  );
}

export default CommunityPostHtml;
