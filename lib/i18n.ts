import { cookies } from "next/headers";
import type { EditorialPost, Product } from "@/lib/content";

export type Locale = "en" | "vi";

export const localeLabels: Record<Locale, string> = { en: "EN", vi: "VI" };

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("cohai-locale")?.value;
  return value === "en" ? "en" : "vi";
}

export const ui = {
  en: {
    home: "Home", about: "About", journal: "Journal", contact: "Contact", shop: "Shop",
    saigon: "SAIGON · VINTAGE · STORIES", menu: "Menu", explore: "Explore the collection",
    meet: "Meet Cô Hai →", pointOfView: "The Cô Hai point of view",
    luxury: "Luxury is not only about the label. It is about the story, the condition, the details and the feeling.",
    intro: "Cô Hai Vintage brings together a personal perspective on vintage fashion and luxury — from pre-owned handbags and jewellery to the culture, history and style behind the objects we keep.",
    fromJournal: "From the journal", stories: "Stories worth keeping.", viewAll: "View all stories →", read: "Read story →",
    selected: "Selected vintage", pastLife: "Pieces with a past life.",
    collectionIntro: "A small selection of recovered Louis Vuitton pieces. Each listing leads with the object itself, with condition and provenance added only as individual inventory is verified.",
    viewCollection: "View the collection", journalTitle: "Vintage, style and the stories behind them.",
    shopTitle: "Selected pieces with a past life.", shopDek: "A curated starting collection of vintage Louis Vuitton pieces from the recovered Cô Hai archive.",
    noteTitle: "A note on vintage", note: "Availability, condition and pricing should be confirmed for each individual piece before publication. The current catalogue deliberately avoids inventing those details.",
    viewPiece: "View piece →", aboutTitle: "The woman behind Cô Hai Vintage.", aboutLead: "Hello from Cô Hai Vintage — a story shaped between Vietnam, Europe and Australia, and a lifelong fascination with style.",
    about1: "The original Cô Hai archive describes a journey that began in Vietnam and continued through study in Rotterdam, Holland, and later life in Tasmania and Sydney. A professional accounting career was followed by fashion-business study at Orana Fashion Business College.",
    about2: "That combination of discipline and curiosity eventually returned to Saigon, where Cô Hai Vintage was founded as a more personal way to explore fashion, luxury and the stories attached to beautiful objects.",
    about3: "The new site keeps that spirit while making the archive, collection and journal easier to discover.",
    contactTitle: "Let’s talk vintage.", contactLead: "For product enquiries, sourcing questions, collaborations or general messages, please get in touch.",
    name: "Name", email: "Email", message: "Message", send: "Send enquiry", instagram: "Instagram:",
    enquire: "Enquire about this piece", backJournal: "← Back to Journal", backCollection: "← Back to collection",
    confirm: "Individual condition, provenance, availability and pricing should be confirmed before purchase.",
    footer: "Vintage fashion, objects, jewellery and stories with a sense of history.", rights: "All rights reserved.",
  },
  vi: {
    home: "Trang chủ", about: "Về Cô Hai", journal: "Tạp chí", contact: "Liên hệ", shop: "Bộ sưu tập",
    saigon: "SÀI GÒN · VINTAGE · CÂU CHUYỆN", menu: "Menu", explore: "Khám phá bộ sưu tập",
    meet: "Gặp Cô Hai →", pointOfView: "Góc nhìn Cô Hai",
    luxury: "Xa xỉ không chỉ nằm ở cái tên. Đó là câu chuyện, tình trạng, từng chi tiết và cảm xúc.",
    intro: "Cô Hai Vintage mang đến một góc nhìn cá nhân về thời trang vintage và hàng xa xỉ — từ túi xách, trang sức đã qua sử dụng đến văn hoá, lịch sử và phong cách phía sau những món đồ chúng ta gìn giữ.",
    fromJournal: "Từ tạp chí", stories: "Những câu chuyện đáng được lưu giữ.", viewAll: "Xem tất cả câu chuyện →", read: "Đọc câu chuyện →",
    selected: "Vintage tuyển chọn", pastLife: "Những món đồ có một đời sống trước đây.",
    collectionIntro: "Một tuyển chọn nhỏ những món Louis Vuitton được phục hồi từ kho lưu trữ Cô Hai. Mỗi sản phẩm đặt chính món đồ làm trung tâm; tình trạng và nguồn gốc chỉ được bổ sung khi từng sản phẩm được xác minh.",
    viewCollection: "Xem bộ sưu tập", journalTitle: "Vintage, phong cách và những câu chuyện phía sau.",
    shopTitle: "Những món đồ được tuyển chọn, với một đời sống trước đây.", shopDek: "Tuyển chọn khởi đầu gồm những món Louis Vuitton vintage từ kho lưu trữ Cô Hai được phục hồi.",
    noteTitle: "Một lưu ý về vintage", note: "Tình trạng, giá và khả năng sẵn có cần được xác nhận cho từng món trước khi công bố. Danh mục hiện tại chủ động không tự suy đoán những thông tin này.",
    viewPiece: "Xem sản phẩm →", aboutTitle: "Người phụ nữ phía sau Cô Hai Vintage.", aboutLead: "Xin chào từ Cô Hai Vintage — một câu chuyện được hình thành giữa Việt Nam, châu Âu và Australia, cùng niềm say mê thời trang kéo dài suốt một đời.",
    about1: "Kho lưu trữ gốc của Cô Hai kể về một hành trình bắt đầu tại Việt Nam, tiếp nối bằng thời gian học tập ở Rotterdam, Hà Lan, rồi cuộc sống tại Tasmania và Sydney. Sau sự nghiệp kế toán chuyên nghiệp là thời gian học về kinh doanh thời trang tại Orana Fashion Business College.",
    about2: "Sự kết hợp giữa tính kỷ luật và tò mò ấy cuối cùng đưa Cô trở lại Sài Gòn, nơi Cô Hai Vintage được thành lập như một cách riêng tư hơn để khám phá thời trang, hàng xa xỉ và những câu chuyện gắn với các món đồ đẹp.",
    about3: "Trang web mới giữ lại tinh thần ấy, đồng thời giúp kho lưu trữ, bộ sưu tập và tạp chí dễ khám phá hơn.",
    contactTitle: "Hãy cùng nói chuyện về vintage.", contactLead: "Nếu bạn muốn hỏi về sản phẩm, tìm kiếm một món đồ, hợp tác hoặc chỉ đơn giản là gửi lời nhắn, hãy liên hệ với Cô Hai.",
    name: "Tên", email: "Email", message: "Lời nhắn", send: "Gửi yêu cầu", instagram: "Instagram:",
    enquire: "Hỏi về sản phẩm này", backJournal: "← Quay lại Tạp chí", backCollection: "← Quay lại bộ sưu tập",
    confirm: "Tình trạng, nguồn gốc, khả năng sẵn có và giá cần được xác nhận trước khi mua.",
    footer: "Thời trang vintage, đồ vật, trang sức và những câu chuyện mang theo dấu vết của thời gian.", rights: "Bảo lưu mọi quyền.",
  },
} as const;

