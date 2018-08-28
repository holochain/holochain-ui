
export interface Message {
	type: string,
    author: string,
    avatar: string,
    time: string,
    content: any,
    replies: Array<Message>,
    idea: boolean,
    up: number,
    down: number
}

export type Messages = Array<{
	date: string,
	messages: Array<Message>
}>