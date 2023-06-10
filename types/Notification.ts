export interface INotification {
    id: number
    type: "bad" | "good"
    title: string
    text: string
}