export function localizedPost(post: EditorialPost, locale: Locale): EditorialPost {
  if (locale === "en") return post;
  const vi: Record<string, Partial<EditorialPost>> = {
    "flea-market": { title: "Chợ đồ cũ", category: "Văn hoá Vintage", excerpt: "Vì sao những khu chợ đồ cũ vẫn là một trong những cách chân thực nhất để tìm thấy quần áo, đồ vật và câu chuyện.", intro: "Chợ đồ cũ không chỉ là nơi mua một món đồ cũ. Đó là điểm gặp nhau của ký ức, tình cờ và niềm vui khi tìm thấy một món đồ đã từng có một đời sống.", paragraphs: ["Sức hấp dẫn của vintage bắt đầu từ sự khám phá. Mỗi món đồ xuất hiện khác với sự đồng nhất của một cửa hàng hiện đại: một bộ trang phục có thể mang một phom dáng riêng, một dấu vết nhỏ hay một chi tiết khiến nó thuộc về đúng thời đại của mình.", "Mua đồ đã qua sử dụng cũng thay đổi cách chúng ta nhìn nhận việc tiêu dùng. Kéo dài tuổi thọ của một món đồ đẹp giúp vật liệu và tay nghề tiếp tục được lưu thông, đồng thời trao cho người chủ mới cơ hội viết thêm một chương.", "Với Cô Hai Vintage, tinh thần tái sử dụng có chọn lọc ấy là một phần của niềm vui mặc đẹp: chọn ít hơn, chọn kỹ hơn và để cá tính của món đồ được lên tiếng."] },
    "akoya-pearl": { title: "Ngọc trai Akoya", category: "Trang sức", excerpt: "Truyền thống ngọc trai Nhật Bản đã biến Akoya thành biểu tượng lâu bền của vẻ thanh lịch.", intro: "Nhỏ về kích thước nhưng nổi bật về thần thái, ngọc trai Akoya đã trở thành biểu tượng của trang sức tinh tế và ánh sáng dịu dàng.", paragraphs: ["Câu chuyện về ngọc trai nuôi hiện đại gắn liền với Kokichi Mikimoto và sự phát triển của kỹ thuật nuôi cấy tại Nhật Bản. Công trình của ông góp phần đưa những viên ngọc trai nuôi có vẻ đẹp ổn định đến với nhiều người hơn.", "Ngọc trai Akoya được yêu thích nhờ độ bóng, dáng tròn và sắc màu nhẹ nhàng. Kích thước vừa phải cũng tạo nên sự linh hoạt: một chuỗi ngọc có thể trang trọng nhưng cũng có thể mang lại nét mềm mại cho một bộ trang phục đơn giản.", "Trang sức vintage luôn đáng để quan sát thật gần. Bề mặt, lớp xà cừ, ổ ngọc và tỷ lệ đều góp phần tạo nên cảm giác khi đeo; vì vậy nguồn gốc và tình trạng đáng được quan tâm không kém tên tuổi trên móc khoá."] },
    "have-the-right-outfit": { title: "Chọn đúng trang phục", category: "Phong cách", excerpt: "Phong cách không phải là một công thức; đó là sự thấu hiểu về tỷ lệ, hoàn cảnh và chính mình.", intro: "Bộ trang phục phù hợp hiếm khi là bộ ồn ào nhất. Đó là bộ khiến người mặc cảm thấy mọi thứ đều đúng chỗ.", paragraphs: ["Quần áo giao tiếp trước cả khi chúng ta nói. Những diện mạo thuyết phục nhất thường đến từ sự hiểu rõ về tỷ lệ, hoàn cảnh và những chi tiết nhỏ khiến tổng thể có chủ ý.", "Vintage khiến cuộc đối thoại ấy thú vị hơn. Một phom dáng cũ có thể kết hợp với món đồ đương đại, trong khi một phụ kiện có lịch sử có thể đem đến cá tính hoàn toàn mới cho bộ trang phục quen thuộc.", "Mục tiêu không phải sự hoàn hảo. Đó là sự tự tin: biết vì sao một món đồ phù hợp, biết khi nào nên dừng lại và để cá tính của chính bạn vẫn còn hiện diện."] },
    "bernard-arnault": { title: "Bernard Arnault", category: "Xa xỉ & Kinh doanh", excerpt: "Một góc nhìn về kinh doanh hàng xa xỉ và tập đoàn đã đưa nhiều nhà mốt lịch sử vào cùng một danh mục hiện đại.", intro: "Xa xỉ được xây dựng từ nhiều hơn sản phẩm. Nó phụ thuộc vào di sản, tay nghề, phân phối, hình ảnh và khả năng khiến lịch sử vẫn có ý nghĩa hôm nay.", paragraphs: ["Bernard Arnault trở thành một trong những nhân vật định hình ngành xa xỉ hiện đại qua sự phát triển của LVMH, tập hợp những maison có bản sắc riêng và lịch sử lâu đời.", "Bài học bền vững là quy mô không nhất thiết khiến mọi thương hiệu trở nên giống nhau. Những nhà mốt mạnh nhất giữ được mã nhận diện riêng trong khi hưởng lợi từ chuyên môn, mạng lưới toàn cầu và đầu tư chung.", "Với người sưu tầm vintage, lịch sử ấy quan trọng vì món đồ trước mắt thường là kết quả của nhiều thập kỷ ngôn ngữ thiết kế, truyền thống sản xuất và ảnh hưởng văn hoá."] },
    "coco-chanel": { title: "Coco Chanel", category: "Lịch sử Thời trang", excerpt: "Nhìn lại nhà thiết kế đã thay đổi mối quan hệ giữa sự thanh lịch, thoải mái và trang phục hiện đại.", intro: "Ảnh hưởng của Coco Chanel không chỉ nằm trong danh sách những món đồ nổi tiếng. Đó còn là cách nhìn về việc một người phụ nữ chuyển động trong trang phục của mình.", paragraphs: ["Ngôn ngữ thiết kế của Chanel thách thức những quy ước gò bó của trang phục nữ đầu thế kỷ XX. Phom dáng đơn giản hơn, vật liệu thực dụng và bảng màu tiết chế giúp sự thoải mái trở thành một phần của từ điển thanh lịch.", "Bài học lâu dài của phong cách vintage nằm ở tỷ lệ và sự tiết chế. Một silhouette dễ nhận biết có thể đáng nhớ mà không cần quá nhiều trang trí, trong khi một phụ kiện nhỏ có thể mang cá tính cho cả diện mạo.", "Những món đồ vintage đặc biệt thú vị khi nhìn theo cách ấy. Điều đáng nói không chỉ là một vật có cũ hay không, mà là thiết kế ấy còn truyền tải được điều gì hữu ích, đẹp và rất riêng."] },
  };
  const localized = vi[post.slug];
  return localized ? { ...post, ...localized } : post;
}

