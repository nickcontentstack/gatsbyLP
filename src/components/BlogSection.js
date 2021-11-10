import { Link } from "gatsby"
import React from "react"
import ReactHtmlParser from "react-html-parser"

const BlogSection = ({ data }) => {
  return (
    <div className="community-section">
      <div className="community-head">
        {data.from_blog.title_h2 ? (
          <h2 {...data.from_blog?.$?.title_h2}>{data.from_blog.title_h2}</h2>
        ) : (
          ""
        )}
        {data.from_blog.view_articles ? (
          <Link
            to={data.from_blog.view_articles.href}
            className="btn secondary-btn article-btn"
          >
            <span {...data.from_blog.view_articles?.$?.title}>
              {data.from_blog.view_articles.title}
            </span>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="home-featured-blogs">
        {data.from_blog.featured_blogs.map((blog, index) => {
          return (
            <div
              className="featured-blog"
              key={index}
              {...blog.featured_image?.$?.url}
            >
              {blog.featured_image ? (
                <img
                  {...blog.featured_image?.$?.url}
                  src={blog.featured_image.url}
                  alt={blog.featured_image.title}
                  className="blog-post-img"
                />
              ) : (
                ""
              )}
              <div className="featured-content">
                {blog.title ? <h3 {...blog?.$?.title}>{blog.title}</h3> : ""}
                {blog.body && (
                  <p {...blog?.$?.body}>
                    {ReactHtmlParser(blog.body.slice(0, 300))}
                  </p>
                )}
                <Link className="blogpost-readmore" to={blog.url}>
                  {"Read More -->"}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogSection
