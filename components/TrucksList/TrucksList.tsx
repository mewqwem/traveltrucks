"use client";
import Image from "next/image";
import UniqButton from "../UniqButton/UniqButton";
import css from "./TrucksList.module.css";
import { CampersTruck } from "@/types/campers";
import { FaCarSide, FaGasPump, FaStar } from "react-icons/fa";
import { IoMapOutline } from "react-icons/io5";
import {
  TbAutomaticGearboxFilled,
  TbManualGearboxFilled,
} from "react-icons/tb";
import { TailSpin } from "react-loader-spinner";
import { formatFormText } from "@/utils/util";

interface TrucksListProps {
  campers: CampersTruck[];
  isLoading: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

function TrucksList({
  campers,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: TrucksListProps) {
  if (isLoading) {
    return (
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }
  if (campers.length === 0) {
    return (
      <section>
        <ul className={css.list}>
          <div>Not found</div>
        </ul>
      </section>
    );
  }
  return (
    <section>
      <ul className={css.list}>
        {campers.map((truck) => (
          <li key={truck.id} className={css.listItem}>
            <div className={css.cardImage}>
              <Image
                src={truck.coverImage}
                fill
                alt={truck.name}
                sizes="219"
                loading="eager"
              />
            </div>
            <div className={css.truckAbout}>
              <div className={css.truckHead}>
                <h1 className={css.truckName}>{truck.name}</h1>
                <p className={css.truckPrice}>€{truck.price}</p>
                <div className={css.truckLocal}>
                  <p>
                    <FaStar className={css.star} />
                    {truck.rating} ({truck.totalReviews})
                  </p>
                  <p>
                    <IoMapOutline />
                    {truck.location}
                  </p>
                </div>
              </div>

              <p className={css.truckDescription}>{truck.description}</p>
              <div className={css.tagWrapper}>
                <div className={css.tag}>
                  <FaGasPump className={css.tagIcon} />
                  {truck.engine}
                </div>
                <div className={css.tag}>
                  {truck.transmission === "manual" ? (
                    <TbManualGearboxFilled className={css.tagIcon} />
                  ) : (
                    <TbAutomaticGearboxFilled className={css.tagIcon} />
                  )}
                  {truck.transmission}
                </div>
                <div className={css.tag}>
                  <FaCarSide className={css.tagIcon} />
                  {formatFormText(truck.form)}
                </div>
              </div>
              <div className={css.btn}>
                <UniqButton
                  target="_blank"
                  rel="noopener noreferrer"
                  type="link"
                  href={`/catalog/${truck.id}`}
                >
                  Show more
                </UniqButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div className={css.btnWrapper}>
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className={css.loadButton}
            type="button"
          >
            {isFetchingNextPage ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass="loader"
              />
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </section>
  );
}

export default TrucksList;
