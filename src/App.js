import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import Report from "./Report";
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      reportEmbedUrl: null
    };
  }

  async componentDidMount() {
    const response = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/token",
      {
        grant_type: "client_credentials",
        client_id: "004fe472-d42e-40f1-8c91-7e6e3f918535",
        client_secret: "66s8Q~O0vs6AXzkKJF~PbPhx7IhWsV-EopEhkavx",
        resource: "https://analysis.windows.net/powerbi/api"
      }
    );
    const { access_token } = response.data;
    this.setState({
      token: access_token
    });
    const reportResponse = await axios.get("https://app.powerbi.com/view?r=eyJrIjoiODY1Y2JhMTQtODZlMi00NDM1LWEzOWItMmEzYzJjZGU5MWIwIiwidCI6ImViNDJjZGViLWI3YjUtNGE2ZC1iYzFjLWQxZWJjYmZjNDgyZSJ9", {
      headers: {
        Authorization: 'Bearer ${access_token}'
      }
    });
    const { embedUrl } = reportResponse.data;
    this.setState({
      reportEmbedUrl: embedUrl
    });
  }

  render() {
    const { token, reportEmbedUrl } = this.state;
    if (!token || !reportEmbedUrl) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <h1>React Power BI Embedding</h1>
        <Report token={token} embedUrl={reportEmbedUrl} />
      </div>
    );
  }
}

export default App;

