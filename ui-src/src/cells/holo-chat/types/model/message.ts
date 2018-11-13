
export interface MessageSpec {
  content: {
    text: string,
    mediaLink?: string
  }
}

export interface Message {
  author?: string,
  timestamp?: number,
  content: {
    text: string,
    mediaLink?: string
  }
}
