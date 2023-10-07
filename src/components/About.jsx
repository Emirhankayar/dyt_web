import React from "react";
import { Typography, Button } from "@material-tailwind/react";

export default function HorizontalCard() {
  return (
    <>
      <div className="container flex flex-wrap justify-between w-5/6 items-center mt-32 mb-10 mx-auto">
        <Typography className="text-2xl font-bold">Hakkımda</Typography>
      </div>

      <div className="container mx-auto relative mb-40">
        <div className="w-full px-8">
          <div className="w-full flex flex-col">
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 leading-loose">
                <div className="col-span-2 sm:col-span-1 text-justify">
                  {/* First column content */}
                  Öğrenim hayatımın ilk dönemini Bursa'da tamamladıktan sonra, üniversite eğitimine başlamak amacıyla İzmir'e taşındım. İzmir'deki üniversite deneyimimde, Beslenme ve Diyetetik alanında dört yıl süren yoğun bir akademik formasyon aldım. Aynı dönemde Sağlık Kurumları İşletmeciliği alanında da başarıyla açıköğretim programını tamamladım.

                  Üniversite yıllarımda, ilgili bölümle ilişkilendirilen topluluk etkinliklerine katılarak ve eğitim çalışmalarına destek sağlayarak kendimi akademik anlamda geliştirmeye özen gösterdim. Son sınıfta, mesleki yetkinliklerimi artırmak ve farklı uzmanlık alanlarında deneyim kazanmak amacıyla çeşitli stajlar gerçekleştirdim.
                </div>
                <div className="col-span-2 sm:col-span-1 text-justify">
                  {/* Second column content */}
                  Mezuniyetimin ardından diyetisyenlik kariyerime başladım ve şu an itibariyle Bariyatrik Cerrahi, Hastalıklarda Beslenme, Anne-Çocuk Beslenmesi, Sağlıklı Kilo Kaybı ve Sağlıklı Ağırlık Yönetimi konularında danışmanlık hizmetleri sunmaktayım. Bu sağlık alanındaki uzmanlık alanlarına yönelik, bireylerin sağlıklı yaşam biçimlerini ve beslenme gereksinimlerini profesyonel bir şekilde rehberlik etmek, benim için büyük bir tutku ve sorumluluk taşımaktadır. Her gün daha fazla insanın sağlığını desteklemek için çalışmak, büyük bir memnuniyet kaynağıdır.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
