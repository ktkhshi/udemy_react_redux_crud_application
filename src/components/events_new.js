import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import { postEvent } from "../actions";

class EventsNew extends Component {
  state = { submitted : false }
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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

  async onSubmit(values) {
    await this.props.postEvent(values)
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
            marginLeft : 2
          }}>
            Submit
        </Button>
        {this.state.submitted && <Navigate to='/' /> }
        <Button 
          variant="contained" 
          label="Cancel"
          href="/"
          startIcon={<DeleteIcon />}
          sx={{ 
              marginTop : 2,
              marginLeft : 2
            }}>
            Cancel
        </Button>
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

const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
