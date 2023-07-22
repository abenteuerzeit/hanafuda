import { FC } from "react";
import Image from "next/image";
import images from "../public/images.json";

type ImageProps = {
  id: number;
  src: string;
  month: number;
  flower: string;
  card_number: number;
  category: string;
  points: number;
  extraInfo: string;
  extraInfoDetails: string;
};

const Home: FC = () => {
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Months are 0-indexed, so subtract 1
    const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
      date
    );
    return monthName;
  }

  const cardImages: ImageProps[] = shuffleArray(images);

  if (!cardImages || cardImages.length < 25) {
    console.log(
      `Card images loading...${(cardImages.length / 25) * 100}% complete`
    );
    return <div>Not enough images</div>;
  }

  const firstCard = cardImages[0];

  const renderCardImages = (
    startIndex: number,
    endIndex: number,
    className: string
  ) => {
    return cardImages
      .slice(startIndex, endIndex)
      .map((image: ImageProps) => (
        <Image
          key={image.id}
          src={image.src}
          alt={`${getMonthName(image.month)} ${image.flower} ${image.category}`}
          width={500}
          height={500}
          className={className}
        />
      ));
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4 h-screen">
        <aside
          id="sidebar"
          className="col-span-1 bg-gray-200 flex items-center justify-center"
        >
          {cardImages.length > 0 && (
            <figure id={`container-${firstCard.id}`} className="card-container">
              <Image
                priority={true}
                key={firstCard.id}
                src={firstCard.src}
                alt={`${getMonthName(firstCard.month)} ${firstCard.flower} ${
                  firstCard.category
                }`}
                width={500}
                height={500}
                className="card"
              />
            </figure>
          )}
        </aside>

        <main id="main-content" className="col-span-4 grid grid-rows-3 gap-4">
          <section
            id="player1"
            className="row-span-1 grid grid-cols-8 gap-4 p-4"
          >
            {renderCardImages(1, 9, "card")}
          </section>

          <section
            id="playing-field"
            className="row-span-1 grid grid-cols-8 gap-4 flex items-center justify-center"
          >
            {renderCardImages(9, 17, "field")}
          </section>

          <section
            id="player2"
            className="row-span-1 grid grid-cols-8 gap-4 p-4"
          >
            {renderCardImages(17, 25, "card")}
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
