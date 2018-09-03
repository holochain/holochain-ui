import React, {Component} from 'react'
import { Route, withRouter } from 'react-router-dom'
import {Board} from 'react-trello'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});


const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}


class Errand extends Component {
    constructor (props) {
      super(props);
      this.state = {
        boardData: { lanes: [] },
        eventBus: ""
      };
    }
    initApp = () => {
      setInterval(
        () => {
          // this.props.getBoardState();
          // const laneData = this.props.state;
          // this.setState({
          //   boardData:  {
          //     "lanes": [
          //       {
          //         "id": "TASK",
          //         "title": "Planned Tasks",
          //         "label": "20/70",
          //         "style": {"width": 280},
          //         "cards": [
          //           {
          //           "id": "Plan1",
          //             "title": "Buy milk",
          //             "label": "15 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "2 Gallons of milk at the Deli store"
          //           },
          //           {
          //             "id": "Plan2",
          //             "title": "Dispose Garbage",
          //             "label": "10 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Sort out recyclable and waste as needed"
          //           },
          //           {
          //             "id": "Plan3",
          //             "title": "Write Blog",
          //             "label": "30 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Can AI make memes?"
          //           },
          //           {
          //             "id": "Plan4",
          //             "title": "Pay Rent",
          //             "label": "5 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Transfer to bank account"
          //           }
          //         ]
          //       },
          //       {
          //         "id": "WIP",
          //         "title": "Work In Progress",
          //         "label": "10/20",
          //         "style": {"width": 280},
          //         "cards": [
          //           {
          //             "id": "Wip1",
          //             "title": "Clean House",
          //             "label": "30 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
          //           }
          //         ]
          //       },
          //       {
          //         "id": "BLOCKED",
          //         "title": "Blocked",
          //         "label": "0/0",
          //         "style": {"width": 280},
          //         "cards": []
          //       },
          //       {
          //         "id": "COMPLETED",
          //         "title": "Completed",
          //         "style": {"width": 280},
          //         "label": "2/5",
          //         "cards": [
          //           {
          //             "id": "Completed1",
          //             "title": "Practice Meditation",
          //             "label": "15 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Use Headspace app"
          //           },
          //           {
          //             "id": "Completed2",
          //             "title": "Maintain Daily Journal",
          //             "label": "15 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Use Spreadsheet for now"
          //           }
          //         ]
          //       },
          //       {
          //         "id": "REPEAT",
          //         "title": "Repeat",
          //         "style": {"width": 280},
          //         "label": "1/1",
          //         "cards": [
          //           {
          //             "id": "Repeat1",
          //             "title": "Morning Jog",
          //             "label": "30 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Track using fitbit"
          //           }
          //         ]
          //       },
          //       {
          //         "id": "ARCHIVED",
          //         "title": "Archived",
          //         "style": {"width": 280},
          //         "label": "1/1",
          //         "cards": [
          //           {
          //             "id": "Archived1",
          //             "title": "Go Trekking",
          //             "label": "300 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Completed 10km on cycle"
          //           }
          //         ]
          //       },
          //       {
          //         "id": "ARCHIVED2",
          //         "title": "Archived2",
          //         "style": {"width": 280},
          //         "label": "1/1",
          //         "cards": [
          //           {
          //             "id": "Archived1",
          //             "title": "Go Trekking",
          //             "label": "300 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Completed 10km on cycle"
          //           }
          //         ]
          //       },
          //       {
          //         "id": "ARCHIVED3",
          //         "title": "Archived3",
          //         "style": {"width": 280},
          //         "label": "1/1",
          //         "cards": [
          //           {
          //             "id": "Archived1",
          //             "title": "Go Trekking",
          //             "label": "300 mins",
          //             "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          //             "description": "Completed 10km on cycle"
          //           }
          //         ]
          //       }
          //     ]
          //   }
          // })
          //console.log("PROPS", this.props)

        },
        500
      );
    }

    componentDidMount() {
      this.initApp()
      this.props.getBoardState()
      }

    setEventBus = eventBus => {
      console.log("setEventBus")
        this.setState({eventBus})
        console.log(this.state)
    }

    onDataChange = nextData => {
        console.log('onDataChange(New card has been added)')
        console.log(nextData)
    };

  	onCardAdd = (cards, laneId) => {
  		console.log(`onCardAdd( New card added to lane ${ laneId })`)
  		console.dir( cards )
      this.props.addCard( cards,laneId );
  	};

    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
        this.props.moveCard(cardId, sourceLaneId, targetLaneId);
    }

    onCardDelete = (cardId,laneId)=>{
      //TODO delete callback to HC
      console.log("onCardDelete: ", cardId,laneId);
      this.props.deleteCard(cardId,laneId);
    };

    onCardClick = (cardId, metadata, laneId)=>{
      //TODO Expand the Card to see better and edit
      console.log("onCardClick: ",cardId, metadata , laneId);
    };

    // completeCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'COMPLETED',
    //         card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
    //     })
    //     this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    // };
    //
    // addCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'BLOCKED',
    //         card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
    //     })
    // };

    // componentWillMount(){
    //   // fetchJSON('/fn/boards/getBoard').then(() =>{
    //   //
    //   // });
    // }

    render() {
      const {classes, boardData} = this.props;
      return (<div className={classes.root}>
                <Board
                  data={boardData}
                  eventBusHandle={this.setEventBus}
                  draggable={true}
                  // laneDraggable={true} /*default*/
                  // cardDraggable={true} /*default*/
                  collapsibleLanes={true}
                  editable={true}
                  // handleDragStart={this.handleDragStart}
                  handleDragEnd={this.handleDragEnd}
                  onCardClick={this.onCardClick}
                  onCardAdd={this.onCardAdd}
                  onCardDelete={this.onCardDelete}
                  onDataChange={this.onDataChange}
                  />
              </div>
        )
    }
}


// const mapDispatchToProps = dispatch => {
//   return {
//     getBoardState: () => dispatch(getBoardState()),
//   }
// }

export default withRoot(withStyles(styles)(withRouter(Errand)));
