export function createInquiry(payload: {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  company?: string;
}): Promise<any>;

export function listInquiries(): Promise<any[]>;

export function deleteInquiry(id: number | string): Promise<any>;

declare const _default: { createInquiry: typeof createInquiry; listInquiries: typeof listInquiries; deleteInquiry: typeof deleteInquiry };
export default _default;
