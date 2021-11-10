import { Link } from "gatsby"
import React from "react"

const Section = ({ data }) => {
  function contentSection(data) {
    return (
      <div className="home-content">
        {data.section.title_h2 && (
          <h2 {...data.section?.$?.title_h2}>{data.section.title_h2}</h2>
        )}
        {data.section.description && (
          <p {...data.section?.$?.title_h2}>{data.section.description}</p>
        )}
        {data.section.call_to_action.title &&
        data.section.call_to_action.href ? (
          <Link
            to={data.section.call_to_action.href}
            className="btn secondary-btn"
          >
            <span {...data.section.call_to_action?.$?.title}>
              {data.section.call_to_action.title}
            </span>
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  }

  function imageContent(data) {
    return (
      <img
        {...data.section.image?.$?.url}
        src={data.section.image.url}
        alt="section-image"
      />
    )
  }

  return (
    <div className="home-advisor-section">
      {data.section.image_alignment === "Left"
        ? [imageContent(data), contentSection(data)]
        : [contentSection(data), imageContent(data)]}
    </div>
  )
}

export default Section
