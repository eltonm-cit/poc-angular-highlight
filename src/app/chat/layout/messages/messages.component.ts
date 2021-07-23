import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../shared/model/message';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'wt-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  newMessage: string = '';
  channelId: string = Md5.hashStr("group").toString();
  filteredMessages: Array<Message> = [];

  @Input()
  userName: string = '';

  constructor(private stompService: RxStompService) { }

  ngOnInit() {
    this.startListeningChannel();
  }

  sendMessage() {
    if (this.newMessage) {
      this.stompService.publish({
        destination: '/app/messages', body:
          JSON.stringify({
            'channel': this.channelId,
            'sender': this.userName,
            'content': this.newMessage
          })
      });
      this.newMessage = '';
    }
  }

  startListeningChannel() {
    this.stompService.watch(`/channel/chat/${this.channelId}`).subscribe(res => {
      console.log('caindo', res);
      const data: Message = JSON.parse(res.body);
      this.filteredMessages.push(data);
    });
  }
}
