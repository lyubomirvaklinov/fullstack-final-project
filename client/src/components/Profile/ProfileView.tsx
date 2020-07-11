import React, { ReactElement } from 'react'
import { Grid } from '@material-ui/core'
import ProfileForm from './ProfileForm'

interface Props {
  
}

export default function ProfileView({}: Props): ReactElement {
  return (
    <Grid container direction="column" style={{maxWidth: 1100, margin: '0 auto'}}>
        <Grid >
          <ProfileForm />
        </Grid>
      </Grid>
  )
}
