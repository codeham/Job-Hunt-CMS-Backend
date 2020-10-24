$(function() {
  /**
   * Data table
   */
  let tableData = [];
  $("#dataTable").DataTable({
    ajax: {
      url: "/cms-storage/all-job-listings",
      dataSrc: json => {
        console.log("JSON call...");
        console.log(typeof json);
        console.log(json)
        for (let i = 0; i < json.length; i++) {
          json[i].postingDate = dateConversion(json[i].postingDate);
          json[i].jobStatus = determineStatus(json[i].jobStatus);
          tableData.push(json[i]);
        }
        console.log(tableData);
        return tableData;
      }
    },
    data: tableData,
    columns: [
      { data: "company" },
      { data: "position" },
      { data: "city" },
      { data: "state" },
      { data: "country" },
      { data: "platform" },
      { data: "postingDate" },
      { data: "jobStatus" },
      {
        defaultContent:
          '<button type="button" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#myModal">' +
          '<i class="far fa-folder-open fa-lg"></i></button>'
      }
    ]
  });

  /**
   * determines which badge to display in status column
   * @param {} status
   */
  function determineStatus(status) {
    if (status == "In-Progress") {
      return '<span class="badge badge-success">In Progress</span>';
    } else if (status == "Denied") {
      return '<span class="badge badge-danger">Denied</span>';
    } else {
      return '<span class="badge badge-info">Applied</span>';
    }
  }

  /**
   * date format converter
   * format: mm/dd/yy
   * @param {} date
   */
  function dateConversion(date) {
    let d = new Date(date);
    console.log(d);
    var choppedYear = d
      .getFullYear()
      .toString()
      .substr(-2);
    return d.getMonth() + 1 + "/" + d.getDate() + "/" + choppedYear;
  }
});
