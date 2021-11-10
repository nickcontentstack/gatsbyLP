import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect, useRef } from "react"
import ReactHtmlParser from "react-html-parser"
import Stack, { onEntryChange, gatsbyData, addEditableTags } from "../utils"

const queryLayout = () => {
  const data = useStaticQuery(graphql`
    query {
      contentstackFooter {
        title
        uid
        logo {
          url
          title
        }
        navigation {
          link {
            href
            title
          }
        }
        social {
          social_share {
            link {
              href
              title
            }
            icon {
              url
              title
            }
          }
        }
        copyright
      }
    }
  `)
  return data
}

const Footer = () => {
  const [data, setData] = useState(queryLayout())
  const updatePage = async () => {
    const result = Stack.ContentType("footer").Query().toJSON()

    const footer = (await gatsbyData(result, "contentstack"))[0][0]

    addEditableTags(footer.contentstackFooter, "footer", true)

    setData(footer)
  }

  useEffect(() => {
    onEntryChange(updatePage)
  }, [])

  return (
    <footer>
      <div className="max-width footer-div">
        <div className="col-quarter">
          <Link to="/" className="logo-tag">
            <img
              {...data.contentstackFooter.logo?.$?.url}
              src={data.contentstackFooter.logo.url}
              alt={data.contentstackFooter.title}
              title={data.contentstackFooter.title}
              className="logo footer-logo"
            />
          </Link>
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {data.contentstackFooter.navigation.link.map((menu, index) => {
                return (
                  <li className="footer-nav-li" key={index}>
                    <Link to={menu.href}>
                      <span {...menu?.$?.title}>{menu.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {data.contentstackFooter.social.social_share.map(
              (social, index) => {
                return (
                  <a
                    {...social.link?.$?.href}
                    href={social.link.href}
                    title={social.link.title.toLowerCase()}
                    key={index}
                    className="footer-social-links"
                  >
                    <img
                      {...social.icon?.$?.url}
                      src={social.icon.url}
                      alt="social-icon"
                    />
                  </a>
                )
              }
            )}
          </div>
        </div>
      </div>
      <div className="copyright">
        {data.contentstackFooter.copyright ? (
          <p {...data.contentstackFooter?.$?.copyright}>
            {ReactHtmlParser(data.contentstackFooter.copyright)}
          </p>
        ) : (
          ""
        )}
      </div>
    </footer>
  )
}

export default Footer
