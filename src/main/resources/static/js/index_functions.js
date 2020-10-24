/**
	ID SERIAL PRIMARY KEY, 
	COMPANY TEXT NOT NULL, 
	ROLE TEXT NOT NULL, 
	CITY TEXT,
	STATE TEXT, 
	COUNTRY TEXT,
	JOB_PLATFORM TEXT NOT NULL,
	DESCRIPTION TEXT,
	REQUIREMENTS TEXT,
    POSTING_DATE DATE NOT NULL DEFAULT CURRENT_DATE,
	JOB_STATUS TEXT NOT NULL
**/

$(function() {
  // var dataModal = (function(){
  // 	// cache DOM
  // 	var $modalDesc = $('.modalDescription')
  // 	var $modalReq = $('.modalRequirements')
  // 	var $modalTitle = $('.modal-title')
  // 	var $position = $('#position')
  // 	var $status = $('#status')
  // 	var $location = $('#location')
  // 	var $platform = $('#platform')
  // 	var $dateApplied = $('#date')

  // 	//bind events

  // })()

  var dataModal = {
    init: function(clickedObj) {
      this.cacheDom();
      this.rowId = this.getRowId(clickedObj);
      this.payload = this.fetchModalData(this.rowId);
      this.render(this.payload);
    },
    cacheDom: function() {
      this.$modalDesc = $(".modalDescription");
      this.$modalReq = $(".modalRequirements");
      this.$modalTitle = $(".modal-title");
      this.$position = $("#position");
      this.$status = $("#status");
      this.$location = $("#location");
      this.$platform = $("#platform");
      this.$dateApplied = $("#date");
    },
    getRowId: function(clickedObj) {
      return $(clickedObj)
        .closest("tr")
        .data("id");
    },
    fetchModalData: function(rowId) {
      var payload = [];
      $.ajax({
        url: "/job-listing/" + rowId,
        type: "GET"
      })
        .done(function(result) {
          console.log(result);
          return result;
        })
        .fail(function() {
          alert("Error, payload was not attained");
        });
      // return payload
    },
    render: function(payload) {
      // console.log(payload)
      console.log(JSON.stringify(payload));
      // this.$modalDesc.html(response[0].description)
      // this.$modalReq.html(response[0].requirements)
      this.$modalTitle.html("Example");
      // this.$position.html('<strong>Position: </strong>' + response[0].role)
      // this.$status.html('<strong>Status: </strong>' + determineStatus(response[0].status))
      // this.$location.html('<strong>Location: </strong>' + response[0].city + ', ' + response[0].state)
      // this.$platform.html('<strong>Job Platform: </strong>' + response[0].job_platform)
      // this.$dateApplied.html('<strong>Date Applied: </strong>' + dateConversion(response[0].posting_date))
    },
    display: function(response) {
      console.log("Render Payload:");
      //   console.log(response);
    }
  };

  var data = [];

  $("#dataTable").DataTable({
    ajax: {
      url: "/display-table",
      dataSrc: function(json) {
        console.log("Returned JSON object in the callback...");
        // console.log(json);
        for (var i = 0; i < json.length; i++) {
          json[i].posting_date = dateConversion(json[i].posting_date);
          json[i].job_status = determineStatus(json[i].job_status);
          data.push(json[i]);
        }
        // console.log(data);
        return data;
      }
    },
    data: data,
    columns: [
      { data: "company" },
      { data: "role" },
      { data: "city" },
      { data: "state" },
      { data: "country" },
      { data: "job_platform" },
      { data: "posting_date" },
      { data: "job_status" },
      {
        defaultContent:
          '<button type="button" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#myModal">' +
          '<i class="far fa-folder-open fa-lg"></i></button>'
      }
    ],
    createdRow: function(row, data, dataIndex) {
      $(row).attr("data-id", data.id);
    },
    initComplete: function(settings, json) {
      $("#myModal")
        .modal({
          keyboard: true,
          backdrop: "static",
          show: false,
          focus: true
        })
        .on("show.bs.modal", function() {
          // dataModal.render(modalData)
          dataModal.init(event.target);
          // var rowId = dataModal.getRowId(event.target)
          // var modalData = dataModal.fetchModalData(rowId)
          // dataModal.render(modalData)
          // dataModal.display(modalData)
          // $.ajax({
          // 	url: '/job-listing/' + row,
          // 	type: 'GET',
          // 	contentType: 'application/json',
          // 	success: function(response){
          // 		// displayModalData(response)
          // 		dataModal.render(response)
          // 	}
          // })
        });
    }

    // 	function displayModal(payload){
    // $('#myModal').modal({
    // 	keyboard: true,
    // 	backdrop: 'static',
    // 	show: true,
    // 	focus: true
    // }).on('show.bs.modal', function(){

    // 	console.log(JSON.parse(payload))
    // 	// const modalDesc = $('.modalDescription')
    // 	// const modalReq = $('.modalRequirements')
    // 	// const modalTitle = $('.modal-title')

    // 	// modalDesc.html(payload[0].description)
    // 	// modalReq.html(payload[0].requirements)
    // 	// modalTitle.html(payload[0].company)

    // 	// console.log(payload[0].description)

    // })
    // 	}

    // }
  });

  function grabId(clickedObj) {
    return $(clickedObj)
      .closest("tr")
      .data("id");
  }

  // $('#dataTable tBody').on('click', 'tr', function(){
  // 	var tableRow = $(this)
  // 	var id = tableRow.closest('tr').data('id')
  // 	var payload = grabPayload(id)
  // 	console.log(payload)
  // 	displayModal(payload)
  // 	// payload = []
  // })

  function grabPayload(id) {
    var payload = [];
    $.ajax({
      url: "/job-listing/" + id,
      type: "GET",
      contentType: "application/json",
      success: function(response) {
        payload.push(response);
      }
    });
    return payload;
  }

  function displayModal(payload) {
    $("#myModal")
      .modal({
        keyboard: true,
        backdrop: "static",
        show: true,
        focus: true
      })
      .on("show.bs.modal", function() {
        console.log("Greetings from open Modal");
        console.log(payload[0].id);
        // const modalDesc = $('.modalDescription')
        // const modalReq = $('.modalRequirements')
        // const modalTitle = $('.modal-title')

        // modalDesc.html(payload[0].description)
        // modalReq.html(payload[0].requirements)
        // modalTitle.html(payload[0].company)

        // console.log(payload[0].description)
        $("#myModal").removeData();
      });
  }

  function determineStatus(status) {
    if (status == "In-Progress") {
      return '<span class="badge badge-success">In Progress</span>';
    } else if (status == "Denied") {
      return '<span class="badge badge-danger">Denied</span>';
    } else {
      return '<span class="badge badge-info">Applied</span>';
    }
  }

  function dateConversion(date) {
    let d = new Date(date);
    console.log(d);
    var choppedYear = d
      .getFullYear()
      .toString()
      .substr(-2);
    return d.getMonth() + 1 + "/" + d.getDate() + "/" + choppedYear;
  }

  // $.ajax({
  // 	url: '/display-table',
  // 	type: 'GET',
  // 	contentType: 'application/json',
  // 	success: function(response){
  // 		const tableElement = $('tbody')

  // 		for(const prop in response){
  // 			let rowID = response[prop].id
  // 			// let status = determineStatus(response[prop].job_status)
  // 			let status = determineStatus("In-Progress")
  // 			let description = response[prop].description
  // 			let requirements = response[prop].requirements
  // 			let tableEntry =  '<tr class="" data-id="' + rowID + '">'+
  // 			'<th scope="row">' + response[prop].company + '</th>'+
  // 			'<td>' + response[prop].role + '</td>'+
  // 			'<td>' + response[prop].city + '</td>'+
  // 			'<td>' + response[prop].state + '</td>'+
  // 			'<td>' + response[prop].country + '</td>'+
  // 			'<td>' + response[prop].job_platform + '</td>'+
  // 			'<td>' + dateConversion(response[prop].posting_date) + '</td>'+
  // 			'<td>' + status + '</td>'+
  // 			// '<td><button type="button" class="btn btn-dark btn-sm description-popover" data-toggle="popover" data-content="' + truncateText(description) +'">Desc.</button></td>'+
  // 			// '<td><button type="reset" class="btn btn-dark btn-sm requirements-popover" data-toggle="popover" data-content="' + truncateText(requirements) + '">'+
  // 			// '<i class="fas fa-clipboard-list fa-lg"></i></button></td>'+
  // 			'<td><button type="button" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#myModal">'+
  //                '<i class="far fa-folder-open fa-lg"></i></button></td>' +
  // 			'</tr>';
  // 			tableElement.append(tableEntry)
  // 		}

  // 		$('#myModal').modal({
  // 			keyboard: true,
  // 			backdrop: 'static',
  // 			show: false,
  // 			focus: true
  // 		}).on('show.bs.modal', function(){
  // 			var getTableRow = $(event.target).closest('tr')
  // 			var getIdFromRow = getTableRow.data('id')
  // 			// Ajax call to get data of specific ID
  // 			const URL_ID = '/job-listing/' + getIdFromRow
  // 			$.ajax({
  // 				url: URL_ID,
  // 				type: 'GET',
  // 				contentType: 'application/json',
  // 				success: function(response){
  // 					const modalDesc = $('.modalDescription')
  // 					const modalReq = $('.modalRequirements')
  // 					const modalTitle = $('.modal-title')
  // 					const position = $('#position')
  // 					const status = $('#status')
  // 					const location = $('#location')
  // 					const platform = $('#platform')
  // 					const dateApplied = $('#date')

  // 					modalDesc.html(response[0].description)
  // 					modalReq.html(response[0].requirements)
  // 					modalTitle.html(response[0].company)
  // 					position.html('<strong>Position: </strong>' + response[0].role)
  // 					status.html('<strong>Status: </strong>' + determineStatus(response[0].status))
  // 					location.html('<strong>Location: </strong>' + response[0].city + ', ' + response[0].state)
  // 					platform.html('<strong>Job Platform: </strong>' + response[0].job_platform)
  // 					dateApplied.html('<strong>Date Applied: </strong>' + dateConversion(response[0].posting_date))

  // 					var radioButtonVal = $('input[name=optradio]:checked').val();

  // 					const deleteItem = $('#deleteRow')
  // 					deleteItem.html('<button type="button" class="btn btn-danger">Delete</button>')
  // 					deleteItem.on('click', function(e){
  // 						if(confirm("Are you sure you want to delete this entry ?")){
  // 							// delete row in database
  // 							const DELETE_URL = '/job-listing/delete/' + getIdFromRow
  // 							$.ajax({
  // 								url: DELETE_URL,
  // 								type: 'DELETE',
  // 								contentType: 'application/json',
  // 								success: function(response){
  // 									// remove from table
  // 									getTableRow.remove()
  // 									/**
  // 										FIX THIS !
  // 									**/
  // 									$('#myModal').modal('hide')
  // 								}
  // 							})
  // 						}else{
  // 							e.preventDefault()
  // 						}
  // 					})

  // 					console.log(radioButtonVal)
  // 				}
  // 			})
  // 		})

  // 		$('.description-popover').popover({
  // 			container: 'body',
  // 			title: 'Description',
  // 			placement: 'left'
  // 		});

  // 		$('.requirements-popover').popover({
  // 			container: 'body',
  // 			title: 'Requirements',
  // 			placement: 'left',
  // 		});

  // function truncateText(textBlock){
  // 	if(textBlock.length > 180){
  // 		// truncate string down to 180
  // 		textBlock = textBlock.substring(0, 180)
  // 		textBlock += '...'
  // 	}
  // 	return textBlock
  // }

  // function determineStatus(status){
  // 	if(status == 'In-Progress'){
  // 		return '<span class="badge badge-success">In Progress</span>'
  // 	}else if(status == 'Denied'){
  // 		return '<span class="badge badge-danger">Denied</span>'
  // 	}else{ return '<span class="badge badge-info">Applied</span>' }
  // }

  // function dateConversion(date){
  // 	let d = new Date(date)
  // 	console.log(d)
  // 	var choppedYear = d.getFullYear().toString().substr(-2)
  // 	return (d.getMonth() + 1) + '/' + d.getDate() + '/' + choppedYear
  // }
  // 	}
  // })
});
