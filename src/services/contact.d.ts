export function createInquiry(payload: {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  company?: string;
}): Promise<any>;

export function listInquiries(): Promise<any[]>;

declare const _default: { createInquiry: typeof createInquiry; listInquiries: typeof listInquiries };
export default _default;
