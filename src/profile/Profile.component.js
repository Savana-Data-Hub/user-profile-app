import React from 'react'
import FormFields from '../layout/FormFields.component.js'
import i18n from '../locales/index.js'
import userProfileActions from './profile.actions.js'
import userProfileStore from './profile.store.js'

function EditProfile() {
    const fieldKeys = [
        'firstName',
        'surname',
        'email',
        'emailVerification',
        'phoneNumber',
        'jobTitle',
        'gender'
    ]

    const pageLabel = i18n.t('Edit user profile')

    return (
        <FormFields
            pageLabel={pageLabel}
            fieldKeys={fieldKeys}
            valueStore={userProfileStore}
            onUpdateField={userProfileActions.save}
        />
    )
}

export default EditProfile
