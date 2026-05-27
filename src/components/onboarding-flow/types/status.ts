export type Status = FormStatus | DoneStatus;

export type FormStatus = {
  type: "form";
  move: "next" | "back" | false;
  submitting: boolean;
};

export type DoneStatus = { type: "done" };
