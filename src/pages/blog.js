import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"
import moment from "moment"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import HeroBanner from "../components/BlogBanner"
import FromBlog from "../components/FromBlog"
import Stack, { onEntryChange, addEditableTags } from "../utils"

const Blog = props => {
  const [data, setData] = useState(props.data)
  const updatePage = async () => {
    const result = await Stack.ContentType("blog_post")
      .Query()
      .toJSON()
      .includeReference("author", "related_post")
      .find()

    const allContentstackBlogPost = {
      nodes: result[0],
    }

    result[0]?.forEach(res => {
      addEditableTags(res, "blog_post", true)
    })

    setData(prevData => {
      return {
        ...prevData,
        allContentstackBlogPost,
      }
    })
  }

  useEffect(() => {
    onEntryChange(updatePage)
  }, [])

  let archived = [],
    blogList = []
  data.allContentstackBlogPost.nodes.forEach(blogs => {
    if (blogs.is_archived) {
      archived.push(blogs)
    } else {
      blogList.push(blogs)
    }
  })

  return (
    <Layout>
      <SEO title={data.contentstackPage.title} />
      <HeroBanner />
      <div
        className="blog-container"
        data-pageref={data.contentstackPage.uid}
        data-contenttype="page"
        data-locale={data.contentstackPage.locale}
      >
        <div className="blog-column-left">
          {blogList.map((blog, index) => {
            return (
              <div className="blog-list" key={index}>
                {blog.featured_image && (
                  <Link to={blog.url}>
                    <img
                      {...blog.featured_image?.$?.url}
                      alt="blog-img"
                      className="blog-list-img"
                      src={blog.featured_image.url}
                    />
                  </Link>
                )}
                <div className="blog-content">
                  {blog.title && (
                    <Link to={blog.url}>
                      <h3 {...blog?.$?.title}>{blog.title}</h3>
                    </Link>
                  )}
                  <p>
                    <span {...blog?.$?.date}>
                      {moment(blog.date).format("ddd, MMM D YYYY")}
                    </span>
                    ,{" "}
                    <strong {...blog.author[0]?.$?.title}>
                      {blog.author[0]?.title}
                    </strong>
                  </p>
                  {blog.body ? (
                    <p {...blog?.$?.body}>
                      {ReactHtmlParser(blog.body.slice(0, 300))}
                    </p>
                  ) : (
                    ""
                  )}
                  {blog.url ? (
                    <Link to={blog.url}>
                      <span {...blog?.$?.url}>{"Read more -->"}</span>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="blog-column-right">
          <h2>{data.contentstackPage.page_components[1].widget.title_h2}</h2>
          <FromBlog data={archived} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    contentstackPage(title: { eq: "Blog" }) {
      title
      url
      uid
      locale
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
      page_components {
        contact_details {
          address
          email
          phone
        }
        from_blog {
          title_h2
          featured_blogs {
            title
            uid
            url
            is_archived
            featured_image {
              title
              url
            }
            body
            author {
              title
              uid
              bio
            }
          }
          view_articles {
            title
            href
          }
        }
        hero_banner {
          banner_description
          banner_title
          bg_color
          call_to_action {
            title
            href
          }
        }
        our_team {
          title_h2
          description
          employees {
            name
            designation
            image {
              title
              url
            }
          }
        }
        section {
          title_h2
          description
          image {
            title
            url
          }
          image_alignment
          call_to_action {
            title
            href
          }
        }
        section_with_buckets {
          title_h2
          description
          buckets {
            title_h3
            description
            icon {
              title
              url
            }
            call_to_action {
              title
              href
            }
          }
        }
        section_with_cards {
          cards {
            title_h3
            description
            call_to_action {
              title
              href
            }
          }
        }
        widget {
          title_h2
          type
        }
      }
    }

    allContentstackBlogPost {
      nodes {
        url
        title
        uid
        author {
          title
        }
        related_post {
          title
          body
        }
        date
        featured_image {
          url
        }
        is_archived
        body
      }
    }
  }
`

export default Blog
