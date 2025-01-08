import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
	message: string;
	classname?: string;
	delay?: number;
	animation?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  	toasts: Toast[] = [];

	show(message:string) {
		this.toasts.push({message, classname:'bg-info text-light', delay:3000, animation:true});
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
