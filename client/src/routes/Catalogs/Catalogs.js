import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";

const getRowId = (row) => row.id;

export default () => {
  const [columns] = useState([
    { name: "id", title: "ID" },
    { name: "name", title: "Name" },
    { name: "gender", title: "Gender" },
    { name: "city", title: "City" },
    { name: "car", title: "Car" },
  ]);
  const [rows, setRows] = useState([
    {
      id: 1,
      FirstName: "John",
      LastName: "Heart",
      Prefix: "Mr.",
      Position: "CEO",
      BirthDate: "1964-03-16",
      HireDate: "1995-01-15",
      Notes:
        "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
      Address: "351 S Hill St.",
      StateID: 5,
    },
    {
      id: 2,
      FirstName: "Olivia",
      LastName: "Peyton",
      Prefix: "Mrs.",
      Position: "Sales Assistant",
      BirthDate: "1981-06-03",
      HireDate: "2012-05-14",
      Notes:
        "Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
      Address: "807 W Paseo Del Mar",
      StateID: 5,
    },
    {
      id: 3,
      FirstName: "Robert",
      LastName: "Reagan",
      Prefix: "Mr.",
      Position: "CMO",
      BirthDate: "1974-09-07",
      HireDate: "2002-11-08",
      Notes:
        "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
      Address: "4 Westmoreland Pl.",
      StateID: 4,
    },
    {
      id: 4,
      FirstName: "Greta",
      LastName: "Sims",
      Prefix: "Ms.",
      Position: "HR Manager",
      BirthDate: "1977-11-22",
      HireDate: "1998-04-23",
      Notes:
        "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
      Address: "1700 S Grandview Dr.",
      StateID: 11,
    },
    {
      id: 5,
      FirstName: "Brett",
      LastName: "Wade",
      Prefix: "Mr.",
      Position: "IT Manager",
      BirthDate: "1968-12-01",
      HireDate: "2009-03-06",
      Notes:
        "Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).",
      Address: "1120 Old Mill Rd.",
      StateID: 13,
    },
    {
      id: 6,
      FirstName: "Sandra",
      LastName: "Johnson",
      Prefix: "Mrs.",
      Position: "Controller",
      BirthDate: "1974-11-15",
      HireDate: "2005-05-11",
      Notes:
        "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
      Address: "4600 N Virginia Rd.",
      StateID: 44,
    },
    {
      id: 7,
      FirstName: "Kevin",
      LastName: "Carter",
      Prefix: "Mr.",
      Position: "Shipping Manager",
      BirthDate: "1978-01-09",
      HireDate: "2009-08-11",
      Notes:
        "Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.",
      Address: "424 N Main St.",
      StateID: 5,
    },
    {
      id: 8,
      FirstName: "Cynthia",
      LastName: "Stanwick",
      Prefix: "Ms.",
      Position: "HR Assistant",
      BirthDate: "1985-06-05",
      HireDate: "2008-03-24",
      Notes:
        "Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!",
      Address: "2211 Bonita Dr.",
      StateID: 4,
    },
    {
      id: 9,
      FirstName: "Kent",
      LastName: "Samuelson",
      Prefix: "Dr.",
      Position: "Ombudsman",
      BirthDate: "1972-09-11",
      HireDate: "2009-04-22",
      Notes:
        "As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.",
      Address: "12100 Mora Dr",
      StateID: 26,
    },
    {
      id: 10,
      FirstName: "Taylor",
      LastName: "Riley",
      Prefix: "Mr.",
      Position: "Network Admin",
      BirthDate: "1982-08-14",
      HireDate: "2012-04-14",
      Notes:
        "If you are like the rest of us at DevAV, then you've probably reached out for help from Taylor. He does a great job as a member of our IT department.",
      Address: "7776 Torreyson Dr",
      StateID: 5,
    },
  ]);
  const [tableColumnExtensions] = useState([{ columnName: "id", width: 60 }]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const changeAddedRows = (value) => {
    const initialized = value.map((row) =>
      Object.keys(row).length ? row : { city: "Tokio" }
    );
    setAddedRows(initialized);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={setEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </Paper>
  );
};
