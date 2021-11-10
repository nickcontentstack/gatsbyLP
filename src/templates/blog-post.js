import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"
import moment from "moment"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import FromBlog from "../components/FromBlog"
import HeroBanner from "../components/BlogBanner"
import Stack, { addEditableTags, gatsbyData, onEntryChange } from "../utils"

export default function blogPost(props) {
  const [data, setData] = useState(props.data)

  const updatePage = async () => {
    const result = await Stack.ContentType("blog_post")
      .Query()
      .includeReference("author", "related_post")
      .where("url", data.contentstackBlogPost.url)
      .toJSON()

    const blogPost = (await gatsbyData(result, "contentstack"))[0][0]
    addEditableTags(blogPost.contentstackBlogPost, "page", true)

    console.log(blogPost, data)
    setData(prevProps => ({
      ...prevProps,
      ...blogPost,
    }))
  }

  useEffect(() => {
    onEntryChange(updatePage)
  }, [])
  return (
    <Layout property={props}>
      <SEO title={data.contentstackBlogPost.title} />
      <HeroBanner />
      <div
        className="blog-container"
        data-pageref={data.contentstackBlogPost.uid}
        data-contenttype="blog_post"
        data-locale={data.contentstackBlogPost.locale}
      >
        <div className="blog-detail">
          <h2 {...data.contentstackBlogPost?.$?.title}>
            {data.contentstackBlogPost.title
              ? data.contentstackBlogPost.title
              : ""}
          </h2>
          <p>
            <span {...data.contentstackBlogPost?.$?.date}>
              {moment(data.contentstackBlogPost.date).format("ddd, MMM D YYYY")}
            </span>
            ,{" "}
            <strong {...data.contentstackBlogPost.author[0]?.$?.title}>
              {data.contentstackBlogPost.author[0].title}
            </strong>
          </p>
          <p {...data.contentstackBlogPost?.$?.body}>
            {ReactHtmlParser(data.contentstackBlogPost.body)}
          </p>
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {data.contentstackPage.page_components?.map((component, index) => {
              if (component.widget && index === 2) {
                return <h2>{component.widget.title_h2}</h2>
              }
            })}
            <FromBlog
              data={
                data.contentstackBlogPost.related_post
                  ? data.contentstackBlogPost.related_post
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query ($title: String!) {
    contentstackBlogPost(title: { eq: $title }) {
      url
      title
      body
      uid
      locale
      date
      author {
        title
        bio
        picture {
          url
          title
        }
      }
      related_post {
        body
        url
        title
        date
      }
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
    }

    contentstackPage {
      page_components {
        widget {
          title_h2
          type
        }
      }
    }
  }
`
