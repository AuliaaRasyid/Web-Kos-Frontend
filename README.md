
# Web Kos HoloHero

Platform ini dirancang untuk menyederhanakan proses pembayaran, meningkatkan transparansi antara pemilik dan penghuni, serta memperbaiki pengalaman pengguna pada sebuah kosan.


## Screenshots
**Destkop**

HomePage
![App Screenshot](https://i.imgur.com/6KO5WUP.jpeg)

Dashboard Penghuni
![App Screenshot](https://i.imgur.com/vAqUTOX.png)

![App Screenshot](https://i.imgur.com/Sxw4wiF.png)

Dasboard Admin
![App Screenshot](https://i.imgur.com/UT4xhTH.png)

**Handphone**

![App Screenshot](https://i.imgur.com/I5QzExs.png)

![App Screenshot](https://i.imgur.com/FtPdEr8.png)

![App Screenshot](https://i.imgur.com/JK6c90s.png)







## Authors

- [@Muhammad Aulia Rasyid](https://github.com/AuliaaRasyid)


## Features

- Login untuk User dan Admin
- Halaman Homepage untuk advertisement
- Responsive
- CRUD Penghuni Kos pada halaman admin
- Read dan Delete keluhan penghuni pada Halaman admin
- Pembayaran via Midtrans pada Halaman User
- Create Keluhan pada halaman User



## Tech Stack

**Client:** 
- React -> Sebagai Framework
- Vite -> set up development
- TailwindCSS -> Framework CSS utility-first
- Bootsrap -> open source front-end development framework
- SweetAlert2 -> Pustaka untuk tampilan alert yang menarik.
- FrameMotion -> simple namun powerful motion/animation library untuk React

**Server:**
- [Web-Kos-Backend](https://github.com/AuliaaRasyid/web-kos-backend)

## Run Locally

Clone the project

```bash
git clone https://github.com/AuliaaRasyid/Web-Kos-Frontend.git
```

Make sure to be in Frontend-main directory

```bash
cd Web-Kos-Frontend
```

Install dependencies

```bash
npm install or npm i
```
Build project

```bash
npm run Build
```

Start the server (server will run in Localhost:5173)

```bash
npm run dev
```

For Logging in Make sure the server side or backend side is running


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` by creating it in the folder or you can rename the envExamples in the directory to `.env`


**The environment variables:**

MIDTRANS_CLIENT_ID = `Your Midtrans CLient ID`

MIDTRANS_API_URL= `https://app.sandbox.midtrans.com`

VITE_API_URL= `http://localhost:5000/api`


For the Midtrans Client ID, go ahead and make a Midtrans Account in *[Midtrans Login](https://dashboard.midtrans.com/login)*

Once you are Logged in and are in midtrans dashboard you dont need to continue the business registration, go straigth to 
`settings -> Acces Keys`
you will find the MIDTRANS_CLIENT_ID


## Demo

Demo Access
[Kos-HoloHero](https://web-kosann.vercel.app)

Video Penggunaan Aplikasi
" "

[Payment-Simulator Midtrans](https://simulator.sandbox.midtrans.com)

```bash
Username : admin
Password : admin
```
