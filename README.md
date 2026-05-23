# BT_Buoi2_04-05-26_23110187

## Mô tả hệ thống

Đây là một ứng dụng web CRUD đơn giản được xây dựng bằng **Node.js + Express + Sequelize + MySQL + EJS**. Hệ thống dùng để quản lý danh sách `User` với các chức năng chính: thêm mới, xem danh sách, cập nhật và xóa dữ liệu.

## Công nghệ sử dụng

- **Express**: tạo web server và khai báo route.
- **EJS**: render giao diện server-side.
- **Sequelize**: làm việc với MySQL theo mô hình ORM.
- **MySQL**: lưu trữ dữ liệu người dùng.
- **bcryptjs**: mã hóa mật khẩu trước khi lưu vào database.
- **body-parser**: đọc dữ liệu từ form gửi lên server.
- **dotenv**: nạp biến môi trường, hiện tại chủ yếu dùng cho `PORT`.

## Kiến trúc tổng quan

Luồng xử lý của hệ thống được chia thành 4 tầng chính:

1. **Server entry**: `src/server.js`
2. **Route layer**: `src/route/web.js`
3. **Controller layer**: `src/controller/homeController.js`
4. **Service + Model layer**: `src/services/CRUDService.js` và `src/models/*`

Cách hoạt động:

- Trình duyệt gửi request đến server.
- Route xác định URL nào sẽ được xử lý.
- Controller nhận request, gọi service hoặc truy vấn dữ liệu.
- Service làm việc với Sequelize để thao tác dữ liệu MySQL.
- Kết quả được render bằng EJS hoặc trả về text/HTML.

## Luồng khởi động ứng dụng

Khi chạy project:

1. `src/server.js` khởi tạo Express app.
2. `bodyParser.json()` và `bodyParser.urlencoded()` được bật để đọc dữ liệu từ request body.
3. `viewEngine(app)` cấu hình EJS và thư mục `views`.
4. `initWebRoutes(app)` đăng ký toàn bộ route.
5. `connectDB()` kiểm tra kết nối tới MySQL.
6. Server lắng nghe ở `PORT` trong `.env`, nếu không có thì dùng `6969`.

## Mô hình dữ liệu

Hệ thống đang làm việc với bảng `users`.

### Các trường chính

- `id`
- `email`
- `password`
- `firstName`
- `lastName`
- `address`
- `phoneNumber`
- `gender`
- `image`
- `roleId`
- `positionId`
- `createdAt`
- `updatedAt`

### Ghi chú

- Mật khẩu được mã hóa bằng `bcryptjs` trước khi lưu.
- Trường `gender` được quy đổi từ chuỗi form sang kiểu boolean.
- `roleId` được nhập từ form chọn sẵn trong giao diện.

## Logic xử lý theo chức năng

### 1. Trang Home

Route: `GET /`

- Trả về chuỗi tên sinh viên: `Phạm Hàn Minh Chương - 23110187`.
- Đây là route đơn giản để kiểm tra server hoạt động.

Route: `GET /home`

- Controller gọi `db.User.findAll()` để lấy toàn bộ user từ MySQL.
- Dữ liệu được stringify và render vào `homepage.ejs`.
- Trang này hiển thị một snapshot dữ liệu database và liên kết sang các màn CRUD khác.

### 2. Trang About

Route: `GET /about`

- Render file `test/about.ejs`.
- Đây là trang tĩnh, dùng để minh họa route và view.

### 3. Trang tạo user

Route: `GET /crud`

- Render form `crud.ejs`.
- Người dùng nhập thông tin user mới và submit lên server.

Route: `POST /post-crud`

- Controller nhận `req.body` từ form.
- Gọi `CRUDService.createNewUser()`.
- Service:
  - mã hóa mật khẩu bằng `bcryptjs`
  - tạo bản ghi mới trong bảng `users`
- Sau khi lưu thành công, server trả về text xác nhận.

### 4. Danh sách user

Route: `GET /get-crud`

- Controller gọi `CRUDService.getAllUser()`.
- Service dùng `db.User.findAll({ raw: true })` để lấy toàn bộ bản ghi.
- Dữ liệu được render vào `users/findAllUser.ejs`.
- Giao diện hiển thị các cột chính như email, first name, last name, address.
- Mỗi dòng có nút **Edit** và **Delete**.

### 5. Sửa user

Route: `GET /edit-crud?id=...`

- Controller đọc `id` từ query string.
- Nếu có `id`, controller gọi `CRUDService.getUserInfoById(id)`.
- Dữ liệu user được đưa vào `users/editUser.ejs` để hiển thị sẵn trên form.
- Nếu không có `id`, server trả về thông báo lỗi đơn giản.

Route: `POST /put-crud`

- Form chỉnh sửa gửi dữ liệu lên server.
- Controller gọi `CRUDService.updateUser(req.body)`.
- Service tìm user theo `id`, cập nhật các trường:
  - `firstName`
  - `lastName`
  - `address`
  - `phoneNumber`
  - `gender`
  - `roleId`
- Sau khi lưu, service trả về toàn bộ danh sách user để render lại trang `findAllUser.ejs`.

### 6. Xóa user

Route: `GET /delete-crud?id=...`

- Controller lấy `id` từ query string.
- Nếu có `id`, service `deleteUserById(id)` sẽ tìm bản ghi và xóa nó khỏi database.
- Sau khi xóa, server trả về thông báo `Deleted!`.
- Nếu không có `id`, server trả về thông báo không tìm thấy user.

## Cấu hình database

- Database name: `node_fulltask`
- Host: `localhost`
- Username: `root`
- Password: `2357`
- Dialect: `mysql`

Kết nối database đang được khai báo trong `src/config/configdb.js` và mô hình Sequelize trong `src/models/index.js`.

## Cấu trúc thư mục chính

- `src/server.js`: điểm khởi động ứng dụng.
- `src/config/`: cấu hình view và database.
- `src/controller/`: xử lý request và response.
- `src/route/`: khai báo route.
- `src/services/`: chứa logic CRUD.
- `src/models/`: khai báo model Sequelize.
- `src/views/`: giao diện EJS.
- `src/migrations/`: migration tạo bảng `users`.

## Chạy ứng dụng

1. Cài dependency:
   ```bash
   npm install
   ```
2. Tạo database MySQL tên `node_fulltask`.
3. Chạy migration để tạo bảng `users`.
4. Khởi động ứng dụng:
   ```bash
   npm start
   ```
5. Mở trình duyệt tại `http://localhost:6969` hoặc port đã khai báo trong `.env`.

## Ghi chú

- Project này tập trung vào logic CRUD cơ bản, chưa có validation nâng cao hoặc API riêng.
- Một số giá trị như database credentials đang được hard-code trong code hiện tại.
- Giao diện dùng Bootstrap CDN để hiển thị nhanh, không dùng build frontend riêng.
