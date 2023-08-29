import { Anchor, Col, Row, Typography, theme } from 'antd'
import Layout from 'components/Layout'

export default function PrivacyPolicy () {
  const { token } = theme.useToken()
  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
      <Layout.Scaffold
        title="Kebijakan Privasi"
        description="Kebijakan privacy penggunaan website Literasiin"
        headerStyle={{ background: token.colorPrimaryBg }}
        bodyStyle={{ padding: '24px 0' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={18} lg={18} xl={18} xxl={18}>
            <div id="intro">
              <Typography.Paragraph>
                Website literasiin.com dimiliki oleh Literasiin.com, yang akan
                menjadi pengontrol atas data pribadi Anda.Kami telah mengadopsi
                Kebijakan Privasi ini untuk menjelaskan bagaimana kami memproses
                informasi yang dikumpulkan oleh literasiin.com, yang juga
                menjelaskan alasan mengapa kami perlu mengumpulkan data pribadi
                tertentu tentang Anda. Oleh karena itu, Anda harus membaca Kebijakan
                Privasi ini sebelum menggunakan website literasiin.com. Kami menjaga
                data pribadi Anda dan berjanji untuk menjamin kerahasiaan dan
                keamanannya.
              </Typography.Paragraph>
            </div>
            <div id="private-data">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Informasi pribadi yang kami kumpulkan:</Typography.Title>
              <Typography.Paragraph>
                Website literasiin.com dimiliki oleh Literasiin.com, yang akan
                menjadi pengontrol atas data pribadi Anda.Kami telah mengadopsi
                Kebijakan Privasi ini untuk menjelaskan bagaimana kami memproses
                informasi yang dikumpulkan oleh literasiin.com, yang juga
                menjelaskan alasan mengapa kami perlu mengumpulkan data pribadi
                tertentu tentang Anda. Oleh karena itu, Anda harus membaca Kebijakan
                Privasi ini sebelum menggunakan website literasiin.com. Kami menjaga
                data pribadi Anda dan berjanji untuk menjamin kerahasiaan dan
                keamanannya.
              </Typography.Paragraph>
            </div>
            <div id="data-processing">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Mengapa kami memproses data Anda?</Typography.Title>
              <Typography.Paragraph>
                Menjaga data pelanggan agar tetap aman adalah prioritas utama kami.
                Oleh karena itu, kami hanya dapat memproses sejumlah kecil data
                pengguna, sebanyak yang benar-benar diperlukan untuk menjalankan
                website. Informasi yang dikumpulkan secara otomatis hanya digunakan
                untuk mengidentifikasi kemungkinan kasus penyalahgunaan dan menyusun
                informasi statistik terkait penggunaan website. Informasi statistik
                ini tidak digabungkan sedemikian rupa hingga dapat mengidentifikasi
                pengguna tertentu dari sistem.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Anda dapat mengunjungi website tanpa memberi tahu kami identitas
                Anda atau mengungkapkan informasi apa pun, yang dapat digunakan oleh
                seseorang untuk mengidentifikasi Anda sebagai individu tertentu yang
                dapat dikenali. Namun, jika Anda ingin menggunakan beberapa fitur
                website, atau Anda ingin menerima newsletter kami atau memberikan
                detail lainnya dengan mengisi formulir, Anda dapat memberikan data
                pribadi kepada kami, seperti email, nama depan, nama belakang, kota
                tempat tinggal, organisasi, dan nomor telepon Anda. Anda dapat
                memilih untuk tidak memberikan data pribadi Anda kepada kami, tetapi
                Anda mungkin tidak dapat memanfaatkan beberapa fitur website.
                Contohnya, Anda tidak akan dapat menerima Newsletter kami atau
                menghubungi kami secara langsung dari website. Pengguna yang tidak
                yakin tentang informasi yang wajib diberikan dapat menghubungi kami
                melalui admin@literasiin.com.
              </Typography.Paragraph>
            </div>
            <div id="your-rights">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Hak-hak Anda:</Typography.Title>
              <Typography.Paragraph>
                <div>Anda memiliki hak-hak berikut terkait data pribadi Anda:</div>
                <ul>
                  <li>
                    Hak untuk mendapatkan penjelasan.
                  </li>
                  <li>
                    Hak atas akses.
                  </li>
                  <li>
                    Hak untuk memperbaiki.
                  </li>
                  <li>
                    Hak untuk menghapus.
                  </li>
                  <li>
                    Hak untuk membatasi pemrosesan.
                  </li>
                  <li>
                    Hak atas portabilitas data.
                  </li>
                  <li>
                    Hak untuk menolak.
                  </li>
                  <li>
                    Hak-hak terkait pengambilan keputusan dan pembuatan profil
                    otomatis.
                  </li>
                </ul>
              </Typography.Paragraph>
            </div>
            <div id="links">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Link ke website lain:</Typography.Title>
              <Typography.Paragraph>
                Website kami mungkin berisi tautan ke website lain yang tidak
                dimiliki atau dikendalikan oleh kami. Perlu diketahui bahwa kami
                tidak bertanggung jawab atas praktik privasi website lain atau pihak
                ketiga. Kami menyarankan Anda untuk selalu waspada ketika
                meninggalkan website kami dan membaca pernyataan privasi setiap
                website yang mungkin mengumpulkan informasi pribadi.
              </Typography.Paragraph>
            </div>
            <div id="data-safety">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Keamanan informasi:</Typography.Title>
              <Typography.Paragraph>
                Kami menjaga keamanan informasi yang Anda berikan pada server
                komputer dalam lingkungan yang terkendali, aman, dan terlindungi
                dari akses, penggunaan, atau pengungkapan yang tidak sah. Kami
                menjaga pengamanan administratif, teknis, dan fisik yang wajar untuk
                perlindungan terhadap akses, penggunaan, modifikasi, dan
                pengungkapan tidak sah atas data pribadi dalam kendali dan
                pengawasannya. Namun, kami tidak menjamin tidak akan ada transmisi
                data melalui Internet atau jaringan nirkabel.
              </Typography.Paragraph>
            </div>
            <div id="laws">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Pengungkapan hukum:</Typography.Title>
              <Typography.Paragraph>
                Kami akan mengungkapkan informasi apa pun yang kami kumpulkan,
                gunakan, atau terima jika diwajibkan atau diizinkan oleh hukum,
                misalnya untuk mematuhi panggilan pengadilan atau proses hukum
                serupa, dan jika kami percaya dengan itikad baik bahwa pengungkapan
                diperlukan untuk melindungi hak kami, melindungi keselamatan Anda
                atau keselamatan orang lain, menyelidiki penipuan, atau menanggapi
                permintaan dari pemerintah.
              </Typography.Paragraph>
            </div>
            <div id="contacts">
              <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Informasi kontak:</Typography.Title>
              <Typography.Paragraph>
                Jika Anda ingin menghubungi kami untuk mempelajari Kebijakan ini
                lebih lanjut atau menanyakan masalah apa pun yang berkaitan dengan
                hak perorangan dan Informasi pribadi Anda, Anda dapat mengirim email
                ke admin@literasiin.com.
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
                  key: 'private-data',
                  href: '#private-data',
                  title: 'Informasi pribadi yang kami kumpulkan'
                },
                {
                  key: 'data-processing',
                  href: '#data-processing',
                  title: 'Mengapa kami memproses data Anda?'
                },
                {
                  key: 'your-rights',
                  href: '#your-rights',
                  title: 'Hak-hak Anda'
                },
                {
                  key: '',
                  href: '#links',
                  title: 'Link ke website lain'
                },
                {
                  key: '',
                  href: '#data-safety',
                  title: 'Keamanan informasi'
                },
                {
                  key: 'laws',
                  href: '#laws',
                  title: 'Pengungkapan hukum'
                },
                {
                  key: 'contacts',
                  href: '#contacts',
                  title: 'Informasi kontak'
                }
              ]}
      />
          </Col>
        </Row>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
