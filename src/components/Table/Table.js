import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from "material-ui/Table";

import Row from './Row/Row';

export default ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleSave,
  stopEditing,
  isEditable
}) => (
  <Table>
    <TableHeader displaySelectAll={false}>
      <TableRow>
        {header.map((itemHeader, index) => (
          <TableHeaderColumn key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <span>{itemHeader.name}</span>
            </div>
          </TableHeaderColumn>
        ))}
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {data.map((item, index) =>
        Row(
          item,
          index,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleSave,
          stopEditing,
          isEditable
        )
      )}
    </TableBody>
  </Table>
);
