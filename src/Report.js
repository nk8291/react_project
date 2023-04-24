import React, { Component } from "react";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmbedded: false
    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://microsoft.github.io/PowerBI-JavaScript/demo/bower_components/powerbi-client/dist/powerbi.js";
    script.async = true;
    script.onload = () => {
      this.embedReport();
    };
    document.body.appendChild(script);
  }

  embedReport() {
    const { powerbi } = window;
    const { token, embedUrl } = this.props;
    const reportContainer = document.getElementById("reportContainer");
    const reportConfig = {
      type: "report",
      accessToken: token,
      embedUrl: embedUrl,
      id: "7c849985-963e-403c-b7c7-e3f91fb56b8d",
      permissions: 2,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: true
      }
    };
    const report = powerbi.embed(reportContainer, reportConfig);
    report.render();
  }

  render() {
    return <div id="reportContainer" />;
  }
}

export default Report;