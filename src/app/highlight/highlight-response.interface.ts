export interface HighlightResponse {
    word: string,
    type: HighlightType
}

export enum HighlightType {
    ACTION = "ACTION",
    CUSTOM_CHARACTERISTIC = "CUSTOM_CHARACTERISTIC",
    DATABASE = "DATABASE",
    VALUE = "VALUE",
    CONDITION = "CONDITION"
}

