import { Card, Typography, theme } from 'antd'
import Layout from 'components/Layout'

export default function AboutUs () {
  const { token } = theme.useToken()
  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
      <Layout.Scaffold
        title="About Us"
        description="Sekilas tentang website Literasiin.com"
        headerStyle={{ background: token.colorPrimaryBg, textAlign: 'center' }}
        bodyStyle={{ padding: '24px 0' }}
      >
        <Card style={{ width: '100%', maxWidth: 768, margin: 'auto' }}>
          <Typography.Paragraph>
            Pada zaman di mana arus informasi dan teknologi berkembang pesat,
            literasiin.com. Startup ini lahir dengan tujuan memajukan literasi dalam
            masyarakat, termasuk membaca, menulis, dan pemahaman informasi.
          </Typography.Paragraph>
          <Typography.Paragraph>
            literasiin.com didirikan oleh sekelompok individu yang berkomitmen,
            Literasiin.com menyediakan platform berisi artikel, cerpen, ulasan buku,
            panduan menulis, dan kelas online. literasiin.com juga mengadakan kampanye
            membaca, klub buku, dan kolaborasi menulis.Lebih dari sekadar platform,
            Literasiin.com berkontribusi pada pendidikan. literasiin.com akan bekerja
            sama dengan lembaga pendidikan dan komunitas untuk menyelenggarakan acara
            literasi dan program sosial. Dengan tekad kuat dan inovasi, Literasiin.com
            terus memperluas dampaknya, mendorong literasi yang lebih luas dan mendalam
            di tengah perubahan zaman.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Begitu juga Literasiin berfokus pada dunia literasi, dimana penulis dapat
            memiliki wadah untuk menulis, mengembangkan skills dan pembaca dapat
            mendapatkan bahan bacaan serta menciptakan perpustakaan sendiri di halaman
            akunnya. Dalam komunitas pencinta literasi tentu gerakan literasi adalah
            aktifitas yang digaungkan dimana-mana. Literasiin mencoba membuat ekosistem
            dalam portal publik yang memungkin satu sama lain bertemu dan berbagi ide
            maupun gagasan. Tentu perkembangan dalam ekosistem ini akan terus berlanjut
            dikemudian hari.
          </Typography.Paragraph>
          <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Visi</Typography.Title>
          <Typography.Paragraph>
            Menjadi kekuatan pendorong utama dalam membangun masyarakat yang
            berbasis literasi, di mana pengetahuan, kreativitas, dan pemahaman
            mendalam terpancar dalam setiap individu.
          </Typography.Paragraph>
          <Typography.Title level={3} style={{ fontSize: token.fontSizeXL }}>Misi</Typography.Title>
          <Typography.Paragraph>
            <ol>
              <li>
                <strong>Mengakses Pengetahuan untuk Semua:</strong><strong></strong>Kami
                bertekad untuk memberikan akses mudah dan inklusif terhadap
                berbagai sumber pengetahuan. Kami percaya bahwa setiap individu
                berhak untuk belajar dan berkembang, tanpa memandang latar
                belakang atau keterbatasan.
              </li>
              <li>
                <strong>Meningkatkan Keterampilan Literasi:</strong><strong></strong>Kami
                berkomitmen untuk meningkatkan keterampilan literasi di kalangan
                masyarakat melalui konten edukatif yang bervariasi, mulai dari
                artikel informatif hingga kelas-kelas online interaktif.
              </li>
              <li>
                Mendorong Minat Baca dan Menulis: Kami ingin menginspirasi dan
                memupuk minat baca dan menulis dalam masyarakat. Dengan
                merangsang rasa ingin tahu dan imajinasi, kami berharap dapat
                menciptakan lingkungan di mana literasi menjadi gaya hidup.
              </li>
              <li>
                <strong>Menyediakan Konten Berkualitas:</strong><strong></strong>Kami
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
                <strong>Inovasi dalam Teknologi Literasi:</strong><strong></strong>Kami
                terus mendorong inovasi dalam teknologi literasi. Dari audiobuku
                hingga interaktif multimedia, kami berusaha memanfaatkan
                perkembangan teknologi untuk memperkaya pengalaman literasi.
              </li>
              <li>
                <strong>Mengukuhkan Pengaruh Literasi dalam Perubahan:</strong>
                Kami percaya bahwa literasi memiliki peran kunci dalam mengatasi
                tantangan zaman. Melalui advokasi dan kampanye, kami berusaha
                menjadikan literasi sebagai kekuatan pendorong perubahan positif
                di masyarakat dan dunia.
              </li>
            </ol>
          </Typography.Paragraph>
          <Typography.Paragraph>
            Dengan visi dan misi ini, kami berkomitmen untuk mengubah
            pandangan dan perilaku masyarakat terhadap literasi, menciptakan
            generasi yang penuh dengan pengetahuan, kreativitas, dan
            pemahaman yang mendalam
          </Typography.Paragraph>
        </Card>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
