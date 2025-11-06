declare module '../services/contact' {
  export function createInquiry(payload: {
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    company?: string;
  }): Promise<any>;

  export function listInquiries(): Promise<any[]>;

  const _default: { createInquiry: typeof createInquiry; listInquiries: typeof listInquiries };
  export default _default;
}
