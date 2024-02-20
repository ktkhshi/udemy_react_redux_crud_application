import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, Navigate } from "react-router-dom";

import { getEvent, deleteEvent, putEvent } from "../actions";
import withRouter from './withRouter';

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
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
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
        <div>
          <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
          {this.state.submitted && <Navigate to='/' /> }
          <Link to="/">Cancel</Link>
          <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
          {this.state.deleted && <Navigate to='/' /> }
        </div>
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
