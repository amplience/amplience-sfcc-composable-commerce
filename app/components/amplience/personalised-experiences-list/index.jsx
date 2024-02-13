import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {AmplienceContext} from '../../../contexts/amplience'
import {defaultAmpClient} from '../../../amplience-api'
import {useIntl} from 'react-intl'
import AmplienceWrapper from '../wrapper'

const PersonalisedExperiencesList = ({maxNumber, categoryFilter = null, _meta}) => {
    const {groups} = useContext(AmplienceContext)
    const {locale} = useIntl()
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        const retrieveAllExperiences = async () => {
            const newExperiences = []
            for (const group in groups) {
                const experience = await defaultAmpClient.getPersonalisedExperiences(
                    locale,
                    groups[group],
                    categoryFilter
                )
                newExperiences.push(...experience)
            }
            setExperiences(newExperiences)
        }
        retrieveAllExperiences()
    }, [groups, categoryFilter])

    return (
        <>
            {(experiences &&
                experiences.length &&
                experiences.slice(0, maxNumber).map((experience, index) => {
                    return (
                        <div key={_meta?.deliveryId}>
                            <AmplienceWrapper content={experience.content} key={index} />
                        </div>
                    )
                })) || <></>}
        </>
    )
}

PersonalisedExperiencesList.displayName = 'PersonalisedExperiencesList'

PersonalisedExperiencesList.propTypes = {
    _meta: PropTypes.object,
    defaultContent: PropTypes.object,
    maxNumber: PropTypes.number,
    categoryFilter: PropTypes.string
}

export default PersonalisedExperiencesList
