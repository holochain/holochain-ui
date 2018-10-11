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
  input: {
    fontSize: 14,
    maxWidth: 368,
    width: 112
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
  suggestions: Array<SuggestionType>
  handleSelectionChange: any
}

// export interface DispatchProps {
//   select: Function
// }
export type Props = OwnProps & StateProps

export interface State {
  suggestions: Array<SuggestionType>
  value: string
}

class AutoCompleteProfileField extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      suggestions: [],
      value: ''
    }
  }
  componentDidMount () {
    allSuggestions = this.props.suggestions
  }
  public renderInput = (inputProps: any) => {
    const { classes, ref, ...other } = inputProps

    return (
      <div>
        <TextField
          fullWidth={true}
          id='name'
          name='name'
          onChange={this.props.handleSelectionChange}
          label='Search'
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
    const newValue = newVal.newValue
    this.setState({
      value: newValue
    })
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
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          onBlur: this.props.handleSelectionChange,
          onChange: this.handleChange,
          value: this.state.value
        }}
      />
    )
  }
}
// export withStyles
export default withStyles(styles)(AutoCompleteProfileField)
