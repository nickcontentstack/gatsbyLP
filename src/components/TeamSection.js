import React from "react"

const TeamSection = ({ data }) => {
  return (
    <div className="about-team-section">
      <div className="team-head-section">
        {data.our_team.title_h2 ? (
          <h2 {...data.our_team?.$?.title_h2}>{data.our_team.title_h2}</h2>
        ) : (
          ""
        )}
        {data.our_team.description ? (
          <p {...data.our_team?.$?.description}>{data.our_team.description}</p>
        ) : (
          ""
        )}
      </div>
      <div className="team-content">
        {data.our_team.employees.map((employee, index) => {
          return (
            <div className="team-details" key={index}>
              {employee.image && (
                <img
                  {...employee.image?.$?.url}
                  alt={employee.image.title}
                  src={employee.image.url}
                />
              )}
              <div className="team-details">
                {employee.name && (
                  <h3 {...employee?.$?.name}>{employee.name}</h3>
                )}
                {employee.designation && (
                  <p {...employee?.$?.designation}>{employee.designation}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamSection
