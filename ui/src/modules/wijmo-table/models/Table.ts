export interface IColConfig {
    header: string,
    field: string,
    resize?: boolean,
    customFormat?: boolean,
    width?: {
        width?: number,
        minwidth?: number,
        maxWidth?: number
    },
    starWidth?: string,
    height?: string,
    frozen?: boolean,
    class?: string
}