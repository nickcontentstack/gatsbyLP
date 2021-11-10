import { Link } from "gatsby"
import React from "react"

const Hero = props => {
  const data = props.data
  return (
    <div
      className="hero-banner"
      style={{
        background: data.hero_banner.bg_color ? data.hero_banner.bg_color : "",
      }}
    >
      <div className={`${props.title == "about" ? "about" : "home"}-content`}>
        {data.hero_banner.banner_title ? (
          <h1 {...data.hero_banner?.$?.banner_title} className="hero-title">
            {data.hero_banner.banner_title}
          </h1>
        ) : (
          ""
        )}
        {data.hero_banner.banner_description ? (
          <p
            {...data.hero_banner?.$?.banner_description}
            className={`hero-description ${
              props.title == "about" && "about-desc"
            }`}
          >
            {data.hero_banner.banner_description}
          </p>
        ) : (
          ""
        )}
        {data.hero_banner.call_to_action.title &&
        data.hero_banner.call_to_action.href ? (
          <Link
            to={data.hero_banner.call_to_action.href}
            className="btn tertiary-btn"
          >
            <span {...data.hero_banner.call_to_action?.$?.title}>
              {data.hero_banner.call_to_action.title}
            </span>
          </Link>
        ) : (
          ""
        )}
      </div>
      {data.hero_banner.banner_image ? (
        <img
          alt="hero-banner-image"
          {...data.hero_banner.banner_image?.$?.url}
          src={data.hero_banner.banner_image.url}
        />
      ) : (
        ""
      )}
    </div>
  )
}

export default Hero
