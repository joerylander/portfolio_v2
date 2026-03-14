export type ContactFormData = {
  name: string;
  email: string;
  description: string;
  budget?: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
};
