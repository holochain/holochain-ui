
import * as React from 'react'
import { StyleRulesCallback, TextField } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import withRoot from '../../../../withRoot'
import { Profile, ProfileField } from '../../types/profile'
import { Persona as PersonaType, PersonaField as PersonaFieldType } from '../../types/persona'
import Person from '@material-ui/icons/Person'
import * as Autosuggest from 'react-autosuggest'
const match = require('autosuggest-highlight/match')
const parse = require('autosuggest-highlight/parse')
import { Part as PartType } from '../../types/part'
// import Warning from '@material-ui/icons/Warning'

import AutoCompleteProfileField from './autoCompleteProfileField'

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%'
  },
  container: {
    flexGrow: 1,
    width: '50%'
  },
  field: {
    width: '50%'
  },
  inputLabel: {
    color: '#8d97a5',
    fontSize: 12
  },
  menuItem: {
    fontFamily: 'Roboto',
    fontSize: 14,
    height: 16
  },
  selectEmpty: {
    background: '#fff',
    marginTop: theme.spacing.unit * 2
  },
  suggestion: {
    display: 'block'
  },
  suggestionsContainerOpen: {
    left: 0,
    marginTop: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  suggestionsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
})

let allPersonaSuggestions: Array<string> = []

function renderSuggestion (suggestion: string, { query, isHighlighted }: { query: any; isHighlighted: boolean }) {
  const matches = match(suggestion, query)
  const parts: Array<PartType> = parse(suggestion, matches)

  return (
    <MenuItem selected={isHighlighted} component='div'>
      <div>
        {parts.map((part: PartType, index: number) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function getSuggestionValue (suggestion: string) {
  return suggestion
}

function renderSuggestionsContainer (options: any) {
  const { children } = options
  return (
    <Paper {...options.containerProps} square={true}>
      {children}
    </Paper>
  )
}

function getSuggestions (value: string) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0
  return inputLength === 0
    ? []
    : allPersonaSuggestions.filter(suggestion => {
      const keep = count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue
      if (keep) {
        count += 1
      }
      return keep
    })
}

export interface OwnProps {
  classes?: any
  personas: Array<PersonaType>
  profile: Profile
  selectedPersona: PersonaType
  field: ProfileField,
  handleMappingChange: any,
  handlePersonaAutoSelect: any
  mapSaved: boolean
}

export interface StateProps {
  newPersona: PersonaType
  newField: PersonaFieldType
  conflict: boolean
}

export interface State {
  expansionPanelOpen: boolean
  mappedPersona: PersonaType
  mappedField: string
  suggestions: Array<String>
  personaAutovalue: string
  fieldAutovalue: string
  selectedPersona: PersonaType
}

export type Props = OwnProps & StateProps

class FieldMapper extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      suggestions: [],
      personaAutovalue: props.selectedPersona.name,
      selectedPersona: props.selectedPersona,
      fieldAutovalue: '',
      expansionPanelOpen: false,
      mappedPersona: props.selectedPersona,
      mappedField: props.field.name
    }
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    if (nextProps.selectedPersona !== prevState.selectedPersona) {
      if (nextProps.field.mapping !== undefined) {
        let mapping = nextProps.field.mapping
        let filteredField = nextProps.selectedPersona.fields.filter(function (field) {
          return field.name === mapping.personaFieldName
        })
        if (filteredField.length > 0) {
          mapping.personaAddress = nextProps.selectedPersona.hash
        }
        let filteredPersonas = nextProps.personas.filter(function (persona: PersonaType) {
          return mapping.personaAddress === persona.hash
        })
        if (filteredPersonas.length !== 0) {
          return {
            selectedPersona: nextProps.selectedPersona,
            mappedPersona: filteredPersonas[0],
            mappedField: nextProps.field.mapping.personaFieldName,
            personaAutovalue: filteredPersonas[0].name
          }
        } else {
          return {
            selectedPersona: nextProps.selectedPersona,
            mappedPersona: nextProps.personas[0],
            personaAutovalue: nextProps.personas[0].name
          }
        }
      } else {
        return {
          selectedPersona: nextProps.selectedPersona,
          personaAutovalue: nextProps.selectedPersona.name
        }
      }
    }
    return null
  }

  componentDidMount () {
    if (this.props.field.mapping !== undefined) {
      this.setPersonaAndFieldName(this.props.field)
    }
    allPersonaSuggestions = []
    this.props.personas.map((persona: PersonaType) => (
      allPersonaSuggestions.push(persona.name)
    ))
  }

  handleMappingChange = (updatedField: ProfileField, value: string) => {
    this.props.handleMappingChange(updatedField, value)
    this.setPersonaAndFieldName(updatedField)
  }

  public setPersonaAndFieldName (field: ProfileField) {
    if (field.mapping !== undefined) {
      let mapping = field.mapping
      let filteredPersonas = this.props.personas.filter(function (persona: PersonaType) {
        return mapping.personaAddress === persona.hash
      })
      if (filteredPersonas.length !== 0) {
        this.setState({
          mappedPersona: filteredPersonas[0],
          mappedField: field.mapping.personaFieldName,
          personaAutovalue: filteredPersonas[0].name
        })
      } else {
        this.setState({
          mappedPersona: this.props.personas[0],
          personaAutovalue: this.props.personas[0].name
        })
      }
    } else {
      this.setState({
        personaAutovalue: this.props.selectedPersona.name
      })
    }
  }

  public renderInput = (inputProps: any) => {
    const { classes, ref, ...other } = inputProps

    return (
      <div>
        <TextField
          fullWidth={true}
          id='personaAutoText'
          name='personaAutoText'
          label='Persona Name'
          InputProps={{
            classes: {
              input: classes.textfield
            },
            disableUnderline: false,
            inputRef: ref,
            ...other
          }}
        />
      </div>
    )
  }
  public handleSuggestionsFetchRequested = ({ value }: { value: any }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  public handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }
  public handlePersonaAutoChange = (event: any, newVal: any) => {
    let newValue = newVal.newValue
    this.setState({
      personaAutovalue: newValue
    })
  }
  public handlePersonaAutoSelect = () => {
    // this.props.handlePersonaAutoSelect(this.state.personaAutovalue)
  }
  render () {
    const { classes, field, personas, profile } = this.props
  	return (
      <div className={classes.root}>
        <ExpansionPanel expanded={this.state.expansionPanelOpen} style={{ boxShadow: 'none' }}>
          <ExpansionPanelSummary expandIcon={<Person name='expandPersonaDetails' color={this.props.mapSaved ? 'primary' : 'secondary'} onClick={() => { this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen }) }}/>}>
            <AutoCompleteProfileField
              personas={personas}
              selectedPersona={this.state.selectedPersona}
              profile={profile}
              field={field}
              handleMappingChange={this.handleMappingChange}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Autosuggest
              id='selectedPersonaValue'
              theme={{
                container: classes.container,
                suggestion: classes.suggestion,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList
              }}
              renderInputComponent={this.renderInput}
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
              renderSuggestionsContainer={renderSuggestionsContainer}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                classes,
                onBlur: this.handlePersonaAutoSelect,
                onChange: this.handlePersonaAutoChange,
                value: this.state.personaAutovalue
              }}
            />
            <TextField className={classes.field} name='field' label='Field' value={this.state.mappedField}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
  	)
  }
}

export default withRoot(withStyles(styles)(FieldMapper))
