import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import RenderComponents from "../components/RenderComponents"
import Stack, { onEntryChange, gatsbyData, addEditableTags } from "../utils"

const Home = props => {
  const [data, setData] = useState(props.data)

  const updatePage = async () => {
    const result = await Stack.ContentType("page")
      .Query()
      .where("url", "/")
      .toJSON()
      .includeReference(
        "page_components.from_blog.featured_blogs",
        "page_components.from_blog.featured_blogs.author"
      )

    const home = (await gatsbyData(result, "contentstack"))[0][0]

    addEditableTags(home.contentstackPage, "page", true)

    setData(home)
  }

  useEffect(() => {
    onEntryChange(updatePage)
  }, [])

  return (
    <Layout>
      <SEO title={data.contentstackPage.title} />
      {data.contentstackPage.page_components ? (
        <RenderComponents
          components={data.contentstackPage.page_components}
          contentTypeUid="page"
          entryUid={data.contentstackPage.uid}
          locale={data.contentstackPage.locale}
        />
      ) : (
        ""
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    contentstackPage(title: { eq: "Home" }) {
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
          banner_image {
            title
            url
          }
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
      }
    }
  }
`

export default Home
