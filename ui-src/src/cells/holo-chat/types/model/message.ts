
export interface Message {  
	author: string,
	timestamp: string,
	content: {
		text: string,
		mediaLink?: string
	},
	channelId: string 
}