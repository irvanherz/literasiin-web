import { Anchor, Col, Row, Typography, theme } from 'antd'
import Layout from 'components/Layout'

export default function Terms () {
  const { token } = theme.useToken()
  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
      <Layout.Scaffold
        title="Syarat dan Ketentuan"
        description="Syarat dan ketentuan penggunaan website Literasiin.com"
        headerStyle={{ background: token.colorPrimaryBg }}
        bodyStyle={{ padding: '24px 0' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={18} lg={18} xl={18} xxl={18}>
            <div id="intro">
              <Typography.Paragraph>
                Selamat datang di literasiin.com!
              </Typography.Paragraph>
              <Typography.Paragraph>
                Kami akan menjelaskan informasi dan persyaratan yang kami buat.
                Tentu informasi ini sebagai bentuk untuk memberikan keamanan dan
                informasi lebih lanjut kepada pengguna agar tidak melakukan
                aktifitas yang keluar dari persyaratan ini.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Syarat dan ketentuan berikut menjelaskan peraturan dan ketentuan
                penggunaan Website Literasiin.com dengan alamat literasiin.com.
                Dengan mengakses website ini, kami menganggap Anda telah menyetujui
                syarat dan ketentuan ini. Jangan lanjutkan penggunaan literasiin.com
                jika Anda menolak untuk menyetujui semua syarat dan ketentuan yang
                tercantum di halaman ini.
              </Typography.Paragraph>
            </div>
            <div id="public-portal">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Literasiin Adalah Portal Publik</Typography.Title>

              <Typography.Paragraph>
                Seluruh data user termasuk profil, tulisan, komentar, foto, bisa
                dilihat oleh siapapun. Baik user Literasiin atau hasil dari
                penelurusan seseorang melalu internet. Dengan ini literasiin tidak
                bisa menjaga keamanan tersebut karena bersifat publik, sehingga
                melakukan aktifitas yang baik adalah hal yang dianjurkan.
              </Typography.Paragraph>
            </div>
            <div id="users">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Pengguna Literasiin</Typography.Title>

              <Typography.Paragraph>
                Layanan kami tidak ditujukan untuk anak-anak dibawah 12 Tahun. Jika
                ditemui usia dibawah 12 tahun maka kami memiliki hak atas
                penangguhan akun karena melanggar persyaratan kami. Tentu batasan
                ini bertujuan hal baik, karena setiap orang bisa mengakses
                keseluruhan artikel yang ada tanpa filter atau validasi dari kami.
                Seluruh aktifitas dipegang penuh oleh user. Sehingga user yang
                memegang kendali atas apa yang mereka tulis dan apa yang mereka
                baca.
              </Typography.Paragraph>
            </div>
            <div id="about-writing">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Tentang Tulisan</Typography.Title>

              <Typography.Paragraph>
                <ol>
                  <li>Setiap user memiliki hak untuk menulis apa saja. Akan tetapi
                    lewat persyaratan ini kami memberikan batasan-batasan agar tulisan
                    user tidak ditangguhkan. Kami akan menghapus atau menangguhkan
                    artikel yang bersifat <em>Penyesatan, Adu Domba, Tudingan, Kebencian, Pornografi, Provokasi yang merugikan banyak orang</em>.
                    Penghapusan Artikel didasarkan pada data laporan yang diberikan
                    kepada user lain yang menyatakan artikel yang dibacanya tidak layak
                    di tayangkan karena mengandung unsur-unsur tersebut.</li>
                  <li>Seluruh isi tulisan dipertanggungjawakan oleh setiap
                    penulis. Literasiin tidak bertanggung jawab atas apa yang ditulis.
                    Literasiin hanya sebagai penyedia wadah. Jika ada yang melanggar hak
                    cipta karena <em>copy-paste</em> pada tulisan lain maka Literasiin
                    memiliki hak untuk menghapus tulisan yang ada.</li>
                  <li>Dengan menulis di Portal ini maka user bersedia jika Literasiin
                    mempublikasikan tulisan user ke media lain, termasuk Instagram,
                    Facebook dan mitra kami. Tentu hal ini untuk memberikan trafik
                    kepada user itu sendiri. Kami akan menyebutkan nama penulis dan isi
                    karya asli yang telah di publish.</li>
                </ol>
              </Typography.Paragraph>
            </div>
            <div id="about-writing-data">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Tentang Data Tulisan</Typography.Title>
              <Typography.Paragraph>
                Dunia internet adalah dunia yang luas. Untuk menangani atas serangan
                dan perilaku orang-orang atas Portal ini maka kami menyarankan
                kepada setiap User sebelum melakukan Publikasi tulisan untuk mem-<em>Back Up</em> Tulisan ke <em> Microsof Word</em> atau tempat
                penyimpanan lainnya. Kami mencoba mengantisipasi agar data tulisan
                dalam portal ini tetap terjaga. Tapi kesalahan atas server dan
                terjadinya Bug hingga menjadikan portal ini <em>Down</em> atau <em>error</em> adalah hal yang di mungkinkan.
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Title level={4} style={{ fontSize: token.fontSizeLG }}>Cookie:</Typography.Title>
              <Typography.Paragraph>
                Website ini menggunakan cookie untuk mempersonalisasi pengalaman
                online Anda. Dengan mengakses literasiin.com, Anda menyetujui
                penggunaan cookie yang diperlukan.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Cookie merupakan file teks yang ditempatkan pada hard disk Anda oleh
                server halaman web. Cookie tidak dapat digunakan untuk menjalankan
                program atau mengirimkan virus ke komputer Anda. Cookie yang
                diberikan telah disesuaikan untuk Anda dan hanya dapat dibaca oleh
                web server pada domain yang mengirimkan cookie tersebut kepada Anda.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Kami dapat menggunakan cookie untuk mengumpulkan, menyimpan, dan
                melacak informasi untuk keperluan statistik dan pemasaran untuk
                mengoperasikan website kami. Ada beberapa Cookie wajib yang
                diperlukan untuk pengoperasian website kami. Cookie ini tidak
                memerlukan persetujuan Anda karena akan selalu aktif. Perlu
                diketahui bahwa dengan menyetujui Cookie wajib, Anda juga menyetujui
                Cookie pihak ketiga, yang mungkin digunakan melalui layanan yang
                disediakan oleh pihak ketiga jika Anda menggunakan layanan tersebut
                di website kami, misalnya, jendela tampilan video yang disediakan
                oleh pihak ketiga dan terintegrasi dengan website kami.
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Title level={4} style={{ fontSize: token.fontSizeLG }}>Lisensi:</Typography.Title>
              <Typography.Paragraph>
                Kecuali dinyatakan lain, Literasiin.com dan/atau pemberi lisensinya
                memiliki hak kekayaan intelektual atas semua materi di
                literasiin.com. Semua hak kekayaan intelektual dilindungi
                undang-undang. Anda dapat mengaksesnya dari literasiin.com untuk
                penggunaan pribadi Anda sendiri dengan batasan yang diatur dalam
                syarat dan ketentuan ini.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Beberapa bagian website ini menawarkan kesempatan bagi pengguna
                untuk memposting serta bertukar pendapat dan informasi di area
                website tertentu. Literasiin.com tidak akan memfilter, mengedit,
                memublikasikan, atau meninjau Komentar di hadapan pengguna di
                website. Komentar tidak mencerminkan pandangan dan pendapat
                Literasiin.com, agennya, dan/atau afiliasinya. Komentar mencerminkan
                pandangan dan pendapat individu yang memposting pandangan dan
                pendapatnya. Selama diizinkan oleh undang-undang yang berlaku,
                Literasiin.com tidak akan bertanggung jawab atas Komentar atau
                kewajiban, kerugian, atau pengeluaran yang disebabkan dan/atau
                ditanggung sebagai akibat dari penggunaan dan/atau penempatan
                dan/atau penayangan Komentar di website ini.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Literasiin.com berhak memantau semua Komentar dan menghapus Komentar
                apa pun yang dianggap tidak pantas, menyinggung, atau menyebabkan
                pelanggaran terhadap Syarat dan Ketentuan ini.
              </Typography.Paragraph>
              <Typography.Paragraph>
                <div>Anda menjamin dan menyatakan bahwa:</div>
                <div>
                  <ul>
                    <li>
                      Anda berhak memposting Komentar di website kami serta memiliki
                      semua lisensi dan persetujuan yang diperlukan untuk
                      melakukannya;
                    </li>
                    <li>
                      Komentar tidak melanggar hak kekayaan intelektual apa pun,
                      termasuk tetapi tidak terbatas pada, hak cipta, paten, atau
                      merek dagang pihak ketiga mana pun;
                    </li>
                    <li>
                      Komentar tidak mengandung materi yang bersifat memfitnah,
                      mencemarkan nama baik, menyinggung, tidak senonoh, atau
                      melanggar hukum, yang merupakan pelanggaran privasi.
                    </li>
                    <li>
                      Komentar tidak akan digunakan untuk membujuk atau mempromosikan
                      bisnis atau kebiasaan atau memperkenalkan kegiatan komersial
                      atau kegiatan yang melanggar hukum.
                    </li>
                  </ul>
                </div>
              </Typography.Paragraph>
              <Typography.Paragraph>
                Dengan ini Anda memberikan lisensi non-eksklusif kepada
                Literasiin.com untuk menggunakan, memproduksi ulang, mengedit, dan
                mengizinkan orang lain untuk menggunakan, memproduksi ulang, dan
                mengedit Komentar Anda dalam segala bentuk, format, atau media.
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Title level={4} style={{ fontSize: token.fontSizeLG }}>Membuat hyperlink yang mengarah ke Konten kami:</Typography.Title>
              <Typography.Paragraph>
                Organisasi berikut dapat membuat tautan menuju Website kami tanpa
                persetujuan tertulis sebelumnya:
              </Typography.Paragraph>
              <Typography.Paragraph>
                <ul>
                  <li>
                    Lembaga pemerintah;
                  </li>
                  <li>
                    Mesin pencari;
                  </li>
                  <li>
                    Kantor berita;
                  </li>
                  <li>
                    Distributor direktori online dapat membuat tautan menuju Website
                    kami dengan cara yang sama seperti membuat tautan ke Website
                    bisnis terdaftar lainnya; dan
                  </li>
                  <li>
                    Bisnis Terakreditasi di Seluruh Sistem kecuali meminta
                    organisasi nirlaba, pusat perbelanjaan amal, dan grup
                    penggalangan dana amal yang mungkin tidak membuat hyperlink
                    menuju Website kami.
                  </li>
                </ul>
              </Typography.Paragraph>
              <Typography.Paragraph>
                Organisasi-organisasi ini dapat menautkan ke halaman beranda, ke
                publikasi, atau ke informasi Website kami lainnya selama tautan
                tersebut: (a) tidak menipu dengan cara apa pun; (b) tidak
                menyiratkan secara keliru adanya hubungan sponsor, rekomendasi, atau
                persetujuan dari pihak yang menautkan beserta produk dan/atau
                layanannya; serta (c) sesuai dengan konteks website pihak yang
                menautkan.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Kami dapat mempertimbangkan dan menyetujui permintaan penautan lain
                dari jenis organisasi berikut:
              </Typography.Paragraph>
              <Typography.Paragraph>
                <ul>
                  <li>
                    sumber informasi bisnis dan/atau konsumen yang sudah umum
                    dikenal;
                  </li>
                  <li>
                    website komunitas dot.com;
                  </li>
                  <li>
                    asosiasi atau kelompok lain yang mewakili badan amal;
                  </li>
                  <li>
                    distributor direktori online;
                  </li>
                  <li>
                    portal internet;
                  </li>
                  <li>
                    firma akuntansi, hukum, dan konsultan; dan
                  </li>
                  <li>
                    lembaga pendidikan dan asosiasi dagang.
                  </li>
                </ul>
              </Typography.Paragraph>
              <Typography.Paragraph>
                Kami akan menyetujui permintaan penautan dari organisasi-organisasi
                tersebut jika kami memutuskan bahwa: (a) tautan tersebut tidak akan
                membuat kami terlihat merugikan kami sendiri atau bisnis
                terakreditasi kami; (b) organisasi tidak memiliki catatan negatif
                apa pun dengan kami; (c) keuntungan bagi kami dari keberadaan
                hyperlink mengkompensasi tidak adanya Literasiin.com; dan (d) tautan
                tersebut dalam konteks informasi sumber daya umum.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Organisasi-organisasi ini dapat menautkan ke halaman beranda kami
                selama tautan tersebut: (a) tidak menipu dengan cara apa pun; (b)
                tidak menyiratkan secara keliru adanya hubungan sponsor,
                rekomendasi, atau persetujuan dari pihak yang menautkan beserta
                produk dan/atau layanannya; dan (c) sesuai dengan konteks website
                pihak yang menautkan.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Jika Anda merupakan salah satu organisasi yang tercantum dalam
                paragraf 2 di atas dan tertarik untuk membuat tautan ke website
                kami, Anda harus memberitahu kami dengan mengirimkan email ke
                Literasiin.com. Harap cantumkan nama Anda, nama organisasi Anda,
                informasi kontak dan URL website Anda, daftar URL apa pun yang akan
                memuat tautan ke Website kami, serta daftar URL di website kami yang
                ingin Anda tautkan. Silakan tunggu tanggapan dari kami selama 2-3
                minggu.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Organisasi yang telah disetujui dapat membuat hyperlink menuju
                Website kami seperti berikut:
              </Typography.Paragraph>
              <Typography.Paragraph>
                <ul>
                  <li>
                    Dengan menggunakan nama perusahaan kami; atau
                  </li>
                  <li>
                    Dengan menggunakan Uniform Resource Locator yang ditautkan; atau
                  </li>
                  <li>
                    Dengan menggunakan deskripsi lain dari Website kami yang
                    ditautkan yang masuk akal dalam konteks dan format konten di
                    website pihak yang menautkan.
                  </li>
                </ul>
              </Typography.Paragraph>
              <Typography.Paragraph>
                Tidak ada penggunaan logo Literasiin.com atau karya seni lainnya
                yang diizinkan untuk menautkan perjanjian lisensi merek dagang.
              </Typography.Paragraph>
            </div>

            <div>
              <Typography.Title level={4} style={{ fontSize: token.fontSizeLG }}>Tanggung jawab atas Konten:</Typography.Title>
              <Typography.Paragraph>
                Kami tidak akan bertanggung jawab atas konten yang muncul di Website
                Anda. Anda setuju untuk melindungi dan membela kami terhadap semua
                klaim yang diajukan atas Website Anda. Tidak ada tautan yang muncul
                di Website mana pun yang dapat dianggap sebagai memfitnah, cabul,
                atau kriminal, atau yang menyalahi, atau melanggar, atau mendukung
                pelanggaran lain terhadap hak pihak ketiga.
              </Typography.Paragraph>
            </div>

            <div>
              <Typography.Title level={4} style={{ fontSize: token.fontSizeLG }}> Pernyataan Kepemilikan Hak:</Typography.Title>
              <Typography.Paragraph>
                Kami berhak meminta Anda menghapus semua tautan atau tautan tertentu
                yang menuju ke Website kami. Anda setuju untuk segera menghapus
                semua tautan ke Website kami sesuai permintaan. Kami juga berhak
                mengubah syarat ketentuan ini dan kebijakan penautannya kapan saja.
                Dengan terus menautkan ke Website kami, Anda setuju untuk terikat
                dan mematuhi syarat dan ketentuan penautan ini.
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Title level={4} style={{ fontSize: token.fontSizeLG }}>Penghapusan tautan dari website kami:</Typography.Title>
              <Typography.Paragraph>
                Jika Anda menemukan tautan di Website kami yang bersifat menyinggung
                karena alasan apa pun, Anda bebas menghubungi dan memberi tahu kami
                kapan saja. Kami akan mempertimbangkan permintaan untuk menghapus
                tautan, tetapi kami tidak berkewajiban untuk menanggapi Anda secara
                langsung.Kami tidak memastikan bahwa informasi di website ini benar.
                Kami tidak menjamin kelengkapan atau keakuratannya, dan kami juga
                tidak berjanji untuk memastikan bahwa website tetap tersedia atau
                materi di website selalu diperbarui.
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Title level={4} style={{ fontSize: token.fontSizeLG }}>Penolakan:</Typography.Title>
              <Typography.Paragraph>
                Sejauh diizinkan oleh undang-undang yang berlaku, kami mengecualikan
                semua representasi, jaminan, dan ketentuan yang berkaitan dengan
                website kami dan penggunaan website ini. Tidak ada bagian dari
                penolakan ini yang akan:
              </Typography.Paragraph>
              <Typography.Paragraph>
                <ul>
                  <li>
                    membatasi atau mengecualikan tanggung jawab kami atau Anda
                    terhadap kematian atau cedera pribadi;
                  </li>
                  <li>
                    membatasi atau mengecualikan tanggung jawab kami atau Anda
                    terhadap penipuan atau pemberian keterangan yang tidak benar;
                  </li>
                  <li>
                    membatasi tanggung jawab kami atau Anda dengan cara apa pun yang
                    tidak diizinkan oleh undang-undang yang berlaku; atau
                  </li>
                  <li>
                    mengecualikan tanggung jawab kami atau Anda yang tidak dapat
                    dikecualikan berdasarkan undang-undang yang berlaku.
                  </li>
                </ul>
              </Typography.Paragraph>
              <Typography.Paragraph>
                Batasan dan pengecualian tanggung jawab yang diatur dalam Bagian ini
                dan bagian lain dalam penolakan ini: (a) tunduk pada paragraf
                sebelumnya; dan (b) mengatur semua kewajiban yang timbul di bawah
                penolakan, termasuk kewajiban yang timbul dalam kontrak, dalam
                gugatan, dan untuk pelanggaran kewajiban hukum.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Selama website dan informasi serta layanan di website disediakan
                secara gratis, kami tidak akan bertanggung jawab atas kerugian atau
                kerusakan apa pun.
              </Typography.Paragraph>
            </div>
            <div id="contacts">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Cara Menghubungi Literasiin</Typography.Title>
              <Typography.Paragraph>
                Anda bisa menghubungi melalui instagram @literasi.in_ atau pada akun
                @devliterasiin. Kami akan memberi tahu anda jika mengalami kesulitan
              </Typography.Paragraph>
            </div>
            <div id="changes">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Apakah Persyaratan Ini Bisa di Ubah?</Typography.Title>
              <Typography.Paragraph>
                Tentu perubahan akan dimungkinkan. Kami akan memberi tahu setiap
                user jika mengalami perubahan.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Dengan menjadi user di Literasiin maka setiap user telah membaca
                persyaratan ini. Sehingga jika ada hal-hal yang tidak di
                inginkan maka persyaratan ini akan menjadi rujukan dalam
                komunitas kami.
              </Typography.Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={16}>
            <Anchor
              className='hide-xs'
              offsetTop={72}
              items={[
                {
                  key: 'intro',
                  href: '#intro',
                  title: 'Pendahaluan'
                },
                {
                  key: 'public-portal',
                  href: '#public-portal',
                  title: 'Literasiin adalah Portal Publik'
                },
                {
                  key: 'users',
                  href: '#users',
                  title: 'Pengguna Literasiin'
                },
                {
                  key: 'about-writing',
                  href: '#about-writing',
                  title: 'Tentang Tulisan'
                },
                {
                  key: 'about-writing-data',
                  href: '#about-writing-data',
                  title: 'Tentang Data Tulisan'
                },
                {
                  key: 'contacts',
                  href: '#contacts',
                  title: 'Cara Menghubungi Literasiin'
                },
                {
                  key: 'changes',
                  href: '#changes',
                  title: 'Apakah Persyaratan Ini Bisa di Ubah?'
                }
              ]}
      />
          </Col>
        </Row>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
