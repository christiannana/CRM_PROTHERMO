// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-calendrier',
//   templateUrl: './calendrier.component.html',
//   styleUrls: ['./calendrier.component.css']
// })
// export class CalendrierComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }





import { Component, OnInit } from '@angular/core';



import {
  
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isDate,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};




@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierAdminComponent implements OnInit {
  datas_rendezVous: any[];
  progresse: boolean;

  constructor(private modal: NgbModal, public alert: POPUPServiceService, public agentService: ApiAgentService, public serviceAdmin: ApiAdministrationService,) { }

  ngOnInit(): void {
    this.onGet_list_RendezVous();
  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate =  Date.now();
  
  modalData: {
    action: string;
    event: CalendarEvent;
  };
 

  onGet_list_RendezVous() {
    this.progresse = true;
    this.serviceAdmin.onGet_liste_des_RendezVous_All().then(async (res) => {
      let result = await res.json();
      this.datas_rendezVous = result;
      console.log(this.datas_rendezVous);
      this.progresse = false;

        for(var i = 0; i < this.datas_rendezVous.length; i++ ){
        this.datas_rendezVous[i].start = new  Date(this.datas_rendezVous[i].date_rdv) ;
        this.datas_rendezVous[i].title = this.datas_rendezVous[i].commentaire + ' à ' + this.datas_rendezVous[i].heure_rdv +' H , [ Agent: '+ this.datas_rendezVous[i].nom + ', Client: '+ this.datas_rendezVous[i].nom_client + ' ]' ;
       // this.events.push(this.datas_rendezVous[i])
        this.events = [
          ...this.events,
          this.datas_rendezVous[i]
        ];
        this.refresh.next();     console.log(this.date)
       }

    }, function (error) {
      error.message //=> 
      console.log(error)
      this.progresse = false;
    })
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {   
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  date = Date.now()

  onPrint(){
    console.log(this.date)
  }

  events: CalendarEvent[] = []
  event: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start:  startOfDay( Date.now() + 480000 ), // startOfDay(new Date()),
      //end: addDays(new Date(), 10),
      title: 'NANA WANDA CHRISTAIN',
      color: { primary: '#e3bc08',secondary: '#FDF1BA',},
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

 

  dayClicked({ date, events }: { date ; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
   // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }




}
