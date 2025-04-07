interface Input {
  name: string;
  placeholder?: string;
  value?: string;
}
export interface FormInputs {
  title: string;
  description: string;
  submitName: string;
  inputs: Input[];
  gap?: number;
  label?: boolean;
}
