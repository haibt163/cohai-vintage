export type ContactLocale = "en" | "vi";

export const contactCopy = {
  en: { name: "Name", email: "Email", message: "Message", send: "Send enquiry" },
  vi: { name: "Tên", email: "Email", message: "Lời nhắn", send: "Gửi yêu cầu" },
} as const;
