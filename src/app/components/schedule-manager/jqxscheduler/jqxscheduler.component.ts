import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var $:any; 
declare var jqxSchedular:any;  
@Component({
  selector: 'app-jqxscheduler',
  templateUrl: './jqxscheduler.component.html',
  styleUrls: ['./jqxscheduler.component.css']
})
export class JqxschedulerComponent implements OnInit, OnChanges {

  
  @Input()
  data:any

  constructor() { }

  ngOnChanges(change: SimpleChanges){
    // prepare the data
    // var source =
    // {
    //     dataType: "array",
    //     dataFields: [
    //         { name: 'id', type: 'string' },
    //         { name: 'description', type: 'string' },
    //         { name: 'location', type: 'string' },
    //         { name: 'subject', type: 'string' },
    //         { name: 'calendar', type: 'string' },
    //         { name: 'start', type: 'date' },
    //         { name: 'end', type: 'date' }
    //     ],
    //     id: 'id',
    //     localData: this.data
    // };
    // jqxSchedular.setSource(source);
    // jqxSchedular.init(source);
    var appointments = new Array();
    var appointment1 = {
        id: "id1",
        description: "George brings projector for presentations.",
        location: "",
        subject: "Quarterly Project Review Meeting",
        calendar: "Room 1",
        start: new Date(2015, 10, 23, 9, 0, 0),
        end: new Date(2015, 10, 23, 16, 0, 0)
    }
    var appointment2 = {
        id: "id2",
        description: "",
        location: "",
        subject: "IT Group Mtg.",
        calendar: "Room 2",
        start: new Date(2015, 10, 24, 10, 0, 0),
        end: new Date(2015, 10, 24, 15, 0, 0)
    }
    var appointment3 = {
        id: "id3",
        description: "",
        location: "",
        subject: "Course Social Media",
        calendar: "Room 3",
        start: new Date(2015, 10, 27, 11, 0, 0),
        end: new Date(2015, 10, 27, 13, 0, 0)
    }
    var appointment4 = {
        id: "id4",
        description: "",
        location: "",
        subject: "New Projects Planning",
        calendar: "Room 2",
        start: new Date(2015, 10, 23, 16, 0, 0),
        end: new Date(2015, 10, 23, 18, 0, 0)
    }
    var appointment5 = {
        id: "id5",
        description: "",
        location: "",
        subject: "Interview with James",
        calendar: "Room 1",
        start: new Date(2015, 10, 25, 15, 0, 0),
        end: new Date(2015, 10, 25, 17, 0, 0)
    }
    var appointment6 = {
        id: "id6",
        description: "",
        location: "",
        subject: "Interview with Nancy",
        calendar: "Room 4",
        start: new Date(2015, 10, 26, 14, 0, 0),
        end: new Date(2015, 10, 26, 16, 0, 0)
    }
    appointments.push(appointment1);
    appointments.push(appointment2);
    appointments.push(appointment3);
    appointments.push(appointment4);
    appointments.push(appointment5);
    appointments.push(appointment6);
    // prepare the data
    var source =
    {
        dataType: "array",
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'calendar', type: 'string' },
            { name: 'start', type: 'date' },
            { name: 'end', type: 'date' }
        ],
        id: 'id',
        localData: appointments
    };
    var adapter = new $.jqx.dataAdapter(source);
    let subtract = window.innerWidth > 992 ? 150 : 50
    $("#scheduler").jqxScheduler({
        date: new $.jqx.date(2015, 11, 23),
        width: window.innerWidth - subtract,
        height: 500,
        source: adapter,
        view: 'weekView',
        theme: 'energyblue',
        showLegend: true,
        ready: function () {
            $("#scheduler").jqxScheduler('ensureAppointmentVisible', 'id1');
        },
        resources:
        {
            colorScheme: "scheme05",
            dataField: "calendar",
            source: new $.jqx.dataAdapter(source)
        },
        appointmentDataFields:
        {
            from: "start",
            to: "end",
            id: "id",
            description: "description",
            location: "place",
            subject: "subject",
            resourceId: "calendar"
        },
        views:
        [
            'dayView',
            'weekView',
            'monthView'
        ]
    });
  }

  ngOnInit() { 
    this.loadScript("./assets/js/scripts/jquery-1.12.4.min.js");
    this.loadScript("./assets/js/jqwidgets/jqxcore.js");
    this.loadScript("./assets/js/jqwidgets/jqxbuttons.js");
    this.loadScript("./assets/js/jqwidgets/jqxscrollbar.js");
    this.loadScript("./assets/js/jqwidgets/jqxdata.js");
    this.loadScript("./assets/js/jqwidgets/jqxdate.js");
    this.loadScript("./assets/js/jqwidgets/jqxscheduler.js");
    this.loadScript("./assets/js/jqwidgets/jqxscheduler.api.js");
    this.loadScript("./assets/js/jqwidgets/jqxdatetimeinput.js");
    this.loadScript("./assets/js/jqwidgets/jqxmenu.js");
    this.loadScript("./assets/js/jqwidgets/jqxcalendar.js");
    this.loadScript("./assets/js/jqwidgets/jqxtooltip.js");
    this.loadScript("./assets/js/jqwidgets/jqxwindow.js");
    this.loadScript("./assets/js/jqwidgets/jqxcheckbox.js");
    this.loadScript("./assets/js/jqwidgets/jqxlistbox.js");
    this.loadScript("./assets/js/jqwidgets/jqxdropdownlist.js");
    this.loadScript("./assets/js/jqwidgets/jqxnumberinput.js");
    this.loadScript("./assets/js/jqwidgets/jqxradiobutton.js");
    this.loadScript("./assets/js/jqwidgets/jqxinput.js");
    this.loadScript("./assets/js/jqwidgets/globalization/globalize.js");
    this.loadScript("./assets/js/jqwidgets/globalization/globalize.culture.de-DE.js");
    this.loadScript("./assets/js/scripts/demos.js");

    var appointments = new Array();
    var appointment1 = {
        id: "id1",
        description: "George brings projector for presentations.",
        location: "",
        subject: "Quarterly Project Review Meeting",
        calendar: "Room 1",
        start: new Date(2015, 10, 23, 9, 0, 0),
        end: new Date(2015, 10, 23, 16, 0, 0)
    }
    var appointment2 = {
        id: "id2",
        description: "",
        location: "",
        subject: "IT Group Mtg.",
        calendar: "Room 2",
        start: new Date(2015, 10, 24, 10, 0, 0),
        end: new Date(2015, 10, 24, 15, 0, 0)
    }
    var appointment3 = {
        id: "id3",
        description: "",
        location: "",
        subject: "Course Social Media",
        calendar: "Room 3",
        start: new Date(2015, 10, 27, 11, 0, 0),
        end: new Date(2015, 10, 27, 13, 0, 0)
    }
    var appointment4 = {
        id: "id4",
        description: "",
        location: "",
        subject: "New Projects Planning",
        calendar: "Room 2",
        start: new Date(2015, 10, 23, 16, 0, 0),
        end: new Date(2015, 10, 23, 18, 0, 0)
    }
    var appointment5 = {
        id: "id5",
        description: "",
        location: "",
        subject: "Interview with James",
        calendar: "Room 1",
        start: new Date(2015, 10, 25, 15, 0, 0),
        end: new Date(2015, 10, 25, 17, 0, 0)
    }
    var appointment6 = {
        id: "id6",
        description: "",
        location: "",
        subject: "Interview with Nancy",
        calendar: "Room 4",
        start: new Date(2015, 10, 26, 14, 0, 0),
        end: new Date(2015, 10, 26, 16, 0, 0)
    }
    appointments.push(appointment1);
    appointments.push(appointment2);
    appointments.push(appointment3);
    appointments.push(appointment4);
    appointments.push(appointment5);
    appointments.push(appointment6);
    // prepare the data
    var source =
    {
        dataType: "array",
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'calendar', type: 'string' },
            { name: 'start', type: 'date' },
            { name: 'end', type: 'date' }
        ],
        id: 'id',
        localData: appointments
    };
    var adapter = new $.jqx.dataAdapter(source);
    let subtract = window.innerWidth > 992 ? 150 : 50
    $("#scheduler").jqxScheduler({
        date: new $.jqx.date(2015, 11, 23),
        width: window.innerWidth - subtract,
        height: 500,
        source: adapter,
        view: 'weekView',
        theme: 'energyblue',
        showLegend: true,
        ready: function () {
            $("#scheduler").jqxScheduler('ensureAppointmentVisible', 'id1');
        },
        resources:
        {
            colorScheme: "scheme05",
            dataField: "calendar",
            source: new $.jqx.dataAdapter(source)
        },
        appointmentDataFields:
        {
            from: "start",
            to: "end",
            id: "id",
            description: "description",
            location: "place",
            subject: "subject",
            resourceId: "calendar"
        },
        views:
        [
            'dayView',
            'weekView',
            'monthView'
        ]
    });



    $("#scheduler").on('appointmentDelete', function (event:any) {
      var args = event.args;
      var appointment = args.appointment;
      $("#log").html("appointmentDelete is raised");
    });
    $("#scheduler").on('appointmentAdd', function (event:any) {
        var args = event.args;
        var appointment = args.appointment;
        $("#log").html("appointmentAdd is raised");
    });
    $("#scheduler").on('appointmentDoubleClick', function (event:any) {
        var args = event.args;
        var appointment = args.appointment;
        // appointment fields
        // originalData - the bound data.
        // from - jqxDate object which returns when appointment starts.
        // to - jqxDate objet which returns when appointment ends.
        // status - String which returns the appointment's status("busy", "tentative", "outOfOffice", "free", "").
        // resourceId - String which returns the appointment's resouzeId
        // hidden - Boolean which returns whether the appointment is visible.
        // allDay - Boolean which returns whether the appointment is allDay Appointment.
        // resiable - Boolean which returns whether the appointment is resiable Appointment.
        // draggable - Boolean which returns whether the appointment is resiable Appointment.
        // id - String or Number which returns the appointment's ID.
        // subject - String which returns the appointment's subject.
        // location - String which returns the appointment's location.
        // description - String which returns the appointment's description.
        // tooltip - String which returns the appointment's tooltip.
        $("#log").html("appointmentDoubleClick is raised");
    });
    $("#scheduler").on('cellClick', function (event:any) {
        var args = event.args;
        var cell = args.cell;
      
        $("#log").html("cellClick is raised");
    });
    $("#scheduler").on('appointmentChange', function (event:any) {
        var args = event.args;
        var appointment = args.appointment;
        // appointment fields
        // originalData - the bound data.
        // from - jqxDate object which returns when appointment starts.
        // to - jqxDate objet which returns when appointment ends.
        // status - String which returns the appointment's status("busy", "tentative", "outOfOffice", "free", "").
        // resourceId - String which returns the appointment's resouzeId
        // hidden - Boolean which returns whether the appointment is visible.
        // allDay - Boolean which returns whether the appointment is allDay Appointment.
        // resiable - Boolean which returns whether the appointment is resiable Appointment.
        // draggable - Boolean which returns whether the appointment is resiable Appointment.
        // id - String or Number which returns the appointment's ID.
        // subject - String which returns the appointment's subject.
        // location - String which returns the appointment's location.
        // description - String which returns the appointment's description.
        // tooltip - String which returns the appointment's tooltip.
        $("#log").html("appointmentChange is raised");
    });
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
