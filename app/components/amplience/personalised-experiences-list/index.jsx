import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AmplienceContext } from '../../../contexts/amplience'
import { defaultAmpClient } from '../../../amplience-api'
import { useIntl } from 'react-intl'
import AmplienceWrapper from '../wrapper'

const PersonalisedExperiencesList = ({
    maxNumber,
    categoryFilter = null
}) => {
    const {groups} = useContext(AmplienceContext)
    const {locale} = useIntl()
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        const retrieveAllExperiences = async () => {
            const newExperiences = []
            for (const group in groups) {
                const experience = await defaultAmpClient.getPersonalisedExperiences(locale, groups[group], categoryFilter)
                newExperiences.push(...experience)
            }
            setExperiences(newExperiences)
        }

        retrieveAllExperiences()

        console.log("Group change")
    }, [groups])

    return <>
        {
            experiences 
            && experiences.length
            && experiences.slice(0, maxNumber).map((experience, index) => {
                return <div>
                    <AmplienceWrapper
                        content={experience.content}
                        fecth={{id: experience.content.id}}
                        key={index} 
                    />
                </div>
            }) || <></>
        }
        {/* <pre>{JSON.stringify(experiences,null,4)}</pre> */}
    </>
}

PersonalisedExperiencesList.displayName = 'PersonalisedExperiencesList'

PersonalisedExperiencesList.propTypes = {
    defaultContent: PropTypes.object,
    maxNumber: PropTypes.number,
    categoryFilter: PropTypes.string,
}

export default PersonalisedExperiencesList
