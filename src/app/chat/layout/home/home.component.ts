import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wt-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    receiver: string = '';
    userName: string = '';

    constructor() { }
        
    ngOnInit() {
    }

    updateUserName(evt: any) {
        this.userName = evt;
    }
}
