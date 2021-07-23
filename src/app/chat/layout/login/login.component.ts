import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../shared/service/user.service';

@Component({
    selector: 'wt-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Output() updateUserName: EventEmitter<any> = new EventEmitter();

    message: string = '';
    connected: boolean = false;

    @Input()
    userName: string = '';

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
    }

    connect(userName: string) {        
        this.clearData();
        if (userName === null || userName === undefined || userName === '') {
            this.message = 'You must enter a userName';
            return;
        }

        this.userService.login({ 'id': 0, 'userName': userName })
            .subscribe(
                (res: any)  => {
                    this.updateUserName.emit(userName);
                    this.connected = true;
                },
                (error: any)  => {
                    this.message = error.error;
                });
    }

    clearData() {
        sessionStorage.removeItem('user');
        this.message = 'null';
    }
}
