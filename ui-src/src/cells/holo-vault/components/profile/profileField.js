import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'
import Save from 'material-ui-icons/Save'
import Dvr from 'material-ui-icons/Dvr'
import ViewListIcon from 'material-ui-icons/ViewList'

function renderInput(inputProps) {
  const { classes, ref, onChange, ...other } = inputProps;

  return (
    <TextField
      name= {inputProps.name}
      fullWidth
      onChange = {onChange}
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text + ' - ' + suggestion.persona + ' (' + suggestion.field + ')'}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label + ' - ' + suggestion.persona + ' (' + suggestion.field + ')'
}

let allSuggestions = []

function setSuggestions(suggestions) {
  allSuggestions = suggestions
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : allSuggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  persona: {
    float: 'right'
  }
});

function UsageIcon(props) {
  switch (props.type) {
    case 'display':
      return (<Tooltip title={props.reason}><Dvr/></Tooltip>)
    case 'store':
      return (<Tooltip title={props.reason}><Save/></Tooltip>)
    case 'index':
      return (<Tooltip title={props.reason}><ViewListIcon/></Tooltip>)
    default:
      return <div>{props.type}</div>
  }
}

class ProfileField extends React.Component {
  state = {
    personaFieldValue: '',
    suggestions: [],
  };


  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    let personaFieldValue  = newValue.split(' - ')[0]
    let personaField = newValue.split(' - ')[1]
    console.log(newValue)
    let removeTyped = false
    if(personaField === undefined)
    {
      personaField = this.props.personaField
    }
    this.setState({
      personaFieldValue: personaFieldValue,
      personaField: personaField
    });
    personaField = personaField.replace(' (', '.').replace(')', '')
    let personaName = personaField.split('.')[0]
    personaField = personaField.split('.')[1]
    console.log(event.currentTarget)
    if(event.target.value === undefined){
      removeTyped = true
    }
    let personaProfileMapping = {'personaName': personaName, 'removeTyped': removeTyped, 'personaFieldValue': personaFieldValue, 'specField' : this.props.specField, 'personaField': personaField}
    this.props.onSelect(personaProfileMapping);
  };

  componentDidMount(){
    setSuggestions(this.props.suggestions)
    this.setState({
      personaField: this.props.personaField,
      personaFieldValue: this.props.personaFieldValue
    });
  }
  render() {
    const { classes, specField, label, usage} = this.props;
    return (
      <div>
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            classes,
            name: specField,
            placeholder: label,
            value: this.state.personaFieldValue,
            onChange: this.handleChange,
          }}
        />
        {usage.map((usage, useIndex) => (
          <UsageIcon key={useIndex} type={usage.type} reason={usage.reason} className={classes.icon}/>)
          )
        }
        <Typography variant='caption' className={classes.persona}>{this.state.personaField}</Typography>
      </div>
    );
  }
}

ProfileField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileField);
