<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      full-screen
      goBack
      reload
      @reload="reload()"
    >
      <template v-if="ready" #body>
        <div class="container text-shadow">
          <div class="c-content-title-1">
            <h2 class="c-font-uppercase c-font-bold text-center">
              Điều khoản sử dụng
            </h2>
            <div class="c-line-left c-theme-bg"></div>
          </div>
          <p><strong>1 Nguyên tắc chung&nbsp;</strong></p>

          <p>
            Thành viên tham gia giao dịch trên ShopNick.Online tự do lựa chọn mua
            bán account, và lựa chọn thanh toán theo các hình thức trên
            ShopNick.Online.
          </p>

          <p>&nbsp;</p>

          <p><strong>2 Thu thập và sử dụng thông tin</strong></p>

          <p>
            Hiện tại ShopNick.Online liên kết tài khoản với Facebook nên việc bạn
            đăng ký tài khoản bạn sẽ nhận được 1 yêu cầu cho phép liên kết tài
            khoản Facebook của bạn với ShopNick.Online hay không. Khi đó
            ShopNick.Online sẽ ghi nhận thông tin tài khoản Facebook của bạn và 1
            số thông tin công khai tạm thời của bạn.
          </p>

          <p>
            Trên ShopNick.Online có cơ chế bảo mật bằng mã ODP và địa chỉ email
            nhận thông báo từ ShopNick.Online. Do đó, có phát sinh thêm 2 thông
            tin là số điện thoại và địa chỉ email của bạn. ShopNick.Online thu
            thập 2 thông tin này để đảm bảo cho chức năng bảo mật và thông báo
            hoạt động đúng. Số điện thoại và email của bạn ngoài để nhận mã ODP,
            chúng tôi sẽ liên hệ khi có việc quan trọng liên quan tới tài khoản
            của bạn hoặc xác minh nhận thưởng các sự kiện chúng tôi tổ chức.
          </p>

          <p>
            Các thông tin cá nhân bạn cung cấp ngoài việc hỗ trợ và đảm bảo chức
            năng hoạt động đúng thì còn giải quyết các vấn đề tranh chấp, khiếu
            nại, gian lận. ShopNick.Online không chịu trách nhiệm cũng như giải
            quyết khiếu nại khi bạn cung cấp thông tin cá nhân bị sai lệch,
            thiếu chính xác.
          </p>

          <p>&nbsp;</p>

          <p><strong>3 Thay đổi thông tin</strong></p>

          <p>Bạn chỉ có 1 ID duy nhất, ID không thể thay đổi.</p>

          <p>
            Bạn là người duy nhất truy cập tài khoản ShopNick.Online của bạn. Khi
            cập nhật, xóa bỏ hay sửa đổi thông tin trên Facebook của bạn thì
            thông tin cá nhân trên ShopNick.Online cũng sẽ thay đổi.
          </p>

          <p>&nbsp;</p>

          <p><strong>4 Lưu trữ và bảo vệ thông tin</strong></p>

          <p>
            Sự riêng tư và bảo mật thông tin cá nhân rất quan trọng với người
            dùng, vì vậy ShopNick.Online sẽ bảo đảm tối đa sự riêng tư của bạn.
            ShopNick.Online lưu trữ và xử lý thông tin cá nhân của bạn trên máy
            chủ, mọi dữ liệu quan trọng được mã hóa để tránh việc đánh cắp thông
            tin.
          </p>

          <p>
            Bạn phải chịu trách nhiệm bảo mật thông tin tài khoản. Không nên cho
            bất cứ ai biết tên tài khoản và mật khẩu Facebook của bạn, số điện
            thoại đăng ký ODP, email nhận thông báo. Bạn cũng không nên đặt mật
            khẩu theo số điện thoại, ngày tháng năm sinh hay mật khẩu quá dễ...
          </p>

          <p>
            ShopNick.Online cam kết không tiết lộ thông tin cá nhân và số điện
            thoại cho đơn vị thứ 3.
          </p>

          <p>
            ShopNick.Online sẽ cung cấp thông tin khi có yêu cầu của cơ quan chức
            năng nhà nước có thẩm quyền.
          </p>

          <p>&nbsp;</p>

          <p><strong>5 Trách nhiệm và quyền lợi</strong></p>

          <p>
            Thành viên tự chịu trách nhiệm bảo mật và lưu giữ mọi hoạt động giao
            dịch dưới tên đăng kí và mật khẩu của mình.
          </p>

          <p>
            Thành viên cam kết đồng ý không sử dụng ShopNick.Online vào những mục
            đích không hợp pháp như lừa đảo, đe dọa, thăm dò thông tin bất hợp
            pháp...
          </p>

          <p>
            Khi có sự cố bạn phải có trách nhiệm cung cấp thông tin chính xác.
            Shop có quyền tạm khóa tài khoản để kiểm tra khi phát hiện tài khoản
            có dấu hiệu gian lận, trộm cắp hoặc bị tài khoản khác khiếu nại và
            sẽ bị thu hồi tài khoản hoặc xóa khỏi hệ thống khi tài khoản đó vi
            phạm.
          </p>

          <p>
            Khi đăng kí thành thành viên ShopNick.Online bạn sẽ được quyền truy
            cập website dễ dàng mua account, theo dõi biến động số dư, nhật kí
            hoạt động...
          </p>

          <p>
            Các bạn được quyền khiếu nại khi gặp các sự cố về tài khoản như nạp
            thẻ, mua account, chuyển tiền, rút tiền, hay mua trả góp...
            ShopNick.Online sẽ xử lý khiếu nại trong thời gian sớm nhất. Trường
            hợp thẻ lỗi không nạp được bạn phải cung cấp số seri cho
            ShopNick.Online kiểm tra và sẽ được cộng số dư ngay nếu do lỗi từ nhà
            cung cấp.
          </p>

          <p>
            Bạn được bảo vệ tuyệt đối thông tin cá nhân. Việc thu thập và sử
            dụng thông tin của bạn chỉ được thực hiện khi có sự đồng ý của bạn,
            trừ trường hợp có yêu cầu của cơ quan chức năng theo quy định của
            pháp luật.
          </p>

          <p>Các đại lý sẽ được chia lợi nhuận theo đúng thỏa thuận.</p>

          <p>&nbsp;</p>

          <p><strong>6 Thành viên cam kết</strong></p>

          <p>
            Tôi cam kết chịu trách nhiệm hoàn toàn trước pháp luật về việc sử
            dụng, hoạt động kinh doanh, giao dịch trực tuyến của mình trên
            ShopNick.Online.
          </p>

          <p>
            Tôi cam kết toàn bộ hoạt động sử dụng, hoạt động kinh doanh, giao
            dịch trực tuyến của mình trên ShopNick.Online được thực hiện theo
            đúng quy định của pháp luật và không vi phạm pháp luật nước CHXHCN
            Việt Nam.
          </p>

          <p>
            Tôi cam kết toàn bộ thông tin đăng kí tài khoản và giao dịch trên
            ShopNick.Online là chính xác và tôi hoàn toàn chịu trách nhiệm về
            tính xác thực thông tin tôi cung cấp.
          </p>

          <p>
            Tôi cam kết phối hợp với ShopNick.Online và cơ quan đều tra trong mọi
            trường hợp xác minh có dấu hiệu lừa đảo, kinh doanh vi phạm pháp
            luật, vi phạm pháp luật nước CHXHCN Việt Nam.
          </p>

          <div class="c-content-title-1 mt-2">
            <h2 class="c-font-uppercase c-font-bold text-center">
              Chính sách bảo mật
            </h2>
            <div class="c-line-left c-theme-bg"></div>
          </div>

          <p><strong>1. Tổng quan về bảo mật dữ liệu</strong></p>
          <p><strong>Ghi chú chung</strong></p>
          <p>
            Các hướng dẫn sau đây cung cấp một cái nhìn tổng quan đơn giản về
            những gì diễn ra với dữ liệu cá nhân của bạn khi bạn truy cập trang
            web của chúng tôi. Dữ liệu cá nhân là tất cả dữ liệu dùng để nhận
            dạng cá nhân bạn. Bạn có thể tìm thấy thông tin chi tiết về chủ đề
            bảo mật dữ liệu trong tuyên bố bảo mật dữ liệu của chúng tôi được
            liệt kê trong văn bản này.
          </p>
          <p>
            <strong>Việc thu thập dữ liệu trên trang web của chúng tôi</strong>
          </p>
          <p>
            <strong>Ai ch</strong><strong>ị</strong><strong>u tr</strong
            ><strong>á</strong><strong>ch nhi</strong><strong>ệ</strong
            ><strong>m v</strong><strong>ề</strong><strong> vi</strong
            ><strong>ệ</strong><strong>c thu th</strong><strong>ậ</strong
            ><strong>p d</strong><strong>ữ</strong><strong> li</strong
            ><strong>ệ</strong><strong>u tr</strong><strong>ê</strong
            ><strong>n trang web n</strong><strong>à</strong><strong>y?</strong>
          </p>
          <p>
            Việc xử lý dữ liệu trên trang web này do bên điều hành trang web
            thực hiện. Bạn có thể tìm thấy thông tin liên lạc chi tiết của bên
            điều hành trong phần thông tin Liên Hệ của trang web này.
          </p>
          <p>
            <strong>Ch</strong><strong>ú</strong><strong>ng t</strong
            ><strong>ô</strong><strong>i thu th</strong><strong>ậ</strong
            ><strong>p d</strong><strong>ữ</strong><strong> li</strong
            ><strong>ệ</strong><strong>u c</strong><strong>ủ</strong
            ><strong>a b</strong><strong>ạ</strong><strong>n nh</strong
            ><strong>ư</strong><strong> th</strong><strong>ế</strong
            ><strong> n</strong><strong>à</strong><strong>o?</strong>
          </p>
          <p>
            Một phần dữ liệu của bạn được thu thập khi bạn&nbsp;cung cấp thông
            tin cho chúng tôi. Ví dụ: ID của bạn đối với ứng dụng facebook của
            chúng tôi, email của bạn.
          </p>
          <p>
            Các dữ liệu khác được hệ thống CNTT của chúng tôi tự động thu thập
            khi bạn truy cập trang web. Đây chủ yếu là dữ liệu kỹ thuật (ví dụ:
            trình duyệt internet, hệ điều hành hoặc thời gian xem trang). Dữ
            liệu này được thu thập tự động ngay khi bạn truy cập trang web của
            chúng tôi.
          </p>
          <b><p>Cách bạn có thể yêu cầu xoá dữ liệu</p></b>
          Trong khuôn khổ các quy định pháp luật hiện hành, bạn có quyền yêu cầu
          cung cấp thông tin về dữ liệu cá nhân được lưu trữ của bạn, nguồn gốc
          dữ liệu và người nhận dữ liệu cũng như mục đích của việc xử lý dữ liệu
          và nếu cần, có quyền yêu cầu chỉnh sửa, chặn hoặc xóa dữ liệu này miễn
          phí bất kỳ lúc nào. Bạn có thể liên hệ với chúng tôi bất kỳ lúc nào
          theo địa chỉ được cung cấp trong phần thông tin Liên Hệ nếu bạn có
          thêm bất kỳ câu hỏi nào về dữ liệu cá nhân.

          <p>
            <strong>Ch</strong><strong>ú</strong><strong>ng t</strong
            ><strong>ô</strong><strong>i s</strong><strong>ử</strong
            ><strong> d</strong><strong>ụ</strong><strong>ng d</strong
            ><strong>ữ</strong><strong> li</strong><strong>ệ</strong
            ><strong>u c</strong><strong>ủ</strong><strong>a b</strong
            ><strong>ạ</strong><strong>n </strong><strong>để</strong
            ><strong> l</strong><strong>à</strong><strong>m g</strong
            ><strong>ì</strong><strong>?</strong>
          </p>
          <p>
            Một số dữ liệu được thu thập để đảm bảo rằng trang web không có lỗi.
            Dữ liệu khác có thể được sử dụng để phân tích hành vi người dùng của
            bạn, phân biệt giữa các người dùng thông qua email hoặc uid.
          </p>
          <p>
            <strong>B</strong><strong>ạ</strong><strong>n c</strong
            ><strong>ó</strong><strong> quy</strong><strong>ề</strong
            ><strong>n g</strong><strong>ì</strong><strong> </strong
            ><strong>đố</strong><strong>i v</strong><strong>ớ</strong
            ><strong>i d</strong><strong>ữ</strong><strong> li</strong
            ><strong>ệ</strong><strong>u c</strong><strong>ủ</strong
            ><strong>a m</strong><strong>ì</strong><strong>nh?</strong>
          </p>
          <p>
            Bạn có quyền nhận thông tin về nguồn gốc dữ liệu, người nhận và mục
            đích lưu trữ dữ liệu cá nhân của bạn miễn phí bất kỳ lúc nào. Bạn
            cũng có quyền yêu cầu chỉnh sửa, chặn hoặc xóa dữ liệu này. Bạn có
            thể liên hệ với chúng tôi bất kỳ lúc nào theo địa chỉ được cung cấp
            trong phần thông tin Liên Hệ nếu bạn có thêm bất kỳ câu hỏi nào về
            bảo mật dữ liệu..
          </p>
          <p>
            Bạn cũng có quyền yêu cầu hạn chế xử lý dữ liệu cá nhân của mình
            trong một số trường hợp nhất định. Nội dung chi tiết có thể xem
            trong tuyên bố bảo mật dữ liệu ở mục "Quyền yêu cầu hạn chế xử lý".
          </p>
          <p>
            <strong>Công cụ phân tích và các công cụ của bên thứ ba</strong>
          </p>
          <p>
            Khi bạn truy cập trang web của chúng tôi, hành vi lướt web của bạn
            có thể được đánh giá thống kê. Điều này chủ yếu được thực hiện với
            cookie và các chương trình phân tích. Hành vi lướt web của bạn
            thường được phân tích ẩn danh;&nbsp;hành vi lướt web không thể được
            dùng để truy tìm bạn. Bạn có thể phản đối hoặc ngăn chặn phân tích
            này bằng cách không sử dụng một số công cụ nhất định. Bạn có thể tìm
            thấy thông tin chi tiết về nội dung này trong tuyên bố bảo mật dữ
            liệu sau đây.
          </p>
          <p>
            Bạn có thể phản đối phân tích này. Chúng tôi sẽ thông báo cho bạn về
            các tùy chọn phản đối trong tuyên bố bảo mật dữ liệu này.
          </p>
          <p>
            <strong>2. Thông tin chung và thông tin bắt buộc</strong>
          </p>
          <p>
            <strong>B</strong><strong>ả</strong><strong>o m</strong
            ><strong>ậ</strong><strong>t th</strong><strong>ô</strong
            ><strong>ng tin</strong>
          </p>
          <p>
            Bên điều hành trang web này rất coi trọng việc bảo mật dữ liệu cá
            nhân của bạn. Chúng tôi xử lý dữ liệu cá nhân của bạn một cách bảo
            mật và tuân theo các quy định pháp luật về bảo mật dữ liệu và tuyên
            bố bảo mật dữ liệu này.
          </p>
          <p>
            Khi bạn sử dụng trang web này, nhiều dữ liệu cá nhân khác nhau sẽ
            được thu thập. Dữ liệu cá nhân là dữ liệu dùng để nhận dạng cá nhân
            bạn. Tuyên bố bảo mật dữ liệu này giải thích việc chúng tôi sẽ thu
            thập những dữ liệu nào và chúng tôi sử dụng những dữ liệu đó để làm
            gì. Trong đó cũng giải thích về cách thức và mục đích thực hiện việc
            này.
          </p>
          <p>
            Chúng tôi lưu ý rằng việc truyền dữ liệu qua Internet (ví dụ: khi
            giao tiếp bằng email) có thể có các lỗ hổng bảo mật. Không thể bảo
            mật hoàn toàn dữ liệu khỏi truy cập từ các bên thứ ba.
          </p>

          <p>
            Đơn vị phụ trách là thể nhân hoặc pháp nhân, một mình hoặc cùng với
            những người khác, quyết định về mục đích và phương tiện xử lý dữ
            liệu cá nhân (ví dụ: tên, địa chỉ email, v.v.).
          </p>
          <p>
            <strong>R</strong><strong>ú</strong><strong>t l</strong
            ><strong>ạ</strong><strong>i tuy</strong><strong>ê</strong
            ><strong>n b</strong><strong>ố</strong><strong> </strong
            ><strong>đồ</strong><strong>ng </strong><strong>ý</strong
            ><strong> cho x</strong><strong>ử</strong><strong> l</strong
            ><strong>ý</strong><strong> d</strong><strong>ữ</strong
            ><strong> li</strong><strong>ệ</strong><strong>u</strong>
          </p>
          <p>
            Nhiều quá trình xử lý dữ liệu chỉ có thể được thực hiện khi có sự
            đồng ý rõ ràng của bạn. Bạn có thể rút lại tuyên bố đồng ý của mình
            bất cứ lúc nào. Để rút lại tuyên bố đồng ý, bạn chỉ cần gửi một
            thông báo cho chúng tôi qua email. Trước khi bạn rút lại tuyên bố
            đồng ý, thì tính hợp pháp của việc xử lý dữ liệu không bị ảnh hưởng.
          </p>

          <p>
            Bạn có quyền phản đối việc xử lý dữ liệu cá nhân của bạn bất kỳ lúc
            nào vì những lý do phát sinh từ tình huống cụ thể của bạn;&nbsp;điều
            này cũng áp dụng cho việc tạo hồ sơ dựa trên các điều khoản này. Cơ
            sở pháp lý tương ứng cho việc xử lý dữ liệu được nêu trong tuyên bố
            bảo mật dữ liệu này. Nếu bạn phản đối, chúng tôi sẽ không xử lý dữ
            liệu cá nhân có liên quan của bạn nữa, trừ khi chúng tôi có thể
            chứng minh được lý do thuyết phục cho việc xử lý dữ liệu ưu tiên hơn
            lợi ích, quyền và tự do của bạn hoặc việc xử lý này nhằm khẳng định,
            thực hiện hoặc bảo vệ các khiếu nại pháp lý.
          </p>
          <p>
            Nếu dữ liệu cá nhân của bạn được xử lý cho các mục đích tiếp thị
            trực tiếp, bạn có quyền phản đối bất cứ lúc nào việc xử lý dữ liệu
            cá nhân của bạn cho mục đích đó; điều này cũng áp dụng cho việc tạo
            hồ sơ trong phạm vi liên kết với tiếp thị trực tiếp đó. Nếu bạn phản
            đối, dữ liệu cá nhân của bạn sau đó sẽ không còn được sử dụng cho
            mục đích tiếp thị quảng cáo trực tiếp nữa
          </p>

          <p>
            <strong>Quy</strong><strong>ề</strong><strong>n chuy</strong
            ><strong>ể</strong><strong>n ti</strong><strong>ế</strong
            ><strong>p d</strong><strong>ữ</strong><strong> li</strong
            ><strong>ệ</strong><strong>u</strong>
          </p>
          <p>
            Bạn có quyền yêu cầu chuyển tiếp dữ liệu mà chúng tôi xử lý tự động
            dựa trên sự đồng ý của bạn hoặc khi thực hiện hợp đồng, cho chính
            bạn hoặc cho bên thứ ba theo một định dạng tập tin thông thường và
            có thể đọc trên máy. Nếu bạn yêu cầu chuyển trực tiếp dữ liệu cho
            người khác, điều này sẽ chỉ được thực hiện nếu nó khả thi về mặt kỹ
            thuật.
          </p>
          <p>
            <strong>M</strong><strong>ã</strong><strong> h</strong
            ><strong>ó</strong><strong>a SSL ho</strong><strong>ặ</strong
            ><strong>c TLS</strong>
          </p>
          <p>
            Vì lý do bảo mật và để bảo vệ việc truyền tải nội dung bảo mật,
            chẳng hạn như đơn đặt hàng hoặc thư yêu cầu mà bạn gửi cho chúng tôi
            với tư cách là bên điều hành trang web, trang web này sử dụng mã hóa
            SSL hoặc TLS. Bạn có thể nhận biết một kết nối được mã hóa với dòng
            địa chỉ của trình duyệt thay đổi từ “http://” thành “https://” và
            với biểu tượng khóa trong dòng trình duyệt của bạn.
          </p>
          <p>
            Nếu mã hóa SSL hoặc TLS được kích hoạt, bên thứ ba sẽ không thể đọc
            được dữ liệu bạn truyền cho chúng tôi.
          </p>
          <p>
            <strong>Th</strong><strong>ô</strong><strong>ng tin, ch</strong
            ><strong>ặ</strong><strong>n, x</strong><strong>ó</strong
            ><strong>a v</strong><strong>à</strong><strong> ch</strong
            ><strong>ỉ</strong><strong>nh s</strong><strong>ử</strong
            ><strong>a</strong>
          </p>
          <p>
            Trong khuôn khổ các quy định pháp luật hiện hành, bạn có quyền yêu
            cầu cung cấp thông tin về dữ liệu cá nhân được lưu trữ của bạn,
            nguồn gốc dữ liệu và người nhận dữ liệu cũng như mục đích của việc
            xử lý dữ liệu và nếu cần, có quyền yêu cầu chỉnh sửa, chặn hoặc xóa
            dữ liệu này miễn phí bất kỳ lúc nào. Bạn có thể liên hệ với chúng
            tôi bất kỳ lúc nào theo địa chỉ được cung cấp trong phần thông tin
            Liên Hệ nếu bạn có thêm bất kỳ câu hỏi nào về dữ liệu cá nhân.
          </p>
          <p>
            <strong>Quy</strong><strong>ề</strong><strong>n y</strong
            ><strong>ê</strong><strong>u c</strong><strong>ầ</strong
            ><strong>u h</strong><strong>ạ</strong><strong>n ch</strong
            ><strong>ế</strong><strong> x</strong><strong>ử</strong
            ><strong> l</strong><strong>ý</strong>
          </p>
          <p>
            Bạn có quyền yêu cầu hạn chế việc xử lý dữ liệu cá nhân của mình.
            Bạn có thể liên hệ với chúng tôi bất kỳ lúc nào theo địa chỉ được
            nêu trong phần thông tin Liên Hệ. Quyền yêu cầu hạn chế xử lý được
            áp dụng trong các trường hợp sau:
          </p>
          <ul>
            <li>
              Nếu bạn phản đối tính chính xác của dữ liệu cá nhân của bạn do
              chúng tôi lưu trữ, chúng tôi thường cần thời gian để xác minh lại
              điều này. Trong suốt thời gian xác minh, bạn có quyền yêu cầu hạn
              chế việc xử lý dữ liệu cá nhân của mình.
            </li>
            <li>
              Nếu việc xử lý dữ liệu cá nhân của bạn xảy ra / diễn ra bất hợp
              pháp, bạn có thể yêu cầu hạn chế xử lý dữ liệu thay vì xóa.
            </li>
            <li>
              Nếu chúng tôi không cần dữ liệu cá nhân của bạn nữa, nhưng bạn cần
              chúng để thực hiện, bảo vệ hoặc khẳng định các khiếu nại pháp lý,
              bạn có quyền yêu cầu hạn chế việc xử lý dữ liệu cá nhân của bạn
              thay vì xóa.
            </li>
            <li>
              Khi bạn đưa ra phản đối, lợi ích của bạn và của chúng tôi sẽ cần
              được xem xét. Chừng nào vẫn chưa rõ lợi ích của ai chiếm ưu thế,
              bạn có quyền yêu cầu hạn chế việc xử lý dữ liệu cá nhân của mình.
            </li>
          </ul>
          <p>
            Nếu việc xử lý dữ liệu cá nhân của bạn bị hạn chế, những dữ liệu này
            chỉ có thể được sử dụng khi bạn đồng ý hoặc nhằm mục đích xác định,
            thực hiện hoặc bào chữa các khiếu nại pháp lý hoặc bảo vệ quyền của
            một thể nhân hoặc pháp nhân khác hoặc vì lý do lợi ích công quan
            trọng của Liên minh hoặc một quốc gia thành viên.
          </p>

          <p>
            <strong
              >4. Việc thu thập dữ liệu trên trang web của chúng tôi</strong
            >
          </p>
          <p><strong>Cookie</strong></p>
          <p>
            Một số trang web sử dụng một phần cookie. Cookie không gây hại cho
            máy tính của bạn và không chứa vi rút. Cookie giúp làm cho chương
            trình của chúng tôi thân thiện hơn, hiệu quả hơn và an toàn hơn.
            Cookie là các tập tin văn bản nhỏ được lưu trữ trên máy tính của bạn
            và được trình duyệt của bạn lưu lại.
          </p>
          <p>
            Hầu hết các cookie mà chúng tôi sử dụng được gọi là "cookie phiên".
            Chúng tự động bị xóa sau khi bạn kết thúc truy cập. Các cookie khác
            vẫn được lưu trữ trên thiết bị của bạn cho đến khi bạn xóa chúng.
            Những cookie này cho phép chúng tôi nhận ra trình duyệt của bạn
            trong lần truy cập tiếp theo.
          </p>
          <p>
            Bạn có thể cài đặt trình duyệt của mình để được thông báo về việc
            cài đặt cookie và chỉ cho phép cookie trong các&nbsp;trường
            hợp&nbsp;cụ thể, loại trừ&nbsp;việc chấp nhận&nbsp;cookie trong một
            số trường hợp nhất định hoặc toàn bộ và kích hoạt tính năng tự động
            xóa cookie khi đóng trình duyệt. Việc hủy kích hoạt cookie có thể
            giới hạn tính năng trang web của chúng tôi.
          </p>

          <p>
            <strong>T</strong><strong>ậ</strong><strong>p tin nh</strong
            ><strong>ậ</strong><strong>t k</strong><strong>ý</strong
            ><strong> m</strong><strong>á</strong><strong>y ch</strong
            ><strong>ủ</strong>
          </p>
          <p>
            Nhà cung cấp trang web tự động thu thập và lưu trữ thông tin trong
            tập tin nhật ký máy chủ, tập tin này được trình duyệt của bạn tự
            động truyền cho chúng tôi. Đó là:
          </p>
          <ul>
            <li>Loại trình duyệt và phiên bản trình duyệt</li>
            <li>Hệ điều hành được sử dụng</li>
            <li>URL giới thiệu</li>
            <li>Tên máy chủ của máy tính đang truy cập</li>
            <li>Thời gian yêu cầu máy chủ</li>
            <li>Địa chỉ IP</li>
          </ul>
          <p>Không kết hợp các dữ liệu này với các nguồn dữ liệu khác.</p>
          <p>
            Dữ liệu được thu thập. Bên điều hành trang web có lợi ích hợp pháp
            trong việc trình bày không có lỗi kỹ thuật và tối ưu hóa trang web
            của mình – để làm việc này, các tập tin nhật ký máy chủ phải được
            ghi lại.
          </p>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

import { mapFields } from "vuex-map-fields";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
  data() {
    return {
      title: "Điều Khoản & Chính Sách",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 800px;
}
</style>