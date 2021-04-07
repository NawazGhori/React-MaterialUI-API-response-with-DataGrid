import React, { Component } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
interface Country {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  flag: string;
}
interface RestState {
  response: Country[];
}

interface RestProps {}
const columns = [
  { field: "name", headerName: "Name", width: 130 },

  { field: "capital", headerName: "Captial", width: 130 },

  { field: "region", headerName: "Region", width: 130 },
  { field: "subregion", headerName: "Sub Region", width: 200 },

  {
    field: "population",
    headerName: "Population",
    type: "number",
    width: 150
  },

  { field: "flag", headerName: "Flag", width: 350 }

  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params:any) =>
  //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];

class Rest extends Component<RestProps, RestState> {
  constructor(props: RestProps) {
    super(props);
    this.state = {
      response: []
    };
  }

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(
      res => {
        console.log(res);
        const { data } = res; //destructuring
        console.log(data);
        const results = data.map((ele, index) => ({
          id: index,
          name: ele.name,
          capital: ele.capital,
          region: ele.region,
          subregion: ele.subregion,
          population: ele.population,
          flag: ele.flag
        }));
        console.log(results);
        this.setState({
          response: results
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  render() {
    console.log(this.state.response);
    return (
      <React.Fragment>
        {/* {JSON.stringify(this.state.response)} */}

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid rows={this.state.response} columns={columns} pageSize={8} />
        </div>
      </React.Fragment>
    );
  }
}

export default Rest;
