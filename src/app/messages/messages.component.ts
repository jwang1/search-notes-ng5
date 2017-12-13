import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: string[] = [];

  // set messageService "public" because it will be used in template the .html file.
  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.messages;
  }

}
