import React from 'react';

import {TableRow, TableRowColumn} from "material-ui/Table";

import EditIcon from "material-ui/svg-icons/image/edit";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import InlineForm from "../../InlineForm/InlineForm";

const Row = (
    rowData,
    index,
    header,
    handleRemove,
    startEditing,
    editIdx,
    handleSave,
    stopEditing,
    isEditable
  ) => {
    const currentlyEditing = editIdx === index;
    return currentlyEditing ? (
      <TableRow key={`inline__form-${index}`} selectable={false}>
        <InlineForm
          handleSave={handleSave}
          header={header}
          rowData={rowData}
          index={index}
          stopEditing={stopEditing}
        />
      </TableRow>
    ) : (
      <TableRow key={`table__row-${index}`} selectable={false}>
        {header.map((y, k) => <TableRowColumn key={`table__row__column${k}`}>{rowData[y.prop]}</TableRowColumn>)}
        {isEditable && <TableRowColumn>
          <EditIcon onClick={() => startEditing(index)} />
          <HighlightOffIcon onClick={() => handleRemove(index)} />
        </TableRowColumn>}
      </TableRow>
    );
  };

  export default Row;