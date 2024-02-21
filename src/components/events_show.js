import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, Navigate } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import { getEvent, deleteEvent, putEvent } from "../actions";
import withRouter from './withRouter';
import { purple, green } from "@mui/material/colors";

class EventsShow extends Component {
  state = { submitted : false, deleted: false }
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const id = this.props.params.id
    if (id) this.props.getEvent(id)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field
  
    return (
      <TextField
        error={(touched && error) ? true : false}
        id="filled-error-helper-text" 
        label={label}
        type={type}
        helperText={touched && error}
        {...input}
        fullWidth={ true }
        sx = {{ 
          margin : 1, 
          fontSize : 20
        }}
        variant="filled"
      />
    )
  }

  async onDeleteClick() {
    const id = this.props.params.id
    await this.props.deleteEvent(id)
    this.setState({deleted: true})
  }

  async onSubmit(values) {
    await this.props.putEvent(values)
    this.setState({submitted: true})
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}> 
        <div><Field label="Title" name ="title" type="text" component={this.renderField} /></div>
        <div><Field label="Body" name ="body" type="text" component={this.renderField} /></div>
        <Button 
          variant="contained" 
          label="Submit" 
          type='Submit'
          startIcon={<DoneIcon />}
          disabled={ pristine || submitting || invalid }
          sx={{ 
            marginTop : 2,
            marginLeft : 2,
            backgroundColor: green[500],
            '&:hover': {
              backgroundColor: green[700],
            },
          }}>
            Submit
        </Button>
        {this.state.submitted && <Navigate to='/' /> }
        <Button 
          variant="contained" 
          label="Cancel"
          href="/"
          startIcon={<CloseIcon />}
          sx={{ 
              marginTop : 2,
              marginLeft : 2
            }}>
            Cancel
        </Button>
        <Button 
          variant="contained" 
          label="Delete"
          startIcon={<DeleteIcon />}
          onClick={() => { this.onDeleteClick(); }}
          sx={{ 
              marginTop : 2,
              marginLeft : 2,
              backgroundColor: purple[500],
              '&:hover': {
                backgroundColor: purple[700],
              },
            }}>
            Delete
        </Button>
        {this.state.deleted && <Navigate to='/' /> }
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.params
  const event = state.events[id]
  return { initialValues: event, event }
}
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow))
)
