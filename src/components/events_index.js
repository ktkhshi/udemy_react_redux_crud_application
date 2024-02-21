import React, { Component } from "react";
import { connect } from "react-redux";
import _ from 'lodash'
import { Link } from "react-router-dom";

import { readEvents } from "../actions";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents()
  }
  
  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableCell>{event.id}</TableCell>
        <TableCell>
          <Link to={`/events/${event.id}`} >
            {event.title}
          </Link>
          </TableCell>
        <TableCell>{event.body}</TableCell>
      </TableRow>
    ))
  }
  
  render() {
    const style = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    }
    return (
      <React.Fragment>
          <Fab href="/events/new" className="classes.fab"
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
          color="primary">
            <AddIcon />
          </Fab>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderEvents()}
            </TableBody>
          </Table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })

const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
