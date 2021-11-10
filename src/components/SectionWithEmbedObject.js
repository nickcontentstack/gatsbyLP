import React from "react"
import ReactHtmlParser from "react-html-parser"

const SectionWithEmbedObject = ({ data }) => {
  if (data.section_with_html_code.html_code_alignment === "Left") {
    return (
      <div className="contact-page-section max-width">
        <div className="contact-page-content">
          {data.section_with_html_code.title ? (
            <h1 {...data.section_with_html_code?.$?.title}>
              {data.section_with_html_code.title}
            </h1>
          ) : (
            ""
          )}
          {data.section_with_html_code.description ? (
            <p {...data.section_with_html_code?.$?.description}>
              {ReactHtmlParser(data.section_with_html_code.description)}
            </p>
          ) : (
            ""
          )}{" "}
        </div>
        <div className="contact-page-form">
          {data.section_with_html_code.html_code ? (
            <p {...data.section_with_html_code?.$?.html_code}>
              {ReactHtmlParser(data.section_with_html_code.html_code)}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="contact-maps-section max-width">
      <div
        className="maps-details"
        {...data.section_with_html_code?.$?.html_code}
      >
        {ReactHtmlParser(data.section_with_html_code.html_code)}
      </div>
      <div className="contact-maps-content">
        {data.section_with_html_code.title ? (
          <h2 {...data.section_with_html_code?.$?.title}>
            {data.section_with_html_code.title}
          </h2>
        ) : (
          ""
        )}
        {data.section_with_html_code.description
          ? ReactHtmlParser(data.section_with_html_code.description)
          : ""}{" "}
      </div>
    </div>
  )
}

export default SectionWithEmbedObject
