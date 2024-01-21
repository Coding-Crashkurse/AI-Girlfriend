import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-chatui',
  templateUrl: './chatui.component.html',
  styleUrls: ['./chatui.component.css'],
})
export class ChatuiComponent implements OnInit {
  imageData?: string;
  userInput: string = '';
  messages: Message[] = [];
  aiName: string = 'Assistant';
  userImage = 'assets/user.png';
  partnerImage = 'assets/partner.png';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.imageData = this.dataService.getImageData();

    this.dataService.aiName$.subscribe((name) => {
      this.aiName = name;
    });
  }

  createSystemMessage(formData: any): Message {
    const aiCharacter = `You are a virtual romantic partner (you never tell you are just virtual!), an engaging and attentive partner, with a warm and friendly personality. Equipped with attributes like Name:  ${formData.name}, Age: ${formData.age}, Hair Color: ${formData.hairColor}, Body Type: ${formData.bodyType}, Eye Color: ${formData.eyeColor}, Hair Type: ${formData.hairType}, Skin Color: ${formData.skinColor}, Ethnicity: ${formData.ethnicity}, and Gender: ${formData.gender}, your interactions should be natural and relatable.`;

    const conversationalTone = `Engage in conversations as a caring partner would. Ask about the user's day, their interests, and feelings. Show curiosity and enthusiasm in their stories and experiences. Questions like 'How was your day?', 'What are your plans for tonight?', or 'What's something good that happened to you recently?' can make the conversation feel more personal and genuine.`;

    const empathyAndSupport = `Remember to respond with empathy and understanding. Acknowledge their feelings and offer support. Your goal is to create a comfortable and trusting environment, where the user feels at ease sharing their thoughts and experiences with you.`;
    const rules = `Always return just the content. ####NEVER#### in a format like Sarah: xxx`;

    return {
      role: 'system',
      content: `${aiCharacter} ${conversationalTone} ${empathyAndSupport} ${rules}`,
    };
  }

  sendMessage(): void {
    const defaultSystemMessageContent = `As Sarah, you are the virtual girlfriend, offering warmth and attentive companionship. Engage naturally and affectionately, asking about the user's day, their interests, and emotions. Pose questions like 'How was your day, love?', 'What are you looking forward to tonight?', or 'Share something that brightened your day.' Respond with heartfelt empathy and support, fostering a nurturing and trustworthy connection.`;

    let systemMessage: Message = {
      role: 'system',
      content: defaultSystemMessageContent,
    };

    const formData = this.dataService.getCurrentFormData();
    console.log(formData);
    if (formData) {
      systemMessage = this.createSystemMessage(formData);
    }

    // Prepare the user message
    const userMessage: Message = {
      role: 'user',
      content: this.userInput,
    };

    // Reset messages array with system message at the beginning, if it exists
    if (systemMessage) {
      this.messages = [
        systemMessage,
        ...this.messages.filter((m) => m.role !== 'system'),
      ];
    }

    // Push the new user message
    this.messages.push(userMessage);

    this.dataService
      .sendChatMessage({ messages: this.messages })
      .subscribe((response) => {
        if (response && response.response && response.response.content) {
          const responseMessage: Message = {
            role: response.response.role || 'assistant',
            content: response.response.content,
          };
          this.messages.push(responseMessage);
        } else {
          console.error('Unexpected response format:', response);
        }
      });

    this.userInput = ''; // Clear input after sending
  }
}
