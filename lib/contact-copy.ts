export type ContactLocale = "en" | "vi";

export const contactCopy = {
  en: {
    name: "Name", email: "Email", message: "Message", send: "Send enquiry",
    sentTitle: "Your email app should now open with your message.",
    sentFallback: "If it does not, please write to us directly at",
    subject: "Enquiry from", subjectFallback: "customer",
  },
  vi: {
    name: "Tên", email: "Email", message: "Lời nhắn", send: "Gửi yêu cầu",
    sentTitle: "Ứng dụng email của bạn sẽ mở ra cùng lời nhắn.",
    sentFallback: "Nếu không, vui lòng viết trực tiếp cho chúng tôi tại",
    subject: "Yêu cầu từ", subjectFallback: "khách hàng",
  },
} as const;
