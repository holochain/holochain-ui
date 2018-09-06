
export interface Message {  
	author?: string,
	timestamp?: number,
	content: {
		text: string,
		mediaLink?: string
	},
	channelId: string 
}