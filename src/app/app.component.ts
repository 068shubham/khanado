import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xo';

  ws: WebSocket;

  ngOnInit() {
    // this.ws = this.getWebSocket();
  }

  getWebSocket() {
    let ws = new WebSocket('ws://localhost:9000/api/ws');
    ws.onmessage = function (msg) {
      console.log('onmessage', msg);
    }
    ws.onclose = function (msg) {
      console.log('onclose', msg);
    }
    return ws;
  }

  ping() {
    if (this.ws.readyState != WebSocket.OPEN) {
      this.ws = this.getWebSocket();
      let self = this;
      this.ws.onopen = function () {
        self.ws.send('hello');
      }
    } else {
      this.ws.send("Hello");
    }
  }

  close() {
    this.ws.close();
  }

}
