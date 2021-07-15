export interface HighlightResponse {
    word: string,
    type: HighlightType
}

export enum HighlightType {
    ACTION = "ACTION",
    CUSTOMCHARACTERISTIC = "CUSTOMCHARACTERISTIC",
    DATABASE = "DATABASE",
    VALUE = "VALUE",
    CONDITION = "CONDITION"
}

