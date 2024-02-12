import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AmplienceContext } from '../../../contexts/amplience'
import { defaultAmpClient } from '../../../amplience-api'
import { useIntl } from 'react-intl'
import { handleAsyncError } from '../../../commerce-api/utils'

const PersonalisedExperiencesList = ({
    maxNumber,
    categoryFilter = null,
    ...props
}) => {
    const {groups} = useContext(AmplienceContext)
    const {locale} = useIntl()
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        const retrieveAllExperiences = async () => {
            const experiences = []
            for (const group in groups) {
                console.log("Group: ", groups[group])
                const experience = await defaultAmpClient.getPersonalisedExperiences(locale, group, categoryFilter)
                experiences.push(...experience)
            }
            console.log("Experiences: ", experiences)
            setExperiences(experiences)
        }

        retrieveAllExperiences()

        console.log("Group change")
    }, [groups])

    return <>
        <p>Groups: {JSON.stringify(groups)}</p>
        <p>Experiences: {JSON.stringify(experiences)}</p>
    </>
}

PersonalisedExperiencesList.displayName = 'PersonalisedExperiencesList'

PersonalisedExperiencesList.propTypes = {
    defaultContent: PropTypes.object,
    maxNumber: PropTypes.number,
    categoryFilter: PropTypes.string,
}

export default PersonalisedExperiencesList
