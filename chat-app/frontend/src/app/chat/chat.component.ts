import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';  // Importa io correttamente

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket: any;
  message: string = '';
  messages: string[] = [];

  ngOnInit() {
    // Connessione al server Flask con Socket.IO
    this.socket = io('https://5000-andrea1932734-realtime-yzlu2wvctoc.ws-eu118.gitpod.io');  // Modifica l'URL se necessario

    // Ascolta i messaggi ricevuti
    this.socket.on('message', (msg: string) => {
      this.messages.push(msg);
    });
  }

  sendMessage(message : HTMLInputElement) {
    this.message = message.value;
    if (this.message.trim()) {
      // Invia il messaggio al server Flask
      this.socket.emit('message', this.message);
      this.messages.push(this.message);
      this.message = '';  // Pulisce la casella di testo
    }
  }
}
