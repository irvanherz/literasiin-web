import { Anchor } from 'antd'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'

export default function PrivacyPolicy () {
  return (
    <Layout.Default
      className='bg-white'
      beforeContent={
        <PageHeader
          title='Kebijakan Privasi'
          description='Kebijakan privasi penggunaan website Literasiin'
        />
      }
    >
      <div className='py-4'>
        <div className='container flex'>
          <div className='w-full md:w-3/4 space-y-4 pr-0 md:pr-4'>
            <div className='space-y-2' id="intro">
              <p>
                Website literasiin.com dimiliki oleh Literasiin.com, yang akan
                menjadi pengontrol atas data pribadi Anda.Kami telah mengadopsi
                Kebijakan Privasi ini untuk menjelaskan bagaimana kami memproses
                informasi yang dikumpulkan oleh literasiin.com, yang juga
                menjelaskan alasan mengapa kami perlu mengumpulkan data pribadi
                tertentu tentang Anda. Oleh karena itu, Anda harus membaca Kebijakan
                Privasi ini sebelum menggunakan website literasiin.com. Kami menjaga
                data pribadi Anda dan berjanji untuk menjamin kerahasiaan dan
                keamanannya.
              </p>
            </div>
            <div className='space-y-2' id="private-data">
              <div className='text-2xl font-black'>Informasi pribadi yang kami kumpulkan:</div>
              <p>
                Website literasiin.com dimiliki oleh Literasiin.com, yang akan
                menjadi pengontrol atas data pribadi Anda.Kami telah mengadopsi
                Kebijakan Privasi ini untuk menjelaskan bagaimana kami memproses
                informasi yang dikumpulkan oleh literasiin.com, yang juga
                menjelaskan alasan mengapa kami perlu mengumpulkan data pribadi
                tertentu tentang Anda. Oleh karena itu, Anda harus membaca Kebijakan
                Privasi ini sebelum menggunakan website literasiin.com. Kami menjaga
                data pribadi Anda dan berjanji untuk menjamin kerahasiaan dan
                keamanannya.
              </p>
            </div>
            <div className='space-y-2' id="data-processing">
              <div className='text-2xl font-black'>Mengapa kami memproses data Anda?</div>
              <p>
                Menjaga data pelanggan agar tetap aman adalah prioritas utama kami.
                Oleh karena itu, kami hanya dapat memproses sejumlah kecil data
                pengguna, sebanyak yang benar-benar diperlukan untuk menjalankan
                website. Informasi yang dikumpulkan secara otomatis hanya digunakan
                untuk mengidentifikasi kemungkinan kasus penyalahgunaan dan menyusun
                informasi statistik terkait penggunaan website. Informasi statistik
                ini tidak digabungkan sedemikian rupa hingga dapat mengidentifikasi
                pengguna tertentu dari sistem.
              </p>
              <p>
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
              </p>
            </div>
            <div className='space-y-2' id="your-rights">
              <div className='text-2xl font-black'>Hak-hak Anda:</div>
              <p>
                <div>Anda memiliki hak-hak berikut terkait data pribadi Anda:</div>
                <ul className='list-disc ml-4'>
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
              </p>
            </div>
            <div className='space-y-2' id="links">
              <div className='text-2xl font-black'>Link ke website lain:</div>
              <p>
                Website kami mungkin berisi tautan ke website lain yang tidak
                dimiliki atau dikendalikan oleh kami. Perlu diketahui bahwa kami
                tidak bertanggung jawab atas praktik privasi website lain atau pihak
                ketiga. Kami menyarankan Anda untuk selalu waspada ketika
                meninggalkan website kami dan membaca pernyataan privasi setiap
                website yang mungkin mengumpulkan informasi pribadi.
              </p>
            </div>
            <div className='space-y-2' id="data-safety">
              <div className='text-2xl font-black'>Keamanan informasi:</div>
              <p>
                Kami menjaga keamanan informasi yang Anda berikan pada server
                komputer dalam lingkungan yang terkendali, aman, dan terlindungi
                dari akses, penggunaan, atau pengungkapan yang tidak sah. Kami
                menjaga pengamanan administratif, teknis, dan fisik yang wajar untuk
                perlindungan terhadap akses, penggunaan, modifikasi, dan
                pengungkapan tidak sah atas data pribadi dalam kendali dan
                pengawasannya. Namun, kami tidak menjamin tidak akan ada transmisi
                data melalui Internet atau jaringan nirkabel.
              </p>
            </div>
            <div className='space-y-2' id="laws">
              <div className='text-2xl font-black'>Pengungkapan hukum:</div>
              <p>
                Kami akan mengungkapkan informasi apa pun yang kami kumpulkan,
                gunakan, atau terima jika diwajibkan atau diizinkan oleh hukum,
                misalnya untuk mematuhi panggilan pengadilan atau proses hukum
                serupa, dan jika kami percaya dengan itikad baik bahwa pengungkapan
                diperlukan untuk melindungi hak kami, melindungi keselamatan Anda
                atau keselamatan orang lain, menyelidiki penipuan, atau menanggapi
                permintaan dari pemerintah.
              </p>
            </div>
            <div className='space-y-2' id="contacts">
              <div className='text-2xl font-black'>Informasi kontak:</div>
              <p>
                Jika Anda ingin menghubungi kami untuk mempelajari Kebijakan ini
                lebih lanjut atau menanyakan masalah apa pun yang berkaitan dengan
                hak perorangan dan Informasi pribadi Anda, Anda dapat mengirim email
                ke admin@literasiin.com.
              </p>
            </div>
          </div>
          <div className='w-0 md:w-1/4'>
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
          </div>
        </div>
      </div>
    </Layout.Default>
  )
}
