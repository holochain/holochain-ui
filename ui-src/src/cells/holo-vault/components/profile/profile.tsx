import * as React from 'react'
import { StyleRulesCallback, Theme } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import withRoot from '../../../../withRoot'

import { Profile as ProfileType, ProfileField } from '../../types/profile'
import { Suggestion as SuggestionType } from '../../types/suggestion'

import AutoCompleteProfileField from './autoCompleteProfileField'

const styles: StyleRulesCallback = (theme: Theme) => ({
})

export interface RouterProps extends RouteComponentProps<{name: string}> {}

interface OwnProps {
  suggestions: Array<SuggestionType>
}

interface DispatchProps {
}

interface StateProps {
  profile: ProfileType
}

interface State {
  profile: ProfileType
}

export type Props = OwnProps & DispatchProps & StateProps

class Profile extends React.Component<Props & RouterProps, State> {

  handleProfileFieldChange = (i: number) => {
    this.state.profile.fields[i]
  }

  renderProfileField = (field: ProfileField, i: number) => {
    return (
      <AutoCompleteProfileField
        suggestions={this.props.suggestions}
        handleSelectionChange={() => this.handleProfileFieldChange(i)}
      />
    )
  }

  render () {
    const { profile } = this.props
    return (
      <div>
        {profile.fields.map((elem, i) => this.renderProfileField(elem, i))}
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(withRouter(Profile)))
