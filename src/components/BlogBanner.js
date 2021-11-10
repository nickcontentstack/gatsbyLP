import { useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect, useRef } from "react"

import Stack, { onEntryChange, gatsbyData, addEditableTags } from "../utils"

const queryBlogBanner = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      contentstackPage(title: { eq: "Blog" }) {
        title
        page_components {
          hero_banner {
            banner_description
            banner_title
          }
        }
      }
    }
  `)
  return data
}

const blogHero = () => {
  const [data, setData] = useState(queryBlogBanner())
  const updatePage = async () => {
    const result = Stack.ContentType("page")
      .Query()
      .where("url", "/blog")
      .toJSON()

    const blog = (await gatsbyData(result, "contentstack"))[0][0]

    addEditableTags(blog.contentstackPage, "page", true)

    setData(prevData => {
      return {
        ...prevData,
        ...blog,
      }
    })
  }

  useEffect(() => {
    onEntryChange(updatePage)
  }, [])

  return (
    <>
      <div className="blog-page-banner">
        <div className="blog-page-content">
          {data.contentstackPage.page_components[0].hero_banner.banner_title ? (
            <h1
              className="hero-title"
              {...data.contentstackPage.page_components[0].hero_banner.$
                ?.banner_title}
            >
              {
                data.contentstackPage.page_components[0].hero_banner
                  .banner_title
              }
            </h1>
          ) : (
            ""
          )}

          {data.contentstackPage.page_components[0].hero_banner
            .banner_description ? (
            <p
              className="hero-description"
              {...data.contentstackPage.page_components[0].hero_banner?.$
                ?.banner_description}
            >
              {
                data.contentstackPage.page_components[0].hero_banner
                  .banner_description
              }
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default blogHero
