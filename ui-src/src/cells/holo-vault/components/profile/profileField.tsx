// import * as React from 'react'
// import * as Autosuggest from 'react-autosuggest'
// const match = require('autosuggest-highlight/match')  // tslint:disable-line
// const parse = require('autosuggest-highlight/parse')  // tslint:disable-line
// import TextField from '@material-ui/core/TextField'
// import Paper from '@material-ui/core/Paper'
// import MenuItem from '@material-ui/core/MenuItem'
// import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'
// import Tooltip from '@material-ui/core/Tooltip'
// import Save from '@material-ui/icons/Save'
// import Dvr from '@material-ui/icons/Dvr'
// import ViewListIcon from '@material-ui/icons/ViewList'
// import { Suggestion as SuggestionType } from '../../types/suggestion'
// import { Part as PartType } from '../../types/part'
// import { UsageType } from '../../types/profile'
//
// const styles: StyleRulesCallback = (theme: Theme) => ({
//   container: {
//     flexGrow: 1,
//     position: 'relative'
//   },
//   suggestionsContainerOpen: {
//     position: 'absolute',
//     zIndex: 1,
//     marginTop: theme.spacing.unit,
//     left: 0,
//     right: 0
//   },
//   suggestion: {
//     display: 'block'
//   },
//   suggestionsList: {
//     margin: 0,
//     padding: 0,
//     listStyleType: 'none'
//   },
//   persona: {
//     float: 'right'
//   }
// })
//
// function renderInput (inputProps: any) {
//   const { classes, ref, onChange, ...other } = inputProps
//
//   return (
//     <TextField
//       name={inputProps.name}
//       fullWidth={true}
//       onChange={onChange}
//       InputProps={{
//         inputRef: ref,
//         classes: {
//           input: classes.input
//         },
//         ...other
//       }}
//     />
//   )
// }
//
// function renderSuggestion (suggestion: SuggestionType, { query, isHighlighted }) {
//   const matches = match(suggestion.label, query)
//   const parts: Array<PartType> = parse(suggestion.label, matches)
//
//   return (
//     <MenuItem selected={isHighlighted} component='div'>
//       <div>
//         {parts.map((part, index) => {
//           return part.highlight ? (
//             <span key={String(index)} style={{ fontWeight: 300 }}>
//               {part.text}
//             </span>
//           ) : (
//             <strong key={String(index)} style={{ fontWeight: 500 }}>
//               {part.text + ' - ' + suggestion.persona + ' (' + suggestion.field + ')'}
//             </strong>
//           )
//         })}
//       </div>
//     </MenuItem>
//   )
// }
//
// function renderSuggestionsContainer (options: any) {
//   const { containerProps, children } = options
//
//   return (
//     <Paper {...containerProps} square={true}>
//       {children}
//     </Paper>
//   )
// }
//
// function getSuggestionValue (suggestion: any) {
//   return suggestion.label + ' - ' + suggestion.persona + ' (' + suggestion.field + ')'
// }
//
// let allSuggestions: Array<SuggestionType> = []
//
// function getSuggestions (value: string) {
//   console.log('get suggestions')
//   const inputValue = value.trim().toLowerCase()
//   const inputLength = inputValue.length
//   let count = 0
//
//   return inputLength === 0
//     ? []
//     : allSuggestions.filter(suggestion => {
//       const keep = count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue
//       if (keep) {
//         count += 1
//       }
//       console.log(keep)
//       return keep
//     })
// }
//
// // function UsageIcon (props: any) {
// //   switch (props.type) {
// //     case 'display':
// //       return (<Tooltip title={props.reason}><Dvr/></Tooltip>)
// //     case 'store':
// //       return (<Tooltip title={props.reason}><Save/></Tooltip>)
// //     case 'index':
// //       return (<Tooltip title={props.reason}><ViewListIcon/></Tooltip>)
// //     default:
// //       return <div>{props.type}</div>
// //   }
// // }
//
// export interface OwnProps {
//   classes?: any
// }
//
// export interface StateProps {
//   specField: string
//   personaField: string
//   personaFieldValue: string
//   label: string
//   suggestions: Array<SuggestionType>
//   usage: Array<UsageType>
// }
//
// export interface DispatchProps {
//   select: Function
// }
// export type Props = OwnProps & StateProps & DispatchProps
//
// export interface State {
//   personaFieldValue: string
//   personaField: string
//   suggestions: Array<SuggestionType>
// }
//
// class ProfileField extends React.Component<Props, State> {
//   state = {
//     personaFieldValue: '',
//     personaField: '',
//     suggestions: []
//   }
//
//   handleSuggestionsFetchRequested = (value: any) => {
//     console.log('handleSuggestionsFetchRequested')
//     this.setState({
//       suggestions: getSuggestions(value)
//     })
//   }
//
//   handleSuggestionsClearRequested = () => {
//     this.setState({
//       suggestions: []
//     })
//   }
//
//   handleChange = (e: any) => {
//     // console.log('handleChange')
//     // console.log('suggestions ' + this.state.suggestions)
//     //
//     // let personaFieldValue = newValue.split(' - ')[0]
//     // let personaField = newValue.split(' - ')[1]
//     // console.log(newValue)
//     // let removeTyped = false
//     // if (personaField === undefined) {
//     //   personaField = this.props.personaField
//     // }
//     // this.setState({
//     //   personaFieldValue: personaFieldValue,
//     //   personaField: personaField
//     // })
//     // personaField = personaField.replace(' (', '.').replace(')', '')
//     // let personaName = personaField.split('.')[0]
//     // personaField = personaField.split('.')[1]
//     // console.log(event.currentTarget)
//     // if (event.target.value === undefined) {
//     //   removeTyped = true
//     // }
//     // let personaProfileMapping = { 'personaName': personaName, 'removeTyped': removeTyped, 'personaFieldValue': personaFieldValue, 'specField' : this.props.specField, 'personaField': personaField }
//     // this.props.select(personaProfileMapping)
//   }
//
//   componentDidMount () {
//     allSuggestions = this.props.suggestions
//     this.setState({
//       personaField: this.props.personaField,
//       personaFieldValue: this.props.personaFieldValue
//     })
//   }
//   render () {
//     const { classes, specField, label } = this.props
//     return (
//       <div>
//         <Autosuggest
//           theme={{
//             container: classes.container,
//             suggestionsContainerOpen: classes.suggestionsContainerOpen,
//             suggestionsList: classes.suggestionsList,
//             suggestion: classes.suggestion
//           }}
//           renderInputComponent={renderInput}
//           suggestions={this.state.suggestions}
//           onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
//           onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
//           renderSuggestionsContainer={renderSuggestionsContainer}
//           getSuggestionValue={getSuggestionValue}
//           renderSuggestion={renderSuggestion}
//           inputProps={{
//             classes,
//             name: specField,
//             placeholder: label,
//             value: this.state.personaFieldValue,
//             onChange: (e) => this.handleChange(e)
//           }}
//         />
//         {/* {usage.map((usage, useIndex: number) => (
//           <UsageIcon key={useIndex} type={usage.type} reason={usage.reason} className={classes.icon}/>)
//           )
//         } */}
//         <Typography variant='caption' className={classes.persona}>{this.state.personaField}</Typography>
//       </div>
//     )
//   }
// }
//
// export default withStyles(styles)(ProfileField)
