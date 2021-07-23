import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ChannelService {

  private channel = new Subject<string>();

  refreshChannel(channel: string) {
    this.channel.next(channel);
  }

  removeChannel() {
    this.channel.next();
  }
}
