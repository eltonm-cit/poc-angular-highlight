import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from 'src/environments/environment';

export const myRxStompConfig: InjectableRxStompConfig = {
    brokerURL: 'ws://' + environment.BACKEND_BASE_PATH + '/poc-java',

    connectHeaders: {
        login: 'guest',
        passcode: 'guest'
    },

    heartbeatIncoming: 0,

    heartbeatOutgoing: 20000,

    reconnectDelay: 200,

    debug: (msg: string): void => {
        console.log(new Date(), msg);
    }
};