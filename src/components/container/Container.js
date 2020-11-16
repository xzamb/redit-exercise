import React, { useState, useEffect } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import _ from 'lodash';
import {connect} from 'react-redux';

import './Container.css';

import {Button} from '@material-ui/core';

import Form from "../Form/Form";
import Table from "../Table/Table";

import {updateItemsList} from '../../store/actions';

import Modal from '../ui/Modal/Modal';

const Container = (props) => {

  const [editIndex, setEditIndex] = useState(-1);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    setHasData(props.table.data.length > 0);
  }, [props.table.data])

  const handleRemove = i => {
    const updatedData = props.table.data.filter((_, j) => j !== i);
    props.updateItemsList(updatedData);
    setHasData(updatedData.length > 0);
  };

  const startEditing = i => setEditIndex(i)

  const stopEditing = () => setEditIndex(-1);

  const handleSave = (index, data) => {
    const updatedTableData = props.table.data.map((row, j) => (j === index ? data : row))
    props.updateItemsList(updatedTableData);
    stopEditing();
  };

  const camelCaseToText = (value) => {
    var result = value.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const generateTableHeaders = () => {
    const {table} = props;
    if(table.data.length > 0){
        return Object.keys(table.data[0]).filter(value => value != "id").map(label => {
            return {
              name: camelCaseToText(label),
              prop: label
            }
          });
    }
    return [];
  }

  const handleEditButton = () => setIsEditable(!isEditable);

  const handleToggleModal = () => setIsAddingNewItem(!isAddingNewItem);

  const handleAddNewItem = submittedData => {
    const updatedTableData = [...props.table.data, submittedData];
    props.updateItemsList(updatedTableData);
    handleToggleModal();
  }

    return (
      <MuiThemeProvider>
        <div className="container">
          {hasData && <Modal 
            show={isAddingNewItem}
            handleClose={handleToggleModal}>
            <Form
              header={generateTableHeaders()}
              onSubmit={submitted =>handleAddNewItem(submitted)}
              handleClose={handleToggleModal}
          />
          </Modal>}
            <h2>{props.table.title}</h2>
              {hasData? <Table
                    handleRemove={handleRemove}
                    startEditing={startEditing}
                    editIdx={editIndex}
                    stopEditing={stopEditing}
                    handleSave={handleSave}
                    data={props.table.data}
                    header={generateTableHeaders()}
                    isEditable={isEditable}
              /> : <div><h4>There's no data...</h4></div>
              }
            {hasData && <div className="container__buttons__editing">
              {isEditable && <Button id="container__buttons__add" onClick={handleToggleModal}>Add</Button>}
              <Button 
                id="container__buttons__edit"
                onClick={handleEditButton}>{isEditable? "Cancel" : "Edit"}</Button>
            </div>}
        </div>
      </MuiThemeProvider>
    );
}

const mapDispatchToProps = (dispatch, props) => ({
  updateItemsList: tableData => dispatch(updateItemsList(props.match.params.tableId, tableData))
});

const mapStateToProps = (state, props) => ({
   table: _.find(state, 'id', props.match.params.tableId)
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
