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

const styles: StyleRulesCallback = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  formControl: {
    background: 'red'
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
  }
})

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

export interface Props {
  value: string,
  classes?: any,
  suggestions: Array<any>
  handleChange: (value: string, selectedSuggestion: any) => void,
  handleSubmit: (event: any, params: any) => void
}

export interface State {
  value: string
}

class AutoCompleteTextField extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  static getDerivedStateFromProps (props: Props, state: State) {
    if (state.value === '') {
      return {
        value: props.value
      }
    } else {
      return null
    }

  }

  public handleSuggestionsFetchRequested = ({ value }: { value: any }) => {
    return this.props.suggestions
  }

  public handleSuggestionsClearRequested = () => {
    return
  }

  // public handleChange = (event: any, newVal: any) => {
  //   let newValue = newVal.newValue
  //   let field = this.state.field
  //   let selectedSuggestion = allSuggestions.filter(function (suggestion: SuggestionType) {
  //     return newValue === suggestion.label
  //   })
  //   if (selectedSuggestion.length === 0) {
  //     field.mapping = undefined
  //     this.setState({
  //       value: newValue,
  //       field: field
  //     })
  //   } else {
  //     newValue = selectedSuggestion[0].field.data
  //     field.mapping = {
  //       personaHash: selectedSuggestion[0].persona.hash,
  //       personaFieldName: selectedSuggestion[0].field.name
  //     }
  //     this.setState({
  //       value: newValue,
  //       field: field
  //     })
  //   }
  // }

  public handleTextInputChange = (event: any, newVal: any) => {
    let newValue = newVal.newValue
    let selectedSuggestion = this.props.suggestions.filter(function (suggestion: SuggestionType) {
      return newValue === suggestion.label
    })
    if (selectedSuggestion.length === 0) {
      this.setState({
        value: event.target.value
      })
    } else {
      this.setState({
        value: newValue
      })
    }

    this.props.handleChange(event.target.value, selectedSuggestion)
  }

  public renderInput = (inputProps: any) => {
    const { classes, ref, ...other } = inputProps

    return (
      <div>
        <TextField
          fullWidth={true}
          id='name'
          name='name'
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

  public render () {
    const { classes } = this.props
    return (
      <Autosuggest
        id='selectedPersonaFieldValue'
        theme={{
          container: classes.container,
          suggestion: classes.suggestion,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.props.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes: classes,
          onBlur: this.props.handleSubmit,
          onChange: this.handleTextInputChange,
          value: this.state.value
        }}
      />
    )
  }
}

export default withStyles(styles)(AutoCompleteTextField)
