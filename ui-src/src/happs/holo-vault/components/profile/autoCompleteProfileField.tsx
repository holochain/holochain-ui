import * as React from 'react'
import { StyleRulesCallback, TextField } from '@material-ui/core/'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import * as Autosuggest from 'react-autosuggest'
const match = require('autosuggest-highlight/match')
const parse = require('autosuggest-highlight/parse')
import { Part as PartType } from '../../types/part'
import { Suggestion as SuggestionType } from '../../types/suggestion'
import { Persona as PersonaType, PersonaField as PersonaFieldType } from '../../types/persona'
import { ProfileField, Profile as ProfileType, UsageType } from '../../types/profile'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Save from '@material-ui/icons/Save'
import Dvr from '@material-ui/icons/Dvr'

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%'
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  formControl: {
    background: 'red'
  },
  // input: {
  //   fontSize: 14,
  //   maxWidth: 368,
  //   width: 112
  // },
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
  },
  persona: {
    float: 'right'
  }
})

let allSuggestions: Array<SuggestionType> = []

function renderSuggestion (suggestion: SuggestionType, { query, isHighlighted }: { query: any; isHighlighted: boolean }) {
  const matches = match(suggestion.label, query)
  const parts: Array<PartType> = parse(suggestion.label, matches)

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

function getSuggestionValue (suggestion: SuggestionType) {
  return suggestion.label
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
    : allSuggestions.filter(suggestion => {
      const keep = count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue
      if (keep) {
        count += 1
      }
      return keep
    })
}

export interface OwnProps {
  classes?: any
}

export interface StateProps {
  personas: Array<PersonaType>
  selectedPersona: PersonaType
  profile: ProfileType
  field: ProfileField
  handleMappingChange: any
}

export type Props = OwnProps & StateProps

export interface State {
  selectedPersona: PersonaType
  suggestions: Array<SuggestionType>
  field: ProfileField
  value: string
}

function UsageIcon (props: any) {
  switch (props.type) {
    case UsageType.STORE:
      return (<Tooltip title={props.reason}><Save/></Tooltip>)
    default:
      return (<Tooltip title={props.reason}><Dvr/></Tooltip>)
  }
}

function Mapping (props: any) {
  if (props.field.mapping) {
    let mapping = props.field.mapping
    let filteredPersonas = props.personas.filter(function (persona: PersonaType) {
      return mapping.personaAddress === persona.hash
    })
    if (filteredPersonas.length > 0) {
      let filteredData = filteredPersonas[0].fields.filter(function (field: ProfileField) {
        return field.name === mapping.personaFieldName
      })
      if (filteredData.length > 0) {
        return (<Typography className={props.classes.persona}>{filteredPersonas[0].name + ' - ' + mapping.personaFieldName}</Typography>)
      } else {
        return (<Typography className={props.classes.persona}>{props.selectedPersona.name + ' - ' + props.field.name}</Typography>)
      }
    } else {
      return (<Typography className={props.classes.persona}>{props.selectedPersona.name + ' - ' + props.field.name}</Typography>)
    }
  } else {
    let filteredSuggestions = allSuggestions.filter(function (suggestion: SuggestionType) {
      return suggestion.field.name === props.field.name
    })
    if (filteredSuggestions.length > 0) {
      return (<Typography className={props.classes.persona}>{filteredSuggestions[0].persona.name + ' - ' + filteredSuggestions[0].field.name}</Typography>)
    } else {
      return (<Typography className={props.classes.persona}>{props.selectedPersona.name + ' - ' + props.field.name}</Typography>)
    }
  }
}

class AutoCompleteProfileField extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      selectedPersona: props.selectedPersona,
      suggestions: [],
      value: '',
      field: props.field
    }
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State): any | null {
    allSuggestions = []
    nextProps.personas.map((persona: PersonaType) => (
      persona.fields.map((field: PersonaFieldType) => (
        allSuggestions.push({ persona: persona, field: field, label: field.data + ' (' + persona.name + ' - ' + field.name + ')' })
      ))
    ))
    if (nextProps.field.mapping) {
      let mapping = nextProps.field.mapping
      if (nextProps.selectedPersona !== prevState.selectedPersona) {
        let filteredField = nextProps.selectedPersona.fields.filter(function (field) {
          return field.name === mapping.personaFieldName
        })
        if (filteredField.length > 0) {
          mapping.personaAddress = nextProps.selectedPersona.hash
        }
      }
      let filteredPersonas = nextProps.personas.filter(function (persona: PersonaType) {
        return mapping.personaAddress === persona.hash
      })
      if (filteredPersonas.length > 0) {
        let filteredData = filteredPersonas[0].fields.filter(function (field) {
          return field.name === mapping.personaFieldName
        })
        if (filteredData.length > 0) {
          return {
            value: filteredData[0].data
          }
        }
      }
    }
    return null
  }

  componentDidMount () {
    if (!this.props.field.mapping) {
      let field = this.state.field
      let fieldName = this.props.field.name
      let filteredSuggestions = allSuggestions.filter(function (suggestion: SuggestionType) {
        return suggestion.field.name === fieldName
      })
      if (filteredSuggestions.length > 0) {
        field.mapping = {
          personaAddress: filteredSuggestions[0].persona.hash,
          personaFieldName: filteredSuggestions[0].field.name
        }
        this.setState({
          value: filteredSuggestions[0].field.data,
          field: field
        })
      } else {
        field.mapping = undefined
        this.setState({
          field: field
        })
      }
    }
  }

  public renderInput = (inputProps: any) => {
    const { classes, ref, ...other } = inputProps

    return (
      <div>
        <TextField
          fullWidth={true}
          id='name'
          name='name'
          label={this.props.field.displayName}
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

  public handleChange = (event: any, newVal: any) => {
    let newValue = newVal.newValue
    let field = this.state.field
    let selectedSuggestion = allSuggestions.filter(function (suggestion: SuggestionType) {
      return newValue === suggestion.label
    })
    if (selectedSuggestion.length === 0) {
      if (newVal.newValue.length > 0) {
        field.mapping = {
          personaAddress: this.props.selectedPersona.hash,
          personaFieldName: this.props.field.name
        }
      } else {
        field.mapping = undefined
      }
      this.setState({
        value: newValue,
        field: field
      })
    } else {
      newValue = selectedSuggestion[0].field.data
      field.mapping = {
        personaAddress: selectedSuggestion[0].persona.hash,
        personaFieldName: selectedSuggestion[0].field.name
      }
      this.setState({
        value: newValue,
        field: field
      })
    }
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

  public handleMappingChange = () => {
    this.props.handleMappingChange(this.state.field, this.state.value)
  }

  public render () {
    const { classes, field, profile, personas, selectedPersona } = this.props

    return (
      <div className={classes.root}>
        <Autosuggest
          id='selectedPersonaFieldValue'
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
            onBlur: this.handleMappingChange,
            onChange: this.handleChange,
            value: this.state.value
          }}
        />
        <UsageIcon type={field.usage} reason={field.description} className={classes.icon}/>
        <Mapping classes={classes} profile={profile} field={this.state.field} personas={personas} selectedPersona={selectedPersona} />
      </div>
    )
  }
}

export default withStyles(styles)(AutoCompleteProfileField)
