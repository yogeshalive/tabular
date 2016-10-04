/* eslint max-len: 0 */
/* eslint no-alert: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-unused-vars: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('../../../css/tostr.css')

let products = [],
    maximumPriority = 0;

const currencies = [ 'USD', 'GBP', 'EUR' ];
const regions = [ 'North', 'South', 'East', 'West' ];

    $.ajax({
        url: 'http://10.214.33.216:8087/di/warning/',
        success: function (result) {
            result.forEach(function(entry,index) {
              entry.isCredit = entry.isCredit ? "Yes" : "No";
              products.push(entry);
            }, this);
        },
        async: false
    });
  

const cellEditProp = {
  mode: 'click'
};

class NameEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      name: props.defaultValue,
      row: props.row,
      open: true
    };
  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.name);
    let respJSON = JSON.parse(JSON.stringify(this.state.row));
    respJSON.isCredit = respJSON.isCredit === 'Yes' ? true: false;
    $.ajax({
      method: "PUT",
      url: "http://10.214.33.216:8087/di/warning/",
      data: this.state.row,
      success: function(){ }
    })
  }
  render() {
    console.log(this.props);
    const fadeIn = this.state.open ? 'in' : '';
    const display = this.state.open ? 'block' : 'none';
    return (
        <span>
          <input
            ref='inputRef'
            className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
            type='text'
            value={ this.state.name }
            onChange={ e => { this.setState({ name: e.currentTarget.value }); } } 
            onBlur={ this.updateData }/>
        </span>
    );
  }
}



/*
  The getElement function take two arguments,
  1. onUpdate: if you want to apply the modified data, call this function
  2. props: contain customEditorParameters, whole row data, defaultValue and attrs
*/
const createNameEditor = (onUpdate, props) => (<NameEditor onUpdate={ onUpdate } {...props}/>);

export default class CustomCellEditTable extends React.Component {
 
  render() {
    var selectRowProp = {
      mode: "radio", // or checkbox
      clickToSelect: false
    };
    return (
      <BootstrapTable data={ products } cellEdit={ cellEditProp } insertRow={true} deleteRow={true} selectRow={selectRowProp}>
          <TableHeaderColumn dataField='errorCode' isKey={ true }>Code</TableHeaderColumn>
          <TableHeaderColumn
            dataField='isCredit'
            customEditor={ { getElement: createNameEditor } }>
            Credit Warning
          </TableHeaderColumn>
          <TableHeaderColumn 
            dataField='priority'
            customEditor={ { getElement: createNameEditor } }>
            Display Priority
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='staticMessage'
            customEditor={ { getElement: createNameEditor } }>
            Description
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='outcome'
            customEditor={ { getElement: createNameEditor} }>
            Outcome
          </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
