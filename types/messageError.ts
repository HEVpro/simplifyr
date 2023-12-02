export interface MessageError {
    active: boolean;
    type: errorMessageType;
    group: errorMessageGroup
}

export type errorMessageType = "empty" | "limit" | null
export type errorMessageGroup = "decision" | "option" | "pros" | "cons" | null
