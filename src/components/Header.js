import { Link, graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState, useRef } from "react"
import ReactHtmlParser from "react-html-parser"
import Stack, { onEntryChange, gatsbyData, addEditableTags } from "../utils"

const queryHeader = () => {
  const query = graphql`
    query {
      contentstackHeader {
        title
        uid
        logo {
          title
          url
        }
        navigation_menu {
          label
          page_reference {
            title
            url
          }
        }
        notification_bar {
          show_announcement
          announcement_text
        }
      }
    }
  `
  return useStaticQuery(query)
}
const Header = () => {
  const [data, setData] = useState(queryHeader())
  const updatePage = async () => {
    const result = Stack.ContentType("header")
      .Query()
      .toJSON()
      .includeReference("navigation_menu.page_reference")

    const header = (await gatsbyData(result, "contentstack"))[0][0]
    addEditableTags(header.contentstackHeader, "header", true)

    setData(header)
  }

  useEffect(() => {
    onEntryChange(updatePage)
  }, [])

  return (
    <header className="header">
      {data.contentstackHeader.notification_bar.show_announcement ? (
        <div
          className="note-div"
          {...data.contentstackHeader.notification_bar?.$?.announcement_text}
        >
          {ReactHtmlParser(
            data.contentstackHeader.notification_bar.announcement_text
          )}
        </div>
      ) : null}
      <div className="max-width header-div">
        <div className="wrapper-logo" {...data.contentstackHeader.logo?.$?.url}>
          <Link to="/" className="logo-tag" title="Contentstack">
            <img
              className="logo"
              src={data.contentstackHeader.logo.url}
              alt={data.contentstackHeader.title}
              title={data.contentstackHeader.title}
            />
          </Link>
        </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <nav className="menu">
          <ul className="nav-ul header-ul">
            {data.contentstackHeader.navigation_menu.map((menu, index) => {
              return (
                <li className="nav-li" key={index}>
                  {menu.label === "Home" ? (
                    <Link
                      to={`${menu.page_reference[0].url}`}
                      activeClassName="active"
                    >
                      <span {...menu?.$?.label}>{menu.label}</span>
                    </Link>
                  ) : (
                    <Link
                      to={`${menu.page_reference[0].url}/`}
                      activeClassName="active"
                    >
                      <span {...menu?.$?.label}>{menu.label}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