export function localizedProduct(product: Product, locale: Locale): Product {
  if (locale === "en") return product;
  const vi: Record<string, Partial<Product>> = {
    "louis-vuitton-vintage-concorde": { name: "Louis Vuitton Concorde Vintage", category: "Túi Vintage", description: "Một silhouette Monogram vintage có cấu trúc, mang tinh thần của thiết kế Louis Vuitton thời kỳ du lịch cổ điển.", details: ["Louis Vuitton Monogram vintage", "Khoá S-lock", "Dây đeo điều chỉnh", "Sản phẩm vintage đã qua sử dụng"] },
    "louis-vuitton-neverfull-mm": { name: "Louis Vuitton Monogram Neverfull MM", category: "Túi Vintage", description: "Chiếc tote Monogram quen thuộc được nhìn qua lăng kính vintage và đồ đã qua sử dụng, nơi tình trạng và cá tính riêng của từng món được đặt lên trước.", details: ["Canvas Louis Vuitton Monogram", "Kích thước MM", "Sản phẩm vintage đã qua sử dụng", "Tình trạng cần xác nhận riêng"] },
    "louis-vuitton-vintage-mono-kelly": { name: "Louis Vuitton Mono Kelly Vintage", category: "Túi Vintage", description: "Một silhouette vintage nổi bật được tuyển chọn bởi phom dáng, phần cứng và lớp patina tạo nên nét riêng của hàng xa xỉ đã qua sử dụng.", details: ["Louis Vuitton Monogram", "Phom dáng vintage có cấu trúc", "Phần cứng khoá đặc trưng", "Sản phẩm vintage đã qua sử dụng"] },
  };
  const localized = vi[product.slug];
  return localized ? { ...product, ...localized } : product;
}
