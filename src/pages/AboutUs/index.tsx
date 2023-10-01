import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'

export default function AboutUs () {
  return (
    <Layout.Default
      beforeContent={
        <PageHeader
          title='Tentang Kami'
          description="Sekilas tentang website Literasiin.com"
        />
      }
    >
      <div className='py-4'>
        <div className='container'>
          <div className='border bg-white shadow p-4 rounded-lg space-y-4'>
            <div className='space-y-2'>
              <p>
                Pada zaman di mana arus informasi dan teknologi berkembang pesat,
                literasiin.com. Startup ini lahir dengan tujuan memajukan literasi dalam
                masyarakat, termasuk membaca, menulis, dan pemahaman informasi.
              </p>
              <p>
                literasiin.com didirikan oleh sekelompok individu yang berkomitmen,
                Literasiin.com menyediakan platform berisi artikel, cerpen, ulasan buku,
                panduan menulis, dan kelas online. literasiin.com juga mengadakan kampanye
                membaca, klub buku, dan kolaborasi menulis.Lebih dari sekadar platform,
                Literasiin.com berkontribusi pada pendidikan. literasiin.com akan bekerja
                sama dengan lembaga pendidikan dan komunitas untuk menyelenggarakan acara
                literasi dan program sosial. Dengan tekad kuat dan inovasi, Literasiin.com
                terus memperluas dampaknya, mendorong literasi yang lebih luas dan mendalam
                di tengah perubahan zaman.
              </p>
              <p>
                Begitu juga Literasiin berfokus pada dunia literasi, dimana penulis dapat
                memiliki wadah untuk menulis, mengembangkan skills dan pembaca dapat
                mendapatkan bahan bacaan serta menciptakan perpustakaan sendiri di halaman
                akunnya. Dalam komunitas pencinta literasi tentu gerakan literasi adalah
                aktifitas yang digaungkan dimana-mana. Literasiin mencoba membuat ekosistem
                dalam portal publik yang memungkin satu sama lain bertemu dan berbagi ide
                maupun gagasan. Tentu perkembangan dalam ekosistem ini akan terus berlanjut
                dikemudian hari.
              </p>
            </div>
            <div className='border rounded-lg p-4 space-y-4 text-center'>
              <div className='font-black text-xl'>Visi</div>
              <p>
                Menjadi kekuatan pendorong utama dalam membangun masyarakat yang
                berbasis literasi, di mana pengetahuan, kreativitas, dan pemahaman
                mendalam terpancar dalam setiap individu.
              </p>
            </div>
            <div className='border rounded-lg p-4 space-y-4'>
              <div className='font-black text-xl text-center'>Misi</div>
              <ol className='list-decimal ml-4 space-y-1'>
                <li>
                  <strong>Mengakses Pengetahuan untuk Semua:</strong> Kami
                  bertekad untuk memberikan akses mudah dan inklusif terhadap
                  berbagai sumber pengetahuan. Kami percaya bahwa setiap individu
                  berhak untuk belajar dan berkembang, tanpa memandang latar
                  belakang atau keterbatasan.
                </li>
                <li>
                  <strong>Meningkatkan Keterampilan Literasi:</strong> Kami
                  berkomitmen untuk meningkatkan keterampilan literasi di kalangan
                  masyarakat melalui konten edukatif yang bervariasi, mulai dari
                  artikel informatif hingga kelas-kelas online interaktif.
                </li>
                <li>
                  <strong>Mendorong Minat Baca dan Menulis:</strong> Kami ingin menginspirasi dan
                  memupuk minat baca dan menulis dalam masyarakat. Dengan
                  merangsang rasa ingin tahu dan imajinasi, kami berharap dapat
                  menciptakan lingkungan di mana literasi menjadi gaya hidup.
                </li>
                <li>
                  <strong>Menyediakan Konten Berkualitas:</strong> Kami
                  berusaha untuk menyajikan konten yang mendalam, akurat, dan
                  bermutu tinggi. Kami menghargai kecermatan dalam meriset dan
                  menghasilkan konten yang dapat memberi wawasan dan pemahaman
                  yang lebih baik.
                </li>
                <li>
                  <strong>Membangun Komunitas Literasi:</strong> Kami ingin
                  membentuk komunitas yang bersemangat dan berinteraksi secara
                  aktif. Melalui berbagai kegiatan seperti klub buku, lokakarya,
                  dan diskusi, kami menciptakan ruang bagi kolaborasi dan
                  pertukaran ide.
                </li>
                <li>
                  <strong>Berpartisipasi dalam Pembangunan Sosial:</strong> Kami
                  berperan dalam upaya memajukan literasi dalam masyarakat secara
                  menyeluruh. Melalui kemitraan dengan lembaga pendidikan,
                  pemerintah, dan komunitas lokal, kami berkontribusi pada
                  transformasi sosial yang berkelanjutan.
                </li>
                <li>
                  <strong>Inovasi dalam Teknologi Literasi:</strong> Kami
                  terus mendorong inovasi dalam teknologi literasi. Dari audiobuku
                  hingga interaktif multimedia, kami berusaha memanfaatkan
                  perkembangan teknologi untuk memperkaya pengalaman literasi.
                </li>
                <li>
                  <strong>Mengukuhkan Pengaruh Literasi dalam Perubahan:</strong> Kami
                  percaya bahwa literasi memiliki peran kunci dalam mengatasi
                  tantangan zaman. Melalui advokasi dan kampanye, kami berusaha
                  menjadikan literasi sebagai kekuatan pendorong perubahan positif
                  di masyarakat dan dunia.
                </li>
              </ol>
              <p>
                Dengan visi dan misi ini, kami berkomitmen untuk mengubah
                pandangan dan perilaku masyarakat terhadap literasi, menciptakan
                generasi yang penuh dengan pengetahuan, kreativitas, dan
                pemahaman yang mendalam
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout.Default>
  )
}
