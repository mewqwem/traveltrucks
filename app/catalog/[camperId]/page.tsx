import { getCamperById, getCamperReviews } from "@/lib/api";
import { notFound } from "next/navigation";
import css from "./page.module.css";
import { FaStar } from "react-icons/fa";
import { IoMapOutline } from "react-icons/io5";
import { formatValue } from "@/utils/util";
import Gallery from "@/components/Gallery/Gallery";
import Reviews from "@/components/Reviews/Reviews";
import ClientForm from "@/components/ClientForm/ClientForm";

export async function generateMetadata({ params }: PageProps) {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);

  if (!camper) return { title: "Camper Not Found" };

  return {
    title: `${camper.name} - TravelTrucks`,
    description: camper.description.slice(0, 160),
    openGraph: {
      title: camper.name,
      description: camper.description,
      images: [
        {
          url: camper.gallery[0]?.original,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

interface PageProps {
  params: Promise<{ camperId: string }>;
}

async function page({ params }: PageProps) {
  const { camperId } = await params;

  try {
    const camper = await getCamperById(camperId);
    const reviews = await getCamperReviews(camperId);

    const specs = [
      { label: "Form", value: camper.form },
      { label: "Length", value: camper.length },
      { label: "Width", value: camper.width },
      { label: "Height", value: camper.height },
      { label: "Tank", value: camper.tank },
      { label: "Consumption", value: camper.consumption },
    ];

    return (
      <section className="section">
        <div className={css.truckWrapper}>
          <div className={css.truckImageWrapper}>
            <Gallery images={camper.gallery} />
          </div>
          <div className={css.truckAbout}>
            <div className={css.truckContainer}>
              <h1 className={css.truckName}>{camper.name}</h1>
              <div className={css.truckSubHead}>
                <div className={css.truckLocation}>
                  <p>
                    <FaStar className={css.star} />
                    {camper.rating} ({camper.totalReviews})
                  </p>
                  <p>
                    <IoMapOutline />
                    {camper.location}
                  </p>
                </div>
                <p className={css.truckPrice}>€{camper.price}</p>
              </div>
              <p className={css.truckDescription}>{camper.description}</p>
            </div>
            <div className={css.truckContainer}>
              <div className={css.truckDetails}>
                <h2 className={css.detailsTitle}>Vehicle details</h2>
                <div className={css.tagWrapper}>
                  <div className={css.tag}>{camper.transmission}</div>
                  {camper.amenities.map((i) => (
                    <div key={i} className={css.tag}>
                      {i}
                    </div>
                  ))}
                  <div className={css.tag}>{camper.form}</div>
                </div>
                <hr className={css.decorateLine} />
                <ul className={css.truckCharacteristicsList}>
                  {specs.map(({ label, value }) => (
                    <li key={label} className={css.truckCharacteristic}>
                      <p className={css.characteristicText}>{label}</p>
                      <p className={css.characteristicText}>
                        {formatValue(value)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={css.reviewsContainer}>
          <h2 className={css.reviewsTitle}>Reviews</h2>
          <div className={css.reviewsWrapper}>
            <div className={css.reviewsComponent}>
              <Reviews reviews={reviews} totalReviews={camper.totalReviews} />
            </div>
            <div className={css.formComponent}>
              <ClientForm />
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("API Error:", error);
    notFound();
  }
}

export default page;